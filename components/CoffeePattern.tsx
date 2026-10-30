import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Coffee } from 'lucide-react-native';
import { colors } from '@/lib/theme';

const CELL = 64;
const ICON_SIZE = 30;

export function CoffeePattern() {
  const { width, height } = useWindowDimensions();
  const cols = Math.ceil(width / CELL) + 1;
  const rows = Math.ceil(height / CELL) + 1;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => {
          const offsetX = row % 2 === 0 ? 0 : CELL / 2;
          const tilt = (row + col) % 2 === 0 ? '-14deg' : '14deg';
          return (
            <View
              key={`${row}-${col}`}
              style={[
                styles.cell,
                { left: col * CELL + offsetX - CELL / 2, top: row * CELL },
              ]}>
              <View style={{ transform: [{ rotate: tilt }] }}>
                <Coffee size={ICON_SIZE} color={colors.patternIcon} strokeWidth={2} />
              </View>
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    position: 'absolute',
    width: CELL,
    height: CELL,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
