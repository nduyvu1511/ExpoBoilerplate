import { Colors, CommonStyles } from '@/theme'
import { IconProps } from '@/types'
import React from 'react'
import { TouchableHighlight, TouchableHighlightProps } from 'react-native'
import { Spin } from '../spin'

export type IconButtonProps = Pick<TouchableHighlightProps, 'onPress' | 'disabled' | 'style'> & {
  icon: (props: IconProps) => JSX.Element
  loading?: boolean
  size?: number
}

export const IconButton = ({ icon: Icon, disabled, loading, size = 36, style, ...props }: IconButtonProps) => {
  return (
    <TouchableHighlight
      underlayColor={Colors.gray30}
      disabled={disabled || loading}
      style={[
        { height: size, width: size, borderRadius: size / 2 },
        CommonStyles.flexCenter,
        disabled && { opacity: 0.5 },
        style,
      ]}
      {...props}
    >
      {loading ? <Spin fill={Colors.gray70} size={24} /> : <Icon size={24} fill={Colors.gray70} />}
    </TouchableHighlight>
  )
}
