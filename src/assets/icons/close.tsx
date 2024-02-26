import { IconProps } from '@/types'
import { Colors } from '@/theme'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const CloseIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.2427 7.75738L7.75745 16.2427M16.2427 16.2426L7.75745 7.75732"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
