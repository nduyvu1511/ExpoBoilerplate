import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { Colors } from '@/theme'

export const FlashFillIcon = ({ size = 24, fill = Colors.gray50 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5.2522 11.8564L12.25 2.47602C12.9394 1.55197 14.3532 2.06335 14.3532 3.23675V8.9142C14.3532 9.5959 14.8799 10.1485 15.5298 10.1485H17.8212C18.802 10.1485 19.3522 11.3333 18.7478 12.1436L11.75 21.524C11.0606 22.448 9.64683 21.9367 9.64683 20.7633V15.0858C9.64683 14.4041 9.12005 13.8515 8.47024 13.8515H6.17877C5.19804 13.8515 4.64777 12.6667 5.2522 11.8564Z"
        fill={fill}
      />
    </Svg>
  )
}
