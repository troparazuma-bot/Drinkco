import { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton } from '@/components/ActionButton';
import { formatPrice } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { deleteProduct, type Product } from '@/lib/products';
import { colors } from '@/lib/theme';

const ADMIN_BUTTON_BACKGROUND = { backgroundColor: colors.keyBackground };

export default function AdminScreen() {
  const router = useRouter();
  const { products, loading, error: loadError, reload } = useProducts();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleDelete(product: Product) {
    setDeletingId(product.id);
    setActionError(null);
    try {
      await deleteProduct(product.id);
      await reload();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Не удалось удалить товар');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <ActionButton
          label="Опубликовать"
          onPress={() => router.push('/publish/camera')}
          style={[styles.topButton, ADMIN_BUTTON_BACKGROUND]}
        />
        <ActionButton
          label="Выйти"
          onPress={() => router.replace('/shop')}
          style={[styles.topButton, ADMIN_BUTTON_BACKGROUND]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Товары в магазине</Text>

        {loading && <ActivityIndicator size="large" color={colors.white} style={styles.loader} />}

        {!loading && loadError && <Text style={styles.errorText}>{loadError}</Text>}

        {!loading && !loadError && products.length === 0 && (
          <Text style={styles.emptyText}>Товаров пока нет</Text>
        )}

        {!loading &&
          !loadError &&
          products.map((product) => (
            <View key={product.id} style={styles.row}>
              <Image source={{ uri: product.image_url }} style={styles.thumbnail} resizeMode="cover" />
              <View style={styles.rowInfo}>
                <Text style={styles.rowPrice}>{formatPrice(product.price)}</Text>
                <Text style={styles.rowName} numberOfLines={2}>
                  {product.name}
                </Text>
              </View>
              <ActionButton
                label={deletingId === product.id ? '...' : 'Удалить'}
                variant="danger"
                disabled={deletingId !== null}
                onPress={() => handleDelete(product)}
                style={styles.deleteButton}
              />
            </View>
          ))}

        {actionError && <Text style={styles.errorText}>{actionError}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.darkBrown,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
  },
  topButton: {
    flex: 1,
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
  },
  loader: {
    marginTop: 32,
  },
  emptyText: {
    color: colors.white,
    fontSize: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brown,
    borderRadius: 16,
    padding: 12,
    gap: 12,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.darkBrown,
  },
  rowInfo: {
    flex: 1,
    gap: 4,
  },
  rowPrice: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  rowName: {
    color: colors.white,
    fontSize: 14,
  },
  deleteButton: {
    minHeight: 40,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  errorText: {
    color: '#FFB4A9',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  },
});
