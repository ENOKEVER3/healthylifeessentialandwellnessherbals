
-- Re-assert revoke of edit_token column from public roles
REVOKE SELECT (edit_token) ON public.site_reviews FROM anon, authenticated;

-- Replace permissive DELETE policies with deny-by-default; deletes must go through validated RPCs
DROP POLICY IF EXISTS "Anyone can unlike with their device id" ON public.review_likes;
CREATE POLICY "Direct deletes blocked on review_likes"
  ON public.review_likes FOR DELETE
  TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "Anyone can remove a reaction from their device" ON public.review_reactions;
CREATE POLICY "Direct deletes blocked on review_reactions"
  ON public.review_reactions FOR DELETE
  TO anon, authenticated
  USING (false);

-- Validated, device-scoped delete for likes
CREATE OR REPLACE FUNCTION public.delete_review_like(p_review_id uuid, p_device_id text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count int;
BEGIN
  IF p_device_id IS NULL OR char_length(p_device_id) < 8 OR char_length(p_device_id) > 128 THEN
    RAISE EXCEPTION 'Invalid device id';
  END IF;
  DELETE FROM public.review_likes
   WHERE review_id = p_review_id
     AND device_id = p_device_id;
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count > 0;
END;
$$;

-- Validated, device-scoped delete for emoji reactions
CREATE OR REPLACE FUNCTION public.delete_review_reaction(p_review_id uuid, p_device_id text, p_emoji text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count int;
BEGIN
  IF p_device_id IS NULL OR char_length(p_device_id) < 4 OR char_length(p_device_id) > 100 THEN
    RAISE EXCEPTION 'Invalid device id';
  END IF;
  IF p_emoji IS NULL OR char_length(p_emoji) < 1 OR char_length(p_emoji) > 16 THEN
    RAISE EXCEPTION 'Invalid emoji';
  END IF;
  DELETE FROM public.review_reactions
   WHERE review_id = p_review_id
     AND device_id = p_device_id
     AND emoji = p_emoji;
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count > 0;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_review_like(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_review_like(uuid, text) TO anon, authenticated;

REVOKE ALL ON FUNCTION public.delete_review_reaction(uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_review_reaction(uuid, text, text) TO anon, authenticated;
