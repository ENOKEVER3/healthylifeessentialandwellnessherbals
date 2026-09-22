DROP POLICY IF EXISTS "Anyone can submit a package review" ON public.package_reviews;

CREATE POLICY "Anyone can publish a package review"
  ON public.package_reviews
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'approved'
    AND media_type IN ('image', 'video')
    AND char_length(country_code) = 2
    AND char_length(state_region) BETWEEN 1 AND 120
    AND char_length(display_name) BETWEEN 1 AND 80
    AND (caption IS NULL OR char_length(caption) <= 600)
    AND media_path ~ '^submissions/[A-Za-z0-9._/-]+$'
  );