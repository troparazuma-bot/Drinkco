import type { ReactNode } from 'react';
import { Delete } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/lib/theme';

type NumericKeypadProps = {
  onDigit: (digit: string) => void;
  onBackspace: () => void;
};

const ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

export function NumericKeypad({ onDigit, onBackspace }: NumericKeypadProps) {
  return (
    <View style={styles.pad}>
      {ROWS.map((row) => (
        <View key={row.join('')} style={styles.row}>
          {row.map((digit) => (
            <Key key={digit} label={digit} onPress={() => onDigit(digit)} />
          ))}
        </View>
      ))}
      <View style={styles.row}>
        <Key
          label="Стереть"
          onPress={onBackspace}
          icon={<Delete size={24} color={colors.white} strokeWidth={2} />}
        />
        <Key label="0" onPress={() => onDigit('0')} />
        <View style={styles.keySpacer} />
      </View>
    </View>
  );
}

type KeyProps = {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
};

function Key({ label, onPress, icon }: KeyProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.key,
        pressed && styles.keyPressed,
      ]}>
      {icon ?? <Text style={styles.keyLabel}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pad: {
    width: '100%',
    maxWidth: 300,
    gap: 12,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  key: {
    flex: 1,
    height: 64,
    marginHorizontal: 6,
    borderRadius: 16,
    backgroundColor: colors.keyBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyPressed: {
    backgroundColor: colors.brown,
  },
  keySpacer: {
    flex: 1,
    marginHorizontal: 6,
  },
  keyLabel: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '600',
  },
});
