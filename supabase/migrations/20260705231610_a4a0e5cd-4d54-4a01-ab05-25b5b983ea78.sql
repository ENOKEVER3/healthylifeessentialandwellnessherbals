ALTER TABLE public.site_reviews ADD COLUMN IF NOT EXISTS edit_count integer NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.update_review(p_id uuid, p_token uuid, p_body text, p_rating integer, p_country text, p_year integer)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
      edit_count = edit_count + 1
  WHERE id = p_id
    AND edit_token = p_token
    AND edit_count < 3;

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated = 1;
END;
$function$;