import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { colors } from '@/lib/theme';

type ActionButtonVariant = 'brown' | 'blue' | 'gray' | 'danger';

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ActionButtonVariant;
  disabled?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

const VARIANT_STYLES: Record<ActionButtonVariant, { background: string; pressed: string; text: string }> = {
  brown: { background: colors.brown, pressed: colors.brownPressed, text: colors.white },
  blue: { background: colors.blue, pressed: colors.bluePressed, text: colors.white },
  gray: { background: colors.gray, pressed: '#BDBDBD', text: colors.inputText },
  danger: { background: colors.danger, pressed: '#8C1D17', text: colors.white },
};

export function ActionButton({
  label,
  onPress,
  variant = 'brown',
  disabled = false,
  rounded = false,
  fullWidth = false,
  style,
}: ActionButtonProps) {
  const palette = VARIANT_STYLES[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        rounded && styles.rounded,
        fullWidth && styles.fullWidth,
        { backgroundColor: pressed ? palette.pressed : palette.background },
        disabled && styles.disabled,
        style,
      ]}>
      <Text style={[styles.label, { color: palette.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  rounded: {
    borderRadius: 28,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
