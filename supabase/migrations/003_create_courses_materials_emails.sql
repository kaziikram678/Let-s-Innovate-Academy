-- Migration 003: Create courses, course_materials, emails, and email_templates tables

-- ============================================
-- COURSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  old_price NUMERIC(10, 2),
  duration TEXT,
  lectures_count INTEGER DEFAULT 0,
  image_url TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  learnings JSONB DEFAULT '[]'::jsonb,
  who_for JSONB DEFAULT '[]'::jsonb,
  curriculum JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  instructor_slug TEXT,
  language TEXT DEFAULT 'Bengali',
  support TEXT,
  payment_method TEXT,
  class_format TEXT,
  class_schedule TEXT,
  email_notifications BOOLEAN DEFAULT true,
  students_count INTEGER DEFAULT 0,
  rating NUMERIC(2, 1) DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  meeting_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_start_date ON courses(start_date);

-- ============================================
-- COURSE MATERIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS course_materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  material_type TEXT NOT NULL CHECK (material_type IN ('video', 'pdf')),
  file_url TEXT NOT NULL,
  file_size BIGINT,
  duration TEXT,
  day_number INTEGER,
  lesson_order INTEGER DEFAULT 0,
  is_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_course_materials_course_id ON course_materials(course_id);
CREATE INDEX IF NOT EXISTS idx_course_materials_type ON course_materials(material_type);

-- ============================================
-- EMAIL TEMPLATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('verification', 'start_date', 'class_date', 'meeting_link', 'notice', 'custom')),
  variables JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_templates_type ON email_templates(type);

-- ============================================
-- EMAILS TABLE (sent emails log)
-- ============================================
CREATE TABLE IF NOT EXISTS emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID REFERENCES email_templates(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_emails_recipient ON emails(recipient_email);
CREATE INDEX IF NOT EXISTS idx_emails_type ON emails(type);
CREATE INDEX IF NOT EXISTS idx_emails_status ON emails(status);
CREATE INDEX IF NOT EXISTS idx_emails_course_id ON emails(course_id);

-- ============================================
-- RLS POLICIES
-- ============================================
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Allow service role full access to courses" ON courses
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read published courses" ON courses
  FOR SELECT TO anon USING (status = 'enroll-open');

-- Course materials policies
CREATE POLICY "Allow service role full access to course_materials" ON course_materials
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated read course_materials" ON course_materials
  FOR SELECT TO authenticated USING (true);

-- Email templates policies
CREATE POLICY "Allow service role full access to email_templates" ON email_templates
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated read email_templates" ON email_templates
  FOR SELECT TO authenticated USING (is_active = true);

-- Emails policies
CREATE POLICY "Allow service role full access to emails" ON emails
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated read own emails" ON emails
  FOR SELECT TO authenticated USING (recipient_email = (SELECT email FROM profiles WHERE id = auth.uid()));

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_materials_updated_at
  BEFORE UPDATE ON course_materials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON email_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DEFAULT EMAIL TEMPLATES
-- ============================================
INSERT INTO email_templates (name, subject, body, type, variables) VALUES
(
  'Course Verification',
  'Your Enrollment in {{course_title}} has been Verified!',
  'Dear {{student_name}},

Congratulations! Your enrollment in {{course_title}} has been successfully verified.

Course Details:
- Course: {{course_title}}
- Start Date: {{start_date}}
- Class Format: {{class_format}}
- Meeting Link: {{meeting_link}}

Next Steps:
1. Join the class on the scheduled date using the meeting link above.
2. Keep your transaction ID handy for reference.
3. If you have any questions, reply to this email.

We look forward to seeing you in class!

Best regards,
{{brand_name}}',
  'verification',
  '["student_name", "course_title", "start_date", "class_format", "meeting_link", "brand_name"]'
),
(
  'Course Start Date Reminder',
  'Reminder: {{course_title}} Starts on {{start_date}}',
  'Dear {{student_name}},

This is a friendly reminder that your course "{{course_title}}" is starting soon!

Start Date: {{start_date}}
Meeting Link: {{meeting_link}}

Please make sure to:
- Test your internet connection beforehand
- Have any required software installed
- Join the meeting 5 minutes early

See you in class!

Best regards,
{{brand_name}}',
  'start_date',
  '["student_name", "course_title", "start_date", "meeting_link", "brand_name"]'
),
(
  'Class Date & Meeting Link',
  'Class Schedule for {{course_title}}',
  'Dear {{student_name}},

Here are the details for your upcoming class:

Course: {{course_title}}
Class Date: {{class_date}}
Meeting Link: {{meeting_link}}
Time: {{class_time}}

Please join the meeting on time. If you miss the class, a recording may be available.

Best regards,
{{brand_name}}',
  'class_date',
  '["student_name", "course_title", "class_date", "meeting_link", "class_time", "brand_name"]'
),
(
  'Important Notice',
  'Important Notice: {{course_title}}',
  'Dear {{student_name}},

We have an important update regarding your course "{{course_title}}":

{{notice_message}}

If you have any questions, please don''t hesitate to contact us.

Best regards,
{{brand_name}}',
  'notice',
  '["student_name", "course_title", "notice_message", "brand_name"]'
),
(
  'Custom Email',
  '{{subject}}',
  '{{body}}',
  'custom',
  '["subject", "body", "student_name", "brand_name"]'
);
