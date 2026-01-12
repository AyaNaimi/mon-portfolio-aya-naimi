-- Fix storage policies to ensure they work correctly

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated uploads to portfolio-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public viewing of portfolio-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update portfolio-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete from portfolio-images" ON storage.objects;

-- Create new, more permissive policies
CREATE POLICY "Allow all authenticated users to upload to portfolio-images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'portfolio-images' AND 
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Allow public viewing of portfolio-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Allow all authenticated users to update portfolio-images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'portfolio-images' AND 
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Allow all authenticated users to delete from portfolio-images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'portfolio-images' AND 
    auth.uid() IS NOT NULL
  );