import { IconProps } from '@/types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const SortArrowIcon = ({ fill, size = 24 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 9L8 6M8 6L11 9M8 6V18" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M19 15L16 18M16 18L13 15M16 18L16 6"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
