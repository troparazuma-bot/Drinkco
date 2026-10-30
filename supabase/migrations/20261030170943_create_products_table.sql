/*
# Create products table and product-images storage bucket

1. New Tables
- `products`: items shown on the shop page.
  - `id` (uuid, primary key)
  - `name` (text, required) product name typed by the admin
  - `price` (integer, required) price in whole currency units
  - `image_url` (text, required) public link to the product photo
  - `created_at` (timestamp)

2. Storage
- Public bucket `product-images` holds the product photos.

3. Security
- RLS enabled on `products`.
- Shared catalog: anon and authenticated roles can read, add and remove products (the app has no sign-in; admin access is gated inside the app).
- Storage: anyone can read photos from the public bucket and upload new ones to it.

4. Notes
- Nothing is dropped or altered; this only creates new objects.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price integer NOT NULL CHECK (price >= 0),
  image_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, DELETE ON products TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "anon_upload_product_images" ON storage.objects;
CREATE POLICY "anon_upload_product_images" ON storage.objects FOR INSERT
  TO anon, authenticated WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "anon_read_product_images" ON storage.objects;
CREATE POLICY "anon_read_product_images" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'product-images');
