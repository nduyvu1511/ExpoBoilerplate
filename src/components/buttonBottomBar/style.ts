import { Colors, CommonStyles, Typography } from '@/theme'
import { hasNotch } from '@/utils'
import { StyleSheet } from 'react-native'

export const styles = ({ height, separatorWidth }: { height: number; separatorWidth: number }) =>
  StyleSheet.create({
    container: {
      padding: 16,
      paddingBottom: hasNotch() ? 24 : 16,
      backgroundColor: Colors.white,
      flexDirection: 'row',
    },
    checkboxArea: {
      ...CommonStyles.flexCenter,
      marginRight: separatorWidth,
    },
    checkboxLabel: {
      ...Typography.body10Medium,
      color: Colors.gray70,
      marginTop: 2,
    },
    optionBtn: {
      ...CommonStyles.flexCenter,
      marginLeft: separatorWidth,
      height,
      width: height,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
  })

const a = ''
