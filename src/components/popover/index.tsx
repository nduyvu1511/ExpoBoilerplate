import { ArrowDownIcon } from '@/assets'
import { useBoolean } from '@/hooks'
import { Colors } from '@/theme'
import { MotiView } from 'moti'
import React, { ReactNode, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { Portal } from 'react-native-portalize'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './style'

export type PopoverProps = {
  trigger?: JSX.Element
  triggerLabel?: string
  children?: ReactNode
  triggerStyle?: StyleProp<ViewStyle>
  triggerLabelStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'bottomCenter' | 'topCenter'
  columnGap?: number // spacing from top or bottom
  renderChildren?: (onClose: () => void) => ReactNode // same with children but add on onClose
}

export type PopoverForwardRef = {
  dismiss: () => void
}

type Position = {
  pageX: number
  width: number
  height: number
  pageY: number
}

export const Popover = forwardRef<PopoverForwardRef, PopoverProps>(
  (
    {
      columnGap,
      children,
      trigger,
      triggerLabel,
      style,
      contentStyle,
      triggerStyle,
      triggerLabelStyle,
      placement = 'bottomLeft',
      renderChildren,
    },
    ref
  ) => {
    const viewRef = useRef<View>(null)
    const scale = useRef(new Animated.Value(0)).current

    const { visible, onClose, onOpen } = useBoolean()
    const [position, setPosition] = useState<Position>({
      height: 0,
      pageX: 0,
      width: 0,
      pageY: 0,
    })

    useImperativeHandle(ref, () => ({ dismiss: () => resizeBox(0) }), [ref])

    const onPressIn = () => {
      Keyboard.dismiss()
      viewRef?.current?.measure((x, y, width, height, pageX, pageY) => {
        setPosition({ pageY, width, height, pageX })
      })
    }

    const resizeBox = (to: number) => {
      if (to === 1) onOpen()

      Animated.timing(scale, {
        toValue: to,
        useNativeDriver: true,
        duration: 200,
        easing: Easing.linear,
      }).start(() => to === 0 && onClose())
    }

    return (
      <>
        <Pressable onPressIn={onPressIn} ref={viewRef} onPress={() => resizeBox(1)}>
          {trigger ?? (
            <MotiView
              style={[styles.trigger, triggerStyle]}
              transition={{ duration: 200 }}
              animate={{
                borderColor: visible ? Colors.active : Colors.gray20,
                borderWidth: visible ? 1.5 : 1,
              }}
            >
              <Text numberOfLines={1} style={[styles.triggerLabel, triggerLabelStyle]}>
                {triggerLabel}
              </Text>
              <ArrowDownIcon size={20} />
            </MotiView>
          )}
        </Pressable>

        <Portal>
          <Modal transparent visible={visible} onRequestClose={() => resizeBox(0)}>
            <PopoverContent
              columnGap={columnGap}
              style={style}
              scale={scale}
              position={position}
              children={children}
              placement={placement}
              contentStyle={contentStyle}
              renderChildren={renderChildren}
              onClose={() => resizeBox(0)}
            />
            <TouchableWithoutFeedback accessible={false} onPress={() => resizeBox(0)}>
              <View style={styles.container} />
            </TouchableWithoutFeedback>
          </Modal>
        </Portal>
      </>
    )
  }
)

const PopoverContent = ({
  scale,
  style,
  contentStyle,
  columnGap = 0,
  placement = 'bottomLeft',
  children,
  position,
  onClose,
  renderChildren,
}: Pick<PopoverProps, 'placement' | 'children' | 'renderChildren' | 'style' | 'columnGap' | 'contentStyle'> & {
  position: Position
  scale: Animated.Value
  onClose: () => void
}) => {
  const insets = useSafeAreaInsets()
  const { width, height } = useWindowDimensions()
  const [contentSize, setContentSize] = useState<{ width: number; height: number }>({ height: 0, width: 0 })

  const top = position.pageY + position.height + (Platform.OS === 'android' ? -insets.top : 0) + columnGap
  const bottom = height - position.pageY + (Platform.OS === 'android' ? insets.top : 0) + columnGap
  const right = width - (position.width + position.pageX)
  const left = position.pageX

  return (
    <Animated.View
      onLayout={(e) => setContentSize(e.nativeEvent.layout)}
      style={[
        styles.wrap,
        style,
        placement.includes('top') && (contentSize.height <= position.pageY ? { bottom } : { top }),
        placement.includes('bottom') && (contentSize.height <= bottom ? { top } : { bottom }),
        // placement.includes('Right') && (contentSize.width <= right ? { left } : { right }),
        // placement.includes('Left') && (contentSize.width <= left ? { left } : { right }),
        placement.includes('Right') && { right },
        placement.includes('Left') && { left },
        placement.includes('Center') && { left: left + (position.width - contentSize.width) / 2 },
        {
          transform: [{ scale }],
          opacity: scale.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
        },
      ]}
    >
      <View style={[styles.wrapContent, contentStyle]}>{renderChildren?.(onClose) ?? children}</View>
    </Animated.View>
  )
}
