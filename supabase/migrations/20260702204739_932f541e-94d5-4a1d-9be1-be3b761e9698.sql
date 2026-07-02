
-- Explicitly block SELECT on advisor_rate_limit; only SECURITY DEFINER functions should read it.
DROP POLICY IF EXISTS "Block direct select on advisor_rate_limit" ON public.advisor_rate_limit;
CREATE POLICY "Block direct select on advisor_rate_limit"
  ON public.advisor_rate_limit
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- Lock down consultation-uploads bucket: block SELECT/UPDATE/DELETE from clients.
-- Legitimate reads happen via signed URLs issued by the sign-consultation-files edge function (service role).
DROP POLICY IF EXISTS "Block client select on consultation-uploads" ON storage.objects;
CREATE POLICY "Block client select on consultation-uploads"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'consultation-uploads' AND false);

DROP POLICY IF EXISTS "Block client update on consultation-uploads" ON storage.objects;
CREATE POLICY "Block client update on consultation-uploads"
  ON storage.objects
  FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'consultation-uploads' AND false)
  WITH CHECK (bucket_id = 'consultation-uploads' AND false);

DROP POLICY IF EXISTS "Block client delete on consultation-uploads" ON storage.objects;
CREATE POLICY "Block client delete on consultation-uploads"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'consultation-uploads' AND false);

-- Lock down review-photos bucket mutations: public reads remain (bucket is public), but
-- block UPDATE and DELETE from clients so review photos cannot be overwritten or removed.
DROP POLICY IF EXISTS "Block client update on review-photos" ON storage.objects;
CREATE POLICY "Block client update on review-photos"
  ON storage.objects
  FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'review-photos' AND false)
  WITH CHECK (bucket_id = 'review-photos' AND false);

DROP POLICY IF EXISTS "Block client delete on review-photos" ON storage.objects;
CREATE POLICY "Block client delete on review-photos"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'review-photos' AND false);
