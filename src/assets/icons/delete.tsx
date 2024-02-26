import { Colors } from '@/theme'
import { IconProps } from '@/types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const DeleteIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 9L14 12M14 12L11 15M14 12L11 9M14 12L17 15M3.52405 15.4403L7.34938 18.8689C8.16293 19.5981 9.2072 20 10.2882 20H17.5371C20.0019 20 22 17.9533 22 15.4286V8.57143C22 6.0467 20.0019 4 17.5371 4H10.2882C9.2072 4 8.16293 4.40191 7.34939 5.13108L3.52406 8.55965C1.49198 10.381 1.49198 13.619 3.52405 15.4403Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  )
}
