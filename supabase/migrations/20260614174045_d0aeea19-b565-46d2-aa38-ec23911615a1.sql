
-- 1. Rotate all existing edit tokens (they were publicly readable)
UPDATE public.site_reviews SET edit_token = gen_random_uuid();

-- 2. Hide edit_token from anon/authenticated SELECTs (column-level privilege)
REVOKE SELECT ON public.site_reviews FROM anon, authenticated;
GRANT SELECT (id, display_name, is_anonymous, avatar_kind, photo_url, country_code, year, rating, body, created_at, edited)
  ON public.site_reviews TO anon, authenticated;
GRANT INSERT ON public.site_reviews TO anon, authenticated;

-- 3. Drop the unsafe public UPDATE policy; edits will only flow through a SECURITY DEFINER RPC.
DROP POLICY IF EXISTS "Reviews can be edited once" ON public.site_reviews;

-- 4. Secure RPC for one-time review edits, validates edit_token server-side.
CREATE OR REPLACE FUNCTION public.update_review(
  p_id uuid,
  p_token uuid,
  p_body text,
  p_rating int,
  p_country text,
  p_year int
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_updated int;
BEGIN
  IF p_body IS NULL OR length(btrim(p_body)) < 3 OR length(p_body) > 2000 THEN
    RAISE EXCEPTION 'Invalid body';
  END IF;
  IF p_rating < 1 OR p_rating > 5 THEN
    RAISE EXCEPTION 'Invalid rating';
  END IF;
  IF p_country IS NULL OR length(p_country) <> 2 THEN
    RAISE EXCEPTION 'Invalid country';
  END IF;
  IF p_year < 2000 OR p_year > 2100 THEN
    RAISE EXCEPTION 'Invalid year';
  END IF;

  UPDATE public.site_reviews
  SET body = btrim(p_body),
      rating = p_rating,
      country_code = upper(p_country),
      year = p_year,
      edited = true
  WHERE id = p_id
    AND edit_token = p_token
    AND edited = false;

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated = 1;
END;
$$;

REVOKE ALL ON FUNCTION public.update_review(uuid, uuid, text, int, text, int) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_review(uuid, uuid, text, int, text, int) TO anon, authenticated;

-- 5. Storage: drop the broad public SELECT (listing) policy on review-photos.
--    Direct public URL access still works because the bucket is marked public.
DROP POLICY IF EXISTS "Review photos are publicly readable" ON storage.objects;

-- 6. Tighten review photo uploads: enforce size and image mime type.
DROP POLICY IF EXISTS "Anyone can upload a review photo" ON storage.objects;
CREATE POLICY "Anyone can upload a review photo"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'review-photos'
  AND COALESCE((metadata->>'size')::bigint, 0) <= 8 * 1024 * 1024
  AND lower(COALESCE(metadata->>'mimetype', '')) IN ('image/jpeg','image/png','image/webp')
);
