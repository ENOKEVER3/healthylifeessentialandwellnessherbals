CREATE POLICY "Block direct select on ad_events" ON public.ad_events FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "Block direct update on ad_events" ON public.ad_events FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "Block direct delete on ad_events" ON public.ad_events FOR DELETE TO anon, authenticated USING (false);