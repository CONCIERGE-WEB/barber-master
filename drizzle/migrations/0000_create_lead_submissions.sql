CREATE TABLE public.lead_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  shop_name TEXT,
  plan_interest TEXT NOT NULL DEFAULT 'Ainda não sei',
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT lead_name_len CHECK (char_length(btrim(name)) BETWEEN 2 AND 100),
  CONSTRAINT lead_whatsapp_len CHECK (char_length(btrim(whatsapp)) BETWEEN 8 AND 20),
  CONSTRAINT lead_email_len CHECK (email IS NULL OR char_length(btrim(email)) <= 255),
  CONSTRAINT lead_shop_len CHECK (shop_name IS NULL OR char_length(btrim(shop_name)) <= 120),
  CONSTRAINT lead_message_len CHECK (message IS NULL OR char_length(btrim(message)) <= 1000),
  CONSTRAINT lead_plan_known CHECK (plan_interest IN ('Lobo Solitário', 'Presença Digital', 'Gestão de Equipe', 'Premium', 'Ainda não sei'))
);

GRANT INSERT ON public.lead_submissions TO anon;
GRANT SELECT ON public.lead_submissions TO authenticated;
GRANT ALL ON public.lead_submissions TO service_role;

ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can submit a lead"
ON public.lead_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);