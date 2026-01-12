-- Create storage bucket for CV files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-storage',
  'portfolio-storage',
  true,
  5242880, -- 5MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create storage policies for CV files
-- Policy for authenticated users to upload CV files
CREATE POLICY IF NOT EXISTS "Allow authenticated uploads to portfolio-storage"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'portfolio-storage' AND 
    auth.role() = 'authenticated'
  );

-- Policy for authenticated users to view CV files (since bucket is public, this might not be needed)
CREATE POLICY IF NOT EXISTS "Allow public viewing of portfolio-storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-storage');

-- Policy for authenticated users to update their own CV files
CREATE POLICY IF NOT EXISTS "Allow authenticated users to update portfolio-storage"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'portfolio-storage' AND 
    auth.role() = 'authenticated'
  );

-- Policy for authenticated users to delete CV files
CREATE POLICY IF NOT EXISTS "Allow authenticated users to delete from portfolio-storage"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'portfolio-storage' AND 
    auth.role() = 'authenticated'
  );

-- Create RLS policies for the cv_files table
ALTER TABLE cv_files ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to CV files (for frontend display)
CREATE POLICY IF NOT EXISTS "Allow public read access to cv_files"
  ON cv_files FOR SELECT
  USING (true);

-- Policy for authenticated users to insert CV files
CREATE POLICY IF NOT EXISTS "Allow authenticated insert to cv_files"
  ON cv_files FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users to update CV files
CREATE POLICY IF NOT EXISTS "Allow authenticated update to cv_files"
  ON cv_files FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy for authenticated users to delete CV files
CREATE POLICY IF NOT EXISTS "Allow authenticated delete from cv_files"
  ON cv_files FOR DELETE
  USING (auth.role() = 'authenticated');