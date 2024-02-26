import { Images } from '@/assets'
import { Colors, CommonStyles, Typography } from '@/theme'
import React from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { ImageAutoHeight } from '../image'

export type EmptyProps = {
  src?: string
  title?: string
  children?: JSX.Element
  style?: StyleProp<ViewStyle>
  titleBtn?: string
  onBtnPress?: () => void
}

export const Empty = ({
  src = Images.empty,
  titleBtn,
  children,
  style,
  title = 'Không có dữ liệu nào',
  onBtnPress,
}: EmptyProps) => {
  return (
    <View
      style={[
        CommonStyles.flexCenter,
        { flex: 1, paddingHorizontal: 24, paddingVertical: 16, backgroundColor: Colors.white },
        style,
      ]}
    >
      <ImageAutoHeight width={150} src={src} />
      <Text
        style={[
          Typography.body14Normal,
          { textAlign: 'center', color: Colors.gray70, marginTop: 24 },
        ]}
      >
        {title}
      </Text>

      {/* {titleBtn ? (
        <Button
          mode="outlined"
          style={{ marginTop: 24, flex: undefined }}
          title={titleBtn}
          height={38}
          onPress={() => onBtnPress?.()}
        />
      ) : null} */}
      {children}
    </View>
  )
}
