DROP POLICY IF EXISTS "Block client update on review-photos" ON storage.objects;
CREATE POLICY "Block client update on review-photos"
  ON storage.objects
  FOR UPDATE
  TO anon, authenticated
  USING (
    bucket_id = 'review-photos'
    AND owner_id = (select auth.uid()::text)
    AND false
  )
  WITH CHECK (
    bucket_id = 'review-photos'
    AND owner_id = (select auth.uid()::text)
    AND false
  );

DROP POLICY IF EXISTS "Block client delete on review-photos" ON storage.objects;
CREATE POLICY "Block client delete on review-photos"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (
    bucket_id = 'review-photos'
    AND owner_id = (select auth.uid()::text)
    AND false
  );