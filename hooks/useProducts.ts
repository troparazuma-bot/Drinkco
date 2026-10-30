import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { fetchProducts, type Product } from '@/lib/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProducts(await fetchProducts());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить товары');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return { products, loading, error, reload: load };
}
