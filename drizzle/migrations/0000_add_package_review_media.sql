CREATE TABLE public.package_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  display_name TEXT NOT NULL DEFAULT 'Anonymous',
  media_type TEXT NOT NULL,
  media_path TEXT NOT NULL,
  country_code TEXT NOT NULL,
  state_region TEXT NOT NULL,
  caption TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT package_reviews_media_type_check CHECK (media_type IN ('image', 'video')),
  CONSTRAINT package_reviews_status_check CHECK (status IN ('pending', 'approved', 'rejected')),
  CONSTRAINT package_reviews_country_check CHECK (char_length(country_code) = 2),
  CONSTRAINT package_reviews_name_len CHECK (char_length(display_name) BETWEEN 1 AND 80),
  CONSTRAINT package_reviews_state_len CHECK (char_length(state_region) BETWEEN 1 AND 120),
  CONSTRAINT package_reviews_caption_len CHECK (caption IS NULL OR char_length(caption) <= 600),
  CONSTRAINT package_reviews_path_check CHECK (media_path ~ '^submissions/[A-Za-z0-9._/-]+$')
);

GRANT SELECT ON public.package_reviews TO anon, authenticated;
GRANT INSERT ON public.package_reviews TO anon, authenticated;
GRANT ALL ON public.package_reviews TO service_role;

ALTER TABLE public.package_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved package reviews are public"
  ON public.package_reviews
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

CREATE POLICY "Anyone can submit a package review"
  ON public.package_reviews
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND media_type IN ('image', 'video')
    AND char_length(country_code) = 2
    AND char_length(state_region) BETWEEN 1 AND 120
    AND char_length(display_name) BETWEEN 1 AND 80
    AND (caption IS NULL OR char_length(caption) <= 600)
    AND media_path ~ '^submissions/[A-Za-z0-9._/-]+$'
  );

CREATE INDEX package_reviews_approved_created_idx
  ON public.package_reviews (status, created_at DESC);

DROP POLICY IF EXISTS "Anyone can upload review media" ON storage.objects;
CREATE POLICY "Anyone can upload review media"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'review-media'
    AND name ~ '^submissions/[A-Za-z0-9._/-]+$'
    AND COALESCE((metadata->>'size')::bigint, 0) <= 50 * 1024 * 1024
    AND lower(COALESCE(metadata->>'mimetype', '')) IN (
      'image/jpeg', 'image/png', 'image/webp',
      'video/mp4', 'video/webm', 'video/quicktime'
    )
  );

DROP POLICY IF EXISTS "Block client select on review media" ON storage.objects;
CREATE POLICY "Block client select on review media"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'review-media' AND false);

DROP POLICY IF EXISTS "Block client update on review media" ON storage.objects;
CREATE POLICY "Block client update on review media"
  ON storage.objects
  FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'review-media' AND false)
  WITH CHECK (bucket_id = 'review-media' AND false);

DROP POLICY IF EXISTS "Block client delete on review media" ON storage.objects;
CREATE POLICY "Block client delete on review media"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'review-media' AND false);