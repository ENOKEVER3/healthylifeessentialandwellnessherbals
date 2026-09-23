DROP POLICY IF EXISTS "Block client delete on consultation-uploads" ON storage.objects;
CREATE POLICY "Block client delete on consultation-uploads"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (
    bucket_id = 'consultation-uploads'
    AND owner_id = (select auth.uid()::text)
    AND false
  );

DROP POLICY IF EXISTS "Block client select on consultation-uploads" ON storage.objects;
CREATE POLICY "Block client select on consultation-uploads"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (
    bucket_id = 'consultation-uploads'
    AND owner_id = (select auth.uid()::text)
    AND false
  );

DROP POLICY IF EXISTS "Block client delete on review media" ON storage.objects;
CREATE POLICY "Block client delete on review media"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (
    bucket_id = 'review-media'
    AND owner_id = (select auth.uid()::text)
    AND false
  );