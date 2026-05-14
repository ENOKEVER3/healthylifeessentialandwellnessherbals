
-- Reviews table for public customer feedback
CREATE TABLE public.site_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  display_name TEXT NOT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  avatar_kind TEXT,
  photo_url TEXT,
  country_code TEXT NOT NULL,
  year INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT site_reviews_rating_check CHECK (rating BETWEEN 1 AND 5),
  CONSTRAINT site_reviews_year_check CHECK (year BETWEEN 2025 AND 2100),
  CONSTRAINT site_reviews_avatar_kind_check CHECK (avatar_kind IS NULL OR avatar_kind IN ('male','female')),
  CONSTRAINT site_reviews_country_check CHECK (char_length(country_code) = 2),
  CONSTRAINT site_reviews_name_len CHECK (char_length(display_name) BETWEEN 1 AND 80),
  CONSTRAINT site_reviews_body_len CHECK (char_length(body) BETWEEN 3 AND 2000)
);

ALTER TABLE public.site_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are publicly readable"
  ON public.site_reviews FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit a review"
  ON public.site_reviews FOR INSERT
  WITH CHECK (true);

CREATE INDEX site_reviews_created_at_idx ON public.site_reviews (created_at DESC);

-- Storage bucket for customer review photos (public read)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'review-photos',
  'review-photos',
  true,
  5242880,
  ARRAY['image/jpeg','image/png','image/webp','image/heic','image/heif']
);

CREATE POLICY "Review photos are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'review-photos');

CREATE POLICY "Anyone can upload a review photo"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'review-photos');
