import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton } from '@/components/ActionButton';
import { NumericKeypad } from '@/components/NumericKeypad';
import { colors } from '@/lib/theme';

const ADMIN_CODE = '0167';
const CODE_LENGTH = 4;

export default function AdminLoginScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [keypadOpen, setKeypadOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleDigit(digit: string) {
    setError(null);
    setCode((current) => (current.length < CODE_LENGTH ? current + digit : current));
  }

  function handleBackspace() {
    setError(null);
    setCode((current) => current.slice(0, -1));
  }

  function handleConfirm() {
    if (code === ADMIN_CODE) {
      router.replace('/admin');
      return;
    }
    setError(code ? 'Неверный код' : 'Введите код');
    setCode('');
  }

  const slots = Array.from({ length: CODE_LENGTH }, (_, index) => code[index] ?? '');

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
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
        <Text style={styles.title}>Вход для администратора</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ввести код"
          onPress={() => setKeypadOpen(true)}
          style={styles.codeRow}>
          {slots.map((digit, index) => (
            <View key={index} style={[styles.codeSlot, keypadOpen && styles.codeSlotActive]}>
              <Text style={styles.codeDigit}>{digit ? '•' : ''}</Text>
            </View>
          ))}
        </Pressable>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {keypadOpen && <NumericKeypad onDigit={handleDigit} onBackspace={handleBackspace} />}

        <ActionButton label="ОК" variant="gray" fullWidth onPress={handleConfirm} style={styles.okButton} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.darkBrown,
  },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.keyBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    backgroundColor: colors.brown,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 30,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  codeSlot: {
    width: 56,
    height: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.keyBackground,
    backgroundColor: colors.brown,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeSlotActive: {
    borderColor: colors.white,
  },
  codeDigit: {
    fontSize: 32,
    color: colors.white,
    lineHeight: 40,
  },
  errorText: {
    color: '#FFB4A9',
    fontSize: 15,
    textAlign: 'center',
  },
  okButton: {
    marginTop: 8,
  },
});
