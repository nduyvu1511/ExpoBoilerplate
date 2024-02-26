import React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
import { Colors } from '@/theme'

export const UserAddIcon = ({ size = 24, fill = Colors.gray50 }) => {
  return (
    // <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    //   <Ellipse
    //     cx="10"
    //     cy="17.5"
    //     rx="7"
    //     ry="3.5"
    //     stroke={fill}
    //     strokeWidth="1.5"
    //     strokeLinejoin="round"
    //   />
    //   <Circle
    //     cx="10"
    //     cy="7"
    //     r="4"
    //     stroke={fill}
    //     strokeWidth="1.5"
    //     strokeLinejoin="round"
    //   />
    //   <Path d="M21 11H17" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
    //   <Path d="M19 9L19 13" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
    // </Svg>

    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 15C9.94583 13.6802 11.6997 13.6532 15 15"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="3"
        cy="3"
        r="3"
        transform="matrix(1 0 0 -1 8 11)"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <Path
        d="M19.777 13C19.9229 12.3568 20 11.6874 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C11.6874 20 12.3568 19.9229 13 19.777"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M18 16V20" stroke={fill} strokeWidth="1.5" stroke-linecap="round" />
      <Path d="M20 18L16 18" stroke={fill} strokeWidth="1.5" stroke-linecap="round" />
    </Svg>
  )
}
