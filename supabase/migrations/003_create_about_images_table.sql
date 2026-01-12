-- Create about_images table for managing profile images
CREATE TABLE IF NOT EXISTS about_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_size INTEGER NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  storage_path TEXT,
  public_url TEXT,
  is_active BOOLEAN DEFAULT FALSE NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_about_images_active ON about_images(is_active);
CREATE INDEX IF NOT EXISTS idx_about_images_uploaded_at ON about_images(uploaded_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE about_images ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all operations for now, can be refined later)
CREATE POLICY "Allow all operations on about_images" ON about_images
  FOR ALL 
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_about_images_updated_at
    BEFORE UPDATE ON about_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();