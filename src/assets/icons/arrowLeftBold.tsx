import { Colors } from '@/theme'
import { IconProps } from '@/types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const ArrowLeftBoldIcon = ({ size = 24, fill = Colors.gray70 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13.9802 5.31999L10.7702 8.52999L8.80023 10.49C7.97023 11.32 7.97023 12.67 8.80023 13.5L13.9802 18.68C14.6602 19.36 15.8202 18.87 15.8202 17.92V12.31V6.07999C15.8202 5.11999 14.6602 4.63999 13.9802 5.31999Z"
        fill={fill}
      />
    </Svg>
  )
}
