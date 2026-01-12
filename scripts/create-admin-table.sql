-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for username lookup
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

-- Insert default admin user (use strong password in production!)
INSERT INTO admin_users (username, email, role)
VALUES ('admin', 'admin@example.com', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow public to read (for login check)
CREATE POLICY "Anyone can check admin existence" ON admin_users
  FOR SELECT USING (true);
