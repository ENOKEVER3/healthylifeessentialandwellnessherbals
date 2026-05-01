-- Public bucket for consultation test result uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('consultation-uploads', 'consultation-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can upload to this bucket (anonymous patient uploads from the consultation form)
CREATE POLICY "Anyone can upload consultation files"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'consultation-uploads');

-- Anyone can read (so doctor can open the link from WhatsApp/email)
CREATE POLICY "Anyone can read consultation files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'consultation-uploads');