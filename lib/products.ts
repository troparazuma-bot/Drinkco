import { supabase } from '@/lib/supabase';

export type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string;
};

const PRODUCT_COLUMNS = 'id, name, price, image_url';
const PHOTO_BUCKET = 'product-images';

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'string' &&
    typeof row.name === 'string' &&
    typeof row.price === 'number' &&
    typeof row.image_url === 'string'
  );
}

function toProducts(rows: unknown): Product[] {
  if (!Array.isArray(rows) || !rows.every(isProduct)) {
    throw new Error('Не удалось прочитать список товаров');
  }
  return rows;
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_COLUMNS)
    .order('created_at', { ascending: false });
  if (error) throw new Error('Не удалось загрузить товары');
  return toProducts(data);
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_COLUMNS)
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error('Не удалось загрузить товар');
  if (data === null) return null;
  if (!isProduct(data)) throw new Error('Не удалось прочитать товар');
  return data;
}

export async function createProduct(input: {
  name: string;
  price: number;
  photoUri: string;
}): Promise<void> {
  const photoResponse = await fetch(input.photoUri);
  if (!photoResponse.ok) throw new Error('Не удалось прочитать фото');
  const photoBytes = await photoResponse.arrayBuffer();

  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.jpg`;
  const { error: uploadError } = await supabase.storage
    .from(PHOTO_BUCKET)
    .upload(path, photoBytes, { contentType: 'image/jpeg' });
  if (uploadError) throw new Error('Не удалось загрузить фото');

  const { data: publicUrlData } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path);

  const { error: insertError } = await supabase.from('products').insert({
    name: input.name,
    price: input.price,
    image_url: publicUrlData.publicUrl,
  });
  if (insertError) throw new Error('Не удалось сохранить товар');
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw new Error('Не удалось удалить товар');
}
