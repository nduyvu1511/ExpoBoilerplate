import { Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  title: {
    ...Typography.body18SemiBold,
    textAlign: 'left',
    flex: 1,
  },
})
