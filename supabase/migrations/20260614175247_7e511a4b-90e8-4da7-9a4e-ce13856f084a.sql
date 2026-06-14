
CREATE TABLE public.review_likes (
  review_id uuid NOT NULL REFERENCES public.site_reviews(id) ON DELETE CASCADE,
  device_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (review_id, device_id)
);

GRANT SELECT, INSERT, DELETE ON public.review_likes TO anon, authenticated;
GRANT ALL ON public.review_likes TO service_role;

ALTER TABLE public.review_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Likes are publicly readable"
  ON public.review_likes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can like"
  ON public.review_likes FOR INSERT
  TO anon, authenticated
  WITH CHECK (length(device_id) BETWEEN 8 AND 128);

CREATE POLICY "Anyone can unlike with their device id"
  ON public.review_likes FOR DELETE
  TO anon, authenticated
  USING (true);

CREATE INDEX idx_review_likes_review ON public.review_likes(review_id);
