
ALTER TABLE public.site_reviews
  ADD COLUMN IF NOT EXISTS edited boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS edit_token uuid NOT NULL DEFAULT gen_random_uuid();

CREATE POLICY "Reviews can be edited once"
ON public.site_reviews
FOR UPDATE
TO public
USING (edited = false)
WITH CHECK (edited = true);
