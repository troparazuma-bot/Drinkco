import { Stack } from 'expo-router';
import { PublishPhotoProvider } from '@/context/PublishPhotoContext';

export default function PublishLayout() {
  return (
    <PublishPhotoProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
    </PublishPhotoProvider>
  );
}
