-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_slug TEXT NOT NULL,
  course_title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  transaction_id TEXT NOT NULL UNIQUE,
  bkash_number TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_slug ON enrollments(course_slug);
CREATE INDEX IF NOT EXISTS idx_enrollments_email ON enrollments(email);

-- Enable Row Level Security (RLS)
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for enrollment form)
CREATE POLICY "Allow public insert" ON enrollments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow service role to read all (for admin dashboard)
CREATE POLICY "Allow service role read" ON enrollments
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: Allow service role to update all (for admin status changes)
CREATE POLICY "Allow service role update" ON enrollments
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_enrollments_updated_at
  BEFORE UPDATE ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
