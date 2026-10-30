import { Image, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ActionButton } from '@/components/ActionButton';
import { PatternScreen } from '@/components/PatternScreen';
import { colors } from '@/lib/theme';

const logo = require('@/assets/images/1793096927692.jpg');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <PatternScreen>
      <View style={styles.content}>
        <Animated.View entering={FadeIn.duration(600)} style={styles.logoWrap}>
          <Image source={logo} style={styles.logo} resizeMode="cover" />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.textWrap}>
          <Text style={styles.title}>Добро пожаловать в Drinkco!</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.buttonWrap}>
          <ActionButton
            label="Погнали!"
            variant="brown"
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
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 40,
  },
  logoWrap: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 48,
  },
  textWrap: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.brownText,
    lineHeight: 34,
    textAlign: 'center',
  },
  buttonWrap: {
    alignSelf: 'stretch',
    maxWidth: 320,
  },
});
