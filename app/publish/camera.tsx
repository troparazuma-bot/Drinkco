import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { ActionButton } from '@/components/ActionButton';
import { usePublishPhoto } from '@/context/PublishPhotoContext';
import { colors } from '@/lib/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PublishCameraScreen() {
  const router = useRouter();
  const { setPhotoUri } = usePublishPhoto();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [capturing, setCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCapture() {
    if (!cameraRef.current || capturing) return;
    setCapturing(true);
    setError(null);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      if (!photo?.uri) throw new Error('empty');
      setPhotoUri(photo.uri);
      router.replace('/publish/details');
    } catch {
      setError('Не удалось сделать фото. Попробуйте еще раз.');
      setCapturing(false);
    }
  }

  const backButton = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Назад"
      onPress={() => router.back()}
      style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
      <ArrowLeft size={24} color={colors.white} strokeWidth={2} />
    </Pressable>
  );

  if (!permission) {
    return <View style={styles.root} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.root, styles.centered]} edges={['top', 'bottom']}>
        <View style={styles.topLeft}>{backButton}</View>
        <Text style={styles.permissionText}>Чтобы сфотографировать товар, разрешите доступ к камере</Text>
        <ActionButton label="Разрешить камеру" onPress={requestPermission} variant="blue" rounded style={styles.permissionButton} />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.root}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />
      <SafeAreaView style={styles.overlay} edges={['top', 'bottom']}>
        <View style={styles.topLeft}>{backButton}</View>
        <View style={styles.bottomArea}>
          {error && <Text style={styles.errorTextOnCamera}>{error}</Text>}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Сделать фото"
            disabled={capturing}
            onPress={handleCapture}
            style={({ pressed }) => [styles.shutter, pressed && styles.shutterPressed]}>
            {capturing ? (
              <ActivityIndicator color={colors.brown} />
            ) : (
              <View style={styles.shutterInner} />
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.darkBrown,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topLeft: {
    alignSelf: 'flex-start',
    padding: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 35, 20, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    opacity: 0.8,
  },
  bottomArea: {
    alignItems: 'center',
    paddingBottom: 32,
    gap: 16,
  },
  shutter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterPressed: {
    transform: [{ scale: 0.94 }],
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
  },
  permissionText: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
  },
  permissionButton: {
    alignSelf: 'stretch',
  },
  errorText: {
    color: '#FFB4A9',
    fontSize: 15,
    textAlign: 'center',
  },
  errorTextOnCamera: {
    color: colors.white,
    backgroundColor: colors.danger,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    fontSize: 15,
    overflow: 'hidden',
  },
});
