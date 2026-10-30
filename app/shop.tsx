import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ActionButton } from '@/components/ActionButton';
import { PatternScreen } from '@/components/PatternScreen';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { colors } from '@/lib/theme';

export default function ShopScreen() {
  const router = useRouter();
  const { products, loading, error } = useProducts();

  return (
    <PatternScreen>
      <View style={styles.header}>
        <Text style={styles.title}>Drinkco</Text>
        <ActionButton label="АДМИН" onPress={() => router.push('/admin-login')} style={styles.adminButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {loading && (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.brown} />
          </View>
        )}

        {!loading && error && <Text style={styles.errorText}>{error}</Text>}

        {!loading && !error && products.length === 0 && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Товаров пока нет. Скоро здесь появятся напитки!</Text>
          </View>
        )}

        {!loading && !error && products.length > 0 && (
          <View style={styles.grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </PatternScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.brownText,
    lineHeight: 34,
  },
  adminButton: {
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  centered: {
    paddingVertical: 64,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  emptyCard: {
    backgroundColor: colors.grayPanel,
    borderRadius: 20,
    padding: 24,
    marginTop: 32,
  },
  emptyText: {
    color: colors.grayText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  errorText: {
    color: colors.danger,
    backgroundColor: colors.grayPanel,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
    overflow: 'hidden',
  },
});
