GRANT SELECT ON public.site_reviews TO anon;
GRANT SELECT, INSERT ON public.site_reviews TO authenticated;
GRANT ALL ON public.site_reviews TO service_role;