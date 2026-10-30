import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CoffeePattern } from '@/components/CoffeePattern';
import { colors } from '@/lib/theme';

type PatternScreenProps = {
  children: ReactNode;
  background?: string;
  withPattern?: boolean;
};

export function PatternScreen({
  children,
  background = colors.background,
  withPattern = true,
}: PatternScreenProps) {
  return (
    <View style={[styles.root, { backgroundColor: background }]}>
      {withPattern && <CoffeePattern />}
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
