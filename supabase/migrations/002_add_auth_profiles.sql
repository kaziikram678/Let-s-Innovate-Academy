-- Create profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Service role can read all profiles
CREATE POLICY "Service role read all profiles" ON profiles
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: Service role can update all profiles
CREATE POLICY "Service role update all profiles" ON profiles
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Allow insert on signup (trigger handles it)
CREATE POLICY "Allow insert via trigger" ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profiles_updated_at();

-- Add user_id column to enrollments table
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);

-- Update RLS policies for enrollments to allow authenticated users to read their own
DROP POLICY IF EXISTS "Allow public insert" ON enrollments;
DROP POLICY IF EXISTS "Allow service role read" ON enrollments;
DROP POLICY IF EXISTS "Allow service role update" ON enrollments;

-- Policy: Anyone can insert (for guest checkout)
CREATE POLICY "Allow public insert" ON enrollments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Authenticated users can insert
CREATE POLICY "Allow authenticated insert" ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Users can read their own enrollments
CREATE POLICY "Users can read own enrollments" ON enrollments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Service role can read all enrollments
CREATE POLICY "Service role read all enrollments" ON enrollments
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: Service role can update all enrollments
CREATE POLICY "Service role update all enrollments" ON enrollments
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);
