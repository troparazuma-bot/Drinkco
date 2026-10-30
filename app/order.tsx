import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Truck } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ActionButton } from '@/components/ActionButton';
import { PatternScreen } from '@/components/PatternScreen';
import { colors } from '@/lib/theme';

export default function OrderScreen() {
  const router = useRouter();

  return (
    <PatternScreen>
      <View style={styles.content}>
        <Animated.View entering={FadeInDown.duration(500)} style={styles.center}>
          <View style={styles.iconCircle}>
            <Truck size={56} color={colors.brown} strokeWidth={2} />
          </View>
          <Text style={styles.title}>Едет заказ</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.buttonWrap}>
          <ActionButton
            label="Приехал"
            variant="blue"
            rounded
            fullWidth
            onPress={() => router.replace('/shop')}
          />
        </Animated.View>
      </View>
    </PatternScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 48,
  },
  center: {
    alignItems: 'center',
    gap: 16,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.grayPanel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.brownText,
    lineHeight: 38,
    textAlign: 'center',
  },
  buttonWrap: {
    alignSelf: 'stretch',
  },
});
