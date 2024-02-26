import React from 'react'
import { Dimensions, KeyboardAvoidingView, View, ViewStyle, useWindowDimensions } from 'react-native'
import RModal, { ModalProps as RModalProps } from 'react-native-modal'
import { TabbarModal, TabbarModalProps } from '../tabbarModal'
import { styles } from './style'

export type ModalProps = Partial<RModalProps> &
  Required<Pick<RModalProps, 'isVisible' | 'onDismiss' | 'children'>> &
  Partial<TabbarModalProps> & {
    tabbarStyle?: ViewStyle | ViewStyle[]
    modalStyle?: ViewStyle | ViewStyle[]
    keyboardAvoidingViewStyle?: ViewStyle | ViewStyle[]
    keyboardVerticalOffset?: number
  }

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
//   Platform.OS === 'ios'
//     ? Dimensions.get('window').height
//     : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')

export const Modal = ({
  onDismiss,
  onLeftPress,
  onRightPress,
  title,
  modalStyle,
  tabbarStyle,
  keyboardAvoidingViewStyle,
  keyboardVerticalOffset = 85,
  ...props
}: ModalProps) => {
  const { width } = useWindowDimensions()

  return (
    <RModal
      onBackButtonPress={onDismiss}
      statusBarTranslucent
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      onDismiss={onDismiss}
      onBackdropPress={onDismiss}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={1}
      animationOutTiming={1}
      hideModalContentWhileAnimating
      {...props}
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 0,
          marginVertical: 0,
        },
        props.style,
      ]}
    >
      <KeyboardAvoidingView
        style={keyboardAvoidingViewStyle}
        behavior={'padding'}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={[styles.modalChildren, { maxWidth: width, width: width - 48 }, modalStyle]}>
          {title ? (
            <TabbarModal title={title} onRightPress={onDismiss} onLeftPress={onLeftPress} style={tabbarStyle} />
          ) : null}
          {props.children}
        </View>
      </KeyboardAvoidingView>
    </RModal>
  )
}
