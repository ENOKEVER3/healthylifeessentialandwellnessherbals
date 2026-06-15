
CREATE TABLE public.review_reactions (
  review_id uuid NOT NULL REFERENCES public.site_reviews(id) ON DELETE CASCADE,
  device_id text NOT NULL,
  emoji text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (review_id, device_id, emoji)
);

CREATE INDEX idx_review_reactions_review ON public.review_reactions(review_id);

GRANT SELECT, INSERT, DELETE ON public.review_reactions TO anon, authenticated;
GRANT ALL ON public.review_reactions TO service_role;

ALTER TABLE public.review_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reactions are publicly readable"
ON public.review_reactions FOR SELECT
USING (true);

CREATE POLICY "Anyone can add a reaction"
ON public.review_reactions FOR INSERT
WITH CHECK (
  char_length(device_id) BETWEEN 4 AND 100
  AND char_length(emoji) BETWEEN 1 AND 16
);

CREATE POLICY "Anyone can remove a reaction from their device"
ON public.review_reactions FOR DELETE
USING (true);
