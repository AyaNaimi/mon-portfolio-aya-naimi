-- Create cv_files table for storing CV metadata and managing multiple CV versions
CREATE TABLE IF NOT EXISTS cv_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL UNIQUE,
  original_filename TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT,
  is_active BOOLEAN DEFAULT FALSE,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cv_files_active ON cv_files(is_active);
CREATE INDEX IF NOT EXISTS idx_cv_files_uploaded_at ON cv_files(uploaded_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_cv_files_updated_at BEFORE UPDATE ON cv_files
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Ensure only one active CV at a time using a unique constraint with a workaround
-- We'll use a trigger to enforce this rule
CREATE OR REPLACE FUNCTION enforce_single_active_cv()
RETURNS TRIGGER AS $$
BEGIN
  -- If setting this CV as active, deactivate all others
  IF NEW.is_active = TRUE THEN
    UPDATE cv_files 
    SET is_active = FALSE 
    WHERE id != NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER enforce_single_active_cv_trigger
  BEFORE INSERT OR UPDATE ON cv_files
  FOR EACH ROW
  WHEN (NEW.is_active = TRUE)
  EXECUTE FUNCTION enforce_single_active_cv();

-- Insert a sample record for testing (you can remove this in production)
-- INSERT INTO cv_files (
--   filename, 
--   original_filename, 
--   file_size, 
--   file_type, 
--   storage_path, 
--   is_active
-- ) VALUES (
--   'sample-cv.pdf',
--   'CV_John_Doe.pdf',
--   245678,
--   'application/pdf',
--   'cv/sample-cv.pdf',
--   TRUE
-- );