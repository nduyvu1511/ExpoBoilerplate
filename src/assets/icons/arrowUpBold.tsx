import { Colors } from '@/theme'
import { IconProps } from '@/types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const ArrowUpBoldIcon = ({ size = 24, fill = Colors.gray70 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.6801 13.98L15.4701 10.77L13.5101 8.79999C12.6801 7.96999 11.3301 7.96999 10.5001 8.79999L5.32007 13.98C4.64007 14.66 5.13007 15.82 6.08007 15.82H11.6901H17.9201C18.8801 15.82 19.3601 14.66 18.6801 13.98Z"
        fill={fill}
      />
    </Svg>
  )
}
