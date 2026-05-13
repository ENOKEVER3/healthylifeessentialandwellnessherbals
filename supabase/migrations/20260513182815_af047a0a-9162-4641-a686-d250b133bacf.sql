-- Tighten consultation-uploads INSERT policy to enforce folder convention.
DROP POLICY IF EXISTS "Anonymous can upload to consultation-uploads" ON storage.objects;

CREATE POLICY "Anonymous can upload to consultation-uploads"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'consultation-uploads'
  AND name ~ '^HLE-[A-Z0-9]{6}/[0-9]+-[A-Za-z0-9._-]+$'
);

-- Durable rate-limit table for the symptom-advisor edge function.
-- Replaces the in-memory limiter that resets on cold start.
CREATE TABLE IF NOT EXISTS public.advisor_rate_limit (
  id BIGSERIAL PRIMARY KEY,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_advisor_rate_limit_ip_time
  ON public.advisor_rate_limit (ip_hash, created_at DESC);

ALTER TABLE public.advisor_rate_limit ENABLE ROW LEVEL SECURITY;

-- No policies: only the service role (used by the edge function) can read/write.
-- This table is internal infrastructure and never exposed to clients.
