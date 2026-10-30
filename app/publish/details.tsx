import { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton } from '@/components/ActionButton';
import { usePublishPhoto } from '@/context/PublishPhotoContext';
import { createProduct } from '@/lib/products';
import { colors } from '@/lib/theme';

export default function PublishDetailsScreen() {
  const router = useRouter();
  const { photoUri, setPhotoUri } = usePublishPhoto();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!photoUri) router.replace('/publish/camera');
  }, [photoUri, router]);

  async function handleSave() {
    if (!photoUri) return;
    const trimmedName = name.trim();
    const priceValue = Number(price);
    if (!trimmedName) {
      setError('Введите название товара');
      return;
    }
    if (!price || !Number.isInteger(priceValue) || priceValue <= 0) {
      setError('Введите цену в рублях');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await createProduct({ name: trimmedName, price: priceValue, photoUri });
      setPhotoUri(null);
      router.replace('/shop');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось сохранить товар');
      setSaving(false);
    }
  }

  if (!photoUri) return null;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.panel}>
            <Image source={{ uri: photoUri }} style={styles.preview} resizeMode="cover" />

            <View style={styles.field}>
              <TextInput
                accessibilityLabel="Название товара"
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Например, Капучино"
                placeholderTextColor={colors.grayText}
                maxLength={60}
                returnKeyType="next"
              />
              <Text style={styles.fieldLabel}>название товара</Text>
            </View>

            <View style={styles.field}>
              <TextInput
                accessibilityLabel="Цена"
                style={styles.input}
                value={price}
                onChangeText={(text) => setPrice(text.replace(/\D/g, '').slice(0, 7))}
                placeholder="Например, 250"
                placeholderTextColor={colors.grayText}
                keyboardType="number-pad"
                returnKeyType="done"
              />
              <Text style={styles.fieldLabel}>цена</Text>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <ActionButton
              label={saving ? 'Сохраняем...' : 'ОК'}
              onPress={handleSave}
              variant="brown"
              disabled={saving}
              fullWidth
              style={styles.okButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.brown,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  panel: {
    backgroundColor: colors.grayPanel,
    borderRadius: 24,
    padding: 24,
    gap: 24,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: colors.darkBrown,
  },
  field: {
    gap: 8,
  },
  input: {
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    fontSize: 18,
    color: colors.inputText,
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  fieldLabel: {
    color: colors.grayText,
    fontSize: 15,
    paddingLeft: 4,
  },
  errorText: {
    color: colors.danger,
    fontSize: 15,
    textAlign: 'center',
  },
  okButton: {
    marginTop: 8,
  },
});
