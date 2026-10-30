import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { ActionButton } from '@/components/ActionButton';
import { PatternScreen } from '@/components/PatternScreen';
import { formatPrice } from '@/components/ProductCard';
import { fetchProductById, type Product } from '@/lib/products';
import { colors } from '@/lib/theme';

export default function ProductScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then((row) => {
        if (active) setProduct(row);
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : 'Не удалось загрузить товар');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <PatternScreen>
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Назад"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
          <ArrowLeft size={24} color={colors.white} strokeWidth={2} />
        </Pressable>
      </View>

      <View style={styles.content}>
        {loading && <ActivityIndicator size="large" color={colors.brown} />}

        {!loading && error && <Text style={styles.errorText}>{error}</Text>}

        {!loading && !error && !product && (
          <Text style={styles.errorText}>Товар не найден</Text>
        )}

        {!loading && !error && product && (
          <View style={styles.menu}>
            <Image source={{ uri: product.image_url }} style={styles.image} resizeMode="cover" />
            <View style={styles.details}>
              <Text style={styles.price}>{formatPrice(product.price)}</Text>
              <Text style={styles.name}>{product.name}</Text>
            </View>
            <ActionButton
              label="Купить"
              variant="blue"
              onPress={() => router.push('/order')}
              style={styles.buyButton}
            />
          </View>
        )}
      </View>
    </PatternScreen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.brown,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    backgroundColor: colors.brownPressed,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  menu: {
    backgroundColor: colors.grayPanel,
    borderRadius: 24,
    padding: 24,
    gap: 24,
    shadowColor: colors.darkBrown,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: colors.darkBrown,
  },
  details: {
    gap: 8,
    alignItems: 'center',
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.brownText,
  },
  name: {
    fontSize: 18,
    color: colors.grayText,
    textAlign: 'center',
  },
  buyButton: {
    alignSelf: 'center',
    minWidth: 200,
  },
  errorText: {
    color: colors.danger,
    backgroundColor: colors.grayPanel,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlign: 'center',
    overflow: 'hidden',
  },
});
