CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  items jsonb NOT NULL,
  subtotal numeric NOT NULL,
  shipping numeric NOT NULL,
  total numeric NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT orders_len CHECK (
    char_length(order_number) BETWEEN 4 AND 20
    AND char_length(customer_name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 255
    AND char_length(phone) BETWEEN 5 AND 30
    AND char_length(address) BETWEEN 1 AND 300
    AND char_length(city) BETWEEN 1 AND 100
    AND char_length(postal_code) BETWEEN 1 AND 20
  ),
  CONSTRAINT orders_items_array CHECK (jsonb_typeof(items) = 'array' AND jsonb_array_length(items) BETWEEN 1 AND 100),
  CONSTRAINT orders_amounts CHECK (subtotal >= 0 AND shipping >= 0 AND total >= 0)
);

GRANT INSERT ON public.orders TO anon, authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can place an order"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'new');