import { ArrowLeftIcon, CloseIcon } from '@/assets'
import { Colors } from '@/theme'
import { IconProps } from '@/types'
import React from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { IconButton } from '../button'
import { styles } from './style'

export interface TabbarModalProps {
  onLeftPress?: () => void
  onRightPress?: () => void
  rightIcon?: (props: IconProps) => JSX.Element
  leftIcon?: (props: IconProps) => JSX.Element
  title: string
  style?: StyleProp<ViewStyle>
}

export const TabbarModal = ({
  title,
  style,
  leftIcon: LeftIcon = () => <ArrowLeftIcon size={24} fill={Colors.gray80} />,
  rightIcon: RightIcon = () => <CloseIcon size={24} fill={Colors.gray80} />,
  onLeftPress,
  onRightPress,
}: TabbarModalProps) => {
  return (
    <View style={[styles.tabbar, style]}>
      {onLeftPress ? (
        <IconButton
          size={32}
          icon={() => <LeftIcon size={20} fill={Colors.gray80} />}
          onPress={onLeftPress}
          style={{ position: 'relative', right: 8 }}
        />
      ) : null}
      <Text numberOfLines={1} style={[styles.title, onLeftPress && { textAlign: 'center' }]}>
        {title}
      </Text>
      {onRightPress ? (
        <IconButton
          size={32}
          icon={() => <RightIcon size={20} fill={Colors.gray80} />}
          onPress={onRightPress}
          style={{ position: 'relative', left: 8 }}
        />
      ) : null}
    </View>
  )
}
