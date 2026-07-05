CREATE OR REPLACE FUNCTION public.delete_review(p_id uuid, p_token uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_deleted int;
BEGIN
  DELETE FROM public.site_reviews
   WHERE id = p_id AND edit_token = p_token;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted = 1;
END;
$function$;

DROP POLICY IF EXISTS "Direct deletes blocked on site_reviews" ON public.site_reviews;