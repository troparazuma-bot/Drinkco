import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Product } from '@/lib/products';
import { colors } from '@/lib/theme';

type ProductCardProps = {
  product: Product;
  onPress: () => void;
};

export function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={product.name}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}>
      <Image source={{ uri: product.image_url }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.brown,
    shadowColor: colors.darkBrown,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.darkBrown,
  },
  info: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
    gap: 4,
  },
  price: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  name: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 18,
  },
});
