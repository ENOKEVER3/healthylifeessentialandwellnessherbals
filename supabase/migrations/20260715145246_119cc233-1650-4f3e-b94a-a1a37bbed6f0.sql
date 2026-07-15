CREATE OR REPLACE FUNCTION public.create_review(p_display_name text, p_is_anonymous boolean, p_avatar_kind text, p_photo_url text, p_country text, p_year integer, p_rating integer, p_body text)
 RETURNS TABLE(id uuid, edit_token uuid)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  IF p_display_name IS NULL OR length(btrim(p_display_name)) < 1 OR length(p_display_name) > 80 THEN
    RAISE EXCEPTION 'Invalid display name';
  END IF;
  IF p_avatar_kind IS NOT NULL AND p_avatar_kind NOT IN ('male','female') THEN
    RAISE EXCEPTION 'Invalid avatar kind';
  END IF;
  IF p_photo_url IS NOT NULL AND length(p_photo_url) > 0 THEN
    IF length(p_photo_url) > 500
       OR p_photo_url !~ '^https://[a-z0-9-]+\.supabase\.co/storage/v1/object/public/review-photos/[A-Za-z0-9._/-]+$' THEN
      RAISE EXCEPTION 'Invalid photo url';
    END IF;
  END IF;

  RETURN QUERY
  INSERT INTO public.site_reviews (
    display_name, is_anonymous, avatar_kind, photo_url,
    country_code, year, rating, body
  ) VALUES (
    btrim(p_display_name), COALESCE(p_is_anonymous, false), p_avatar_kind, NULLIF(p_photo_url, ''),
    upper(p_country), p_year, p_rating, btrim(p_body)
  )
  RETURNING site_reviews.id, site_reviews.edit_token;
END;
$function$;