import React from 'react'
import { Path, Svg } from 'react-native-svg'

export const TorchFillIcon = ({ size = 24, fill = '#3A3A3A' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.85714 2H17.1429C17.6162 2 18 2.38376 18 2.85714C18 4.93271 16.7705 6.7211 15 7.53368V19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19V7.53368C7.22955 6.7211 6 4.93271 6 2.85714C6 2.38376 6.38376 2 6.85714 2ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9V11C11.25 11.4142 11.5858 11.75 12 11.75C12.4142 11.75 12.75 11.4142 12.75 11V9Z"
        fill={fill}
      />
    </Svg>
  )
}
