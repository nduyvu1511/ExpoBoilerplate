import { Colors } from '@/theme'
import { IconProps } from '@/types'
import React from 'react'
import { Circle, Path, Svg } from 'react-native-svg'

export const InfoIcon = ({ fill = Colors.gray50, size = 24 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="7" r="1" fill={fill} />
      <Path
        d="M11 10H12V17M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
