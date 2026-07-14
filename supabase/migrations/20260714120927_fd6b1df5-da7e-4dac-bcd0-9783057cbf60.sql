
CREATE TABLE public.ad_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  placement text NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('view','click')),
  device_id text,
  path text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.ad_events TO anon, authenticated;
GRANT ALL ON public.ad_events TO service_role;

ALTER TABLE public.ad_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log an ad event"
  ON public.ad_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(placement) BETWEEN 1 AND 64
    AND event_type IN ('view','click')
    AND (device_id IS NULL OR char_length(device_id) <= 128)
    AND (path IS NULL OR char_length(path) <= 200)
  );

CREATE INDEX ad_events_placement_type_idx ON public.ad_events (placement, event_type, created_at DESC);
