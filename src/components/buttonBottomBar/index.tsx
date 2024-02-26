// import React from 'react'
// import { StyleProp, TextStyle, View, ViewStyle } from 'react-native'
// import { styles } from './style'

// // export type ButtonOptionItem = Item & Required<Pick<Item, 'onPress'>>

// export type ButtonBottomBarProps = {
//   onLeftPress?: () => void
//   onRightPress?: () => void
//   //   onOptionItemChange?: (data: ButtonOptionItem) => void
//   //   onOptionItemChangeAfterModalHide?: (data: ButtonOptionItem) => void
//   //   options?: ButtonOptionItem[]
//   //   optionBtnIconSize?: number
//   //   optionBtnStyle?: StyleProp<ViewStyle>
//   //   optionTitle?: string
//   leftTitle?: string
//   rightTitle?: string
//   leftDisabled?: boolean
//   rightDisabled?: boolean
//   style?: StyleProp<ViewStyle>
//   leftStyle?: StyleProp<ViewStyle>
//   rightStyle?: StyleProp<ViewStyle>
//   leftProps?: any // Partial<ButtonProps>
//   rightProps?: any // Partial<ButtonProps>
//   leftLabelStyle?: StyleProp<TextStyle>[]
//   rightLabelStyle?: StyleProp<TextStyle>[]
//   separatorWidth?: number
//   height?: number
//   children?: JSX.Element | null
// }

// export const ButtonBottomBar = ({
//   onLeftPress,
//   onRightPress,
//   //   onOptionItemChange,
//   //   onOptionItemChangeAfterModalHide,
//   //   optionBtnIconSize = 40,
//   //   optionBtnStyle,
//   //   optionTitle = 'Chọn hành động',
//   //   options,
//   leftTitle = 'Đặt lại',
//   rightTitle = 'Áp dụng',
//   leftDisabled,
//   rightDisabled,
//   style,
//   rightProps,
//   leftProps,
//   leftStyle,
//   rightStyle,
//   leftLabelStyle,
//   rightLabelStyle,
//   height = 44,
//   separatorWidth = 12,
//   children,
// }: ButtonBottomBarProps) => {
//   return (
//     <View style={[styles({ height, separatorWidth }).container, style]}>
//       {children}

//       <View style={[{ flexDirection: 'row' }]}>
//         {onLeftPress ? (
//           <Button
//             disabled={leftDisabled}
//             mode="outlined"
//             onPress={onLeftPress}
//             height={height}
//             labelStyle={leftLabelStyle}
//             style={[leftStyle, { flex: 1 }]}
//             title={leftTitle}
//             {...leftProps}
//           />
//         ) : null}

//         {onLeftPress && onRightPress ? <View style={{ width: separatorWidth }} /> : null}

//         {onRightPress ? (
//           <Button
//             disabled={rightDisabled}
//             onPress={onRightPress}
//             mode="contained"
//             labelStyle={rightLabelStyle}
//             height={height}
//             style={[rightStyle, { flex: 1 }]}
//             title={rightTitle}
//             {...rightProps}
//           />
//         ) : null}

//         {/* {options ? (
//           <Pressable onPress={onOpen} style={[styles({ height, separatorWidth }).optionBtn, optionBtnStyle]}>
//             <ThreeDotsHorizontal size={optionBtnIconSize} fill={Colors.primary} />
//           </Pressable>
//         ) : null} */}
//       </View>

//       {/* {options?.length ? (
//         <ModalSelectItem
//           title={optionTitle}
//           scrollEnabled={false}
//           isVisible={visible}
//           onDismiss={onClose}
//           data={options}
//           onChange={onOptionItemChange}
//           onChangeAfterModalHide={onOptionItemChangeAfterModalHide}
//         />
//       ) : null} */}
//     </View>
//   )
// }

export {}
