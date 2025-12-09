-- Update storage bucket to support both CV files and images
UPDATE storage.buckets 
SET 
  allowed_mime_types = ARRAY[
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/gif'
  ]
WHERE id = 'portfolio-storage';

-- Create a new bucket specifically for images if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-images',
  'portfolio-images',
  true,
  10485760, -- 10MB limit for images
  ARRAY[
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/gif'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create storage policies for portfolio-images bucket
-- Policy for authenticated users to upload images
CREATE POLICY IF NOT EXISTS "Allow authenticated uploads to portfolio-images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'portfolio-images' AND 
    auth.role() = 'authenticated'
  );

-- Policy for public viewing of images
CREATE POLICY IF NOT EXISTS "Allow public viewing of portfolio-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

-- Policy for authenticated users to update images
CREATE POLICY IF NOT EXISTS "Allow authenticated users to update portfolio-images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'portfolio-images' AND 
    auth.role() = 'authenticated'
  );

-- Policy for authenticated users to delete images
CREATE POLICY IF NOT EXISTS "Allow authenticated users to delete from portfolio-images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'portfolio-images' AND 
    auth.role() = 'authenticated'
  );