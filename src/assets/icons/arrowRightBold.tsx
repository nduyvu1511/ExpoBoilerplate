import { Colors } from '@/theme'
import { IconProps } from '@/types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const ArrowRightBoldIcon = ({ size = 24, fill = Colors.gray70 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.2002 10.49L13.2302 8.52005L10.0202 5.31005C9.34018 4.64005 8.18018 5.12005 8.18018 6.08005V12.31V17.92C8.18018 18.88 9.34018 19.36 10.0202 18.68L15.2002 13.5C16.0302 12.68 16.0302 11.32 15.2002 10.49Z"
        fill={fill}
      />
    </Svg>
  )
}
