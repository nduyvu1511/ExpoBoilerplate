import { Colors } from '@/theme'
import { IconProps } from '@/types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const ThreeDotsHorizontal = ({ fill = Colors.gray70, size }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.5 12.25C5.5 12.9404 6.05964 13.5 6.75 13.5C7.44036 13.5 8 12.9404 8 12.25C8 11.5596 7.44036 11 6.75 11C6.05964 11 5.5 11.5596 5.5 12.25ZM11.75 13.5C11.0596 13.5 10.5 12.9404 10.5 12.25C10.5 11.5596 11.0596 11 11.75 11C12.4404 11 13 11.5596 13 12.25C13 12.9404 12.4404 13.5 11.75 13.5ZM16.75 13.5C16.0596 13.5 15.5 12.9404 15.5 12.25C15.5 11.5596 16.0596 11 16.75 11C17.4404 11 18 11.5596 18 12.25C18 12.9404 17.4404 13.5 16.75 13.5Z"
        fill={fill}
      />
    </Svg>
  )
}
