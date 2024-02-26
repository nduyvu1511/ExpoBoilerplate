import { Colors } from '@/theme'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const SecureIcon = ({ size = 24, fill = Colors.green }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.33248 4.71069L10.3708 2.36419C11.4134 1.8786 12.6036 1.8786 13.6462 2.36419L18.6646 4.70139C20.1321 5.38485 21.0953 6.92095 20.9925 8.60032C20.5981 15.0419 18.8406 17.9539 14.0899 21.3322C12.8361 22.2238 11.1823 22.2216 9.92759 21.3315C5.1914 17.9715 3.36871 15.1001 3.00617 8.57773C2.91343 6.90939 3.87515 5.38942 5.33248 4.71069ZM15.5644 10.4939C15.8372 10.1822 15.8056 9.70834 15.4938 9.43558C15.1821 9.16282 14.7083 9.1944 14.4355 9.50613L11.5656 12.786C11.4775 12.8867 11.3258 12.9002 11.2213 12.8166L9.46849 11.4144C9.14504 11.1556 8.67307 11.208 8.41431 11.5315C8.15556 11.8549 8.208 12.3269 8.53145 12.5857L10.2843 13.9879C11.0156 14.5729 12.0778 14.4786 12.6945 13.7738L15.5644 10.4939Z"
        fill={fill}
      />
    </Svg>
  )
}