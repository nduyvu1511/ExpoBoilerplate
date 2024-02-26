import { Colors } from '@/theme'
import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

export const LocationIcon = ({ size = 18, fill = Colors.gray50 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Circle cx="9" cy="8.25" r="2.25" stroke={fill} />
      <Path
        d="M15.25 8.16667C15.25 9.84052 14.2762 11.8123 12.9423 13.3914C12.2819 14.1731 11.5524 14.8351 10.8481 15.2978C10.1335 15.7671 9.4929 16 9 16V17C9.77273 17 10.6087 16.6514 11.3971 16.1336C12.1956 15.609 12.9954 14.8781 13.7062 14.0367C15.1144 12.3696 16.25 10.1747 16.25 8.16667H15.25ZM9 16C8.5071 16 7.8665 15.7671 7.15195 15.2978C6.44759 14.8351 5.71806 14.1731 5.05774 13.3914C3.72381 11.8123 2.75 9.84052 2.75 8.16667H1.75C1.75 10.1747 2.88557 12.3696 4.29382 14.0367C5.0046 14.8781 5.80436 15.609 6.60294 16.1336C7.39131 16.6514 8.22727 17 9 17V16ZM2.75 8.16667C2.75 4.76675 5.54235 2 9 2V1C5.00181 1 1.75 4.20279 1.75 8.16667H2.75ZM9 2C12.4577 2 15.25 4.76675 15.25 8.16667H16.25C16.25 4.20279 12.9982 1 9 1V2Z"
        fill={fill}
      />
    </Svg>
  )
}
