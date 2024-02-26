import { Colors } from '@/theme'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const PlusIcon = ({ size = 24, fill = Colors.gray50 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 6V18M18 12L6 12" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}
