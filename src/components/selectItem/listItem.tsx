import { TickIcon } from '@/assets'
import { IconProps } from '@/types'
import { Colors } from '@/theme'
import React from 'react'
import {
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native'
import { Spin } from '../spin'
import { styles } from './style'

export type ListItemProps<T extends string | number> = {
  title: T
  numberOfLines?: number
  titleStyle?: StyleProp<TextStyle>
  titleActiveStyle?: StyleProp<TextStyle>

  onPress?: () => void
  active?: boolean
  loading?: boolean
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode | undefined

  leftIcon?: (props: IconProps) => JSX.Element
  rightIcon?: (props: IconProps) => JSX.Element
  onRightIconPress?: () => void
  onLeftIconPress?: () => void
}

export const ListItem = <T extends string | number>({
  onRightIconPress,
  onLeftIconPress,
  onPress,
  style,
  title,
  numberOfLines = 2,
  active,
  loading,
  disabled: externalDisabled,
  children,
  titleStyle,
  titleActiveStyle,
  containerStyle,
  rightIcon: RightICon,
  leftIcon: LeftIcon,
}: ListItemProps<T>) => {
  const disabled = externalDisabled || loading

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      // underlayColor={Colors.gray20}
      style={[{ backgroundColor: Colors.white, paddingHorizontal: 12 }, containerStyle]}
    >
      <View style={[styles.container, disabled && { opacity: 0.5 }, style]}>
        <View style={styles.item}>
          {LeftIcon ? (
            <Pressable
              style={{ marginRight: 8, position: 'relative', top: 2 }}
              disabled={!onLeftIconPress}
              onPress={onLeftIconPress}
            >
              <LeftIcon size={18} fill={Colors.text} />
            </Pressable>
          ) : null}

          <Text
            numberOfLines={numberOfLines}
            style={[
              styles.text,
              titleStyle,
              (active || RightICon) && { marginRight: 8 },
              titleActiveStyle,
              active && { color: Colors.active },
            ]}
          >
            {title}
          </Text>

          {active ? (
            <TickIcon fill={Colors.active} size={24} />
          ) : RightICon ? (
            <Pressable
              style={{ marginRight: 8, position: 'relative', top: 2 }}
              disabled={!onRightIconPress}
              onPress={onRightIconPress}
            >
              <RightICon size={18} fill={Colors.text} />
            </Pressable>
          ) : null}
        </View>

        {children}

        {loading ? (
          <View style={styles.loadingView}>
            <Spin size={18} />
          </View>
        ) : null}
      </View>
    </Pressable>
  )
}
