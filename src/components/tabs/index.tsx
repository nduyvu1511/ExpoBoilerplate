import { Colors, Typography } from '@/theme'
import { Option } from '@/types'
import { MotiView } from 'moti'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler'

export type TabsProps<T extends string | number = string> = {
  value?: T
  gapX?: number
  color?: string
  index?: number
  options: Option<T>[]
  colorActive?: string
  viewPosition?: number // from 0 to 1
  viewOffset?: number
  style?: StyleProp<ViewStyle>
  itemStyle?: StyleProp<ViewStyle>
  itemActiveStyle?: StyleProp<ViewStyle>
  itemLabelStyle?: StyleProp<TextStyle>
  itemLabelActiveStyle?: StyleProp<TextStyle>
  onChange?: (value: T, index: number) => void
}

export const Tabs = ({
  options,
  value,
  style,
  gapX = 12,
  onChange,
  index: externalIndex,
  color = Colors.gray10,
  colorActive = Colors.active,
  viewPosition = 0.5,
  itemStyle,
  itemLabelStyle,
  itemActiveStyle,
  itemLabelActiveStyle,
}: TabsProps) => {
  const ref = useRef<FlatList>(null)
  const [index, setIndex] = useState<number>(-1)

  useEffect(() => {
    if (index >= 0) {
      ref.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: viewPosition,
        viewOffset: gapX / 2,
      })
    }
  }, [index])

  useEffect(() => {
    if (Number(externalIndex) >= 0) {
      setIndex(index)
    }
  }, [externalIndex])

  useEffect(() => {
    if (value === undefined) return

    setIndex(options?.findIndex((item) => item.value === value))
  }, [value])

  return (
    <View>
      <FlatList
        ref={ref}
        horizontal
        style={[style]}
        nestedScrollEnabled={true}
        initialNumToRender={options?.length}
        showsHorizontalScrollIndicator={false}
        data={options}
        initialScrollIndex={index < 0 ? 0 : index}
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          ref.current?.scrollToOffset({
            offset: averageItemLength * index,
            animated: true,
          })
        }}
        keyExtractor={({}, index) => index + ''}
        renderScrollComponent={(props) => <GestureHandlerScrollView {...props} />}
        renderItem={({ item, index: _index }) => {
          const isActive = index === _index

          return (
            <Pressable
              onPress={() => {
                onChange?.(item.value, _index)
                setIndex(_index)
              }}
            >
              <MotiView
                animate={{ backgroundColor: isActive ? colorActive : color }}
                transition={{ duration: 200 }}
                style={[
                  {
                    alignItems: 'flex-start',
                    borderRadius: 10,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    marginRight: gapX,
                  },
                  _index === 0 && { marginLeft: gapX },
                  itemStyle,
                  isActive && itemActiveStyle,
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    Typography.body14Normal,
                    isActive && { color: Colors.white },
                    itemLabelStyle,
                    isActive && itemLabelActiveStyle,
                  ]}
                >
                  {item.label}
                </Text>
              </MotiView>
            </Pressable>
          )
        }}
      />
    </View>
  )
}
