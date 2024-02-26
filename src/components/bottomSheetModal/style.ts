import { Colors } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  indicator: {
    backgroundColor: Colors.gray30,
    height: 5,
    width: 36,
    borderRadius: 16,
  },
  indicatorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
})
