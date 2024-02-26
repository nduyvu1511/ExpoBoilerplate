import { Colors } from '@/theme'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal as RNBottomSheetModal,
  BottomSheetModalProps as RNBottomSheetModalProps,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { BackHandler, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './style'

export type BottomSheetModalProps = Omit<Partial<RNBottomSheetModalProps>, 'children'> & {
  children:
    | React.ReactNode
    | (({
        visible,
      }?: {
        visible: boolean
      }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>)
    | React.ReactNode[]
}

export type BottomSheetModalAction = {
  close: () => void
  open: () => void
}

export const BottomSheetModal = forwardRef<BottomSheetModalAction, BottomSheetModalProps>(
  ({ children, ...props }, ref) => {
    const { bottom } = useSafeAreaInsets()
    const bottomSheetRef = useRef<RNBottomSheetModal>(null)
    const animationConfigs = useBottomSheetTimingConfigs({ duration: 400 })
    const snapPoints = useMemo(() => ['45%', '90%'], [])

    const [index, setIndex] = useState<number>(-1) // -1, 0, 1 (-1 is invisible, otherwise visible)

    const close = useCallback(() => {
      bottomSheetRef.current?.close()
    }, [])

    const open = useCallback(() => {
      bottomSheetRef.current?.present()
    }, [])

    useImperativeHandle(ref, () => ({ close, open }), [ref])

    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          if (index > -1) {
            close()
            return true
          } else {
            return false
          }
        }
        BackHandler.addEventListener('hardwareBackPress', onBackPress)
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }, [bottomSheetRef, index])
    )

    const renderBackdrop = useCallback(
      ({ animatedIndex, style, ...props }: BottomSheetBackdropProps) => {
        return (
          <BottomSheetBackdrop
            {...props}
            style={style}
            onPress={close}
            disappearsOnIndex={-1}
            pressBehavior="collapse"
            animatedIndex={animatedIndex}
          />
        )
      },
      []
    )

    return (
      <RNBottomSheetModal
        index={0}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDismissOnClose
        keyboardBehavior="extend"
        handleComponent={() => (
          <View style={[styles.indicatorWrapper]}>
            <View style={styles.indicator} />
          </View>
        )}
        keyboardBlurBehavior="restore"
        animationConfigs={animationConfigs}
        backdropComponent={renderBackdrop}
        onChange={(index) => setIndex(index)}
        backgroundComponent={({ style }) => (
          <View style={[{ borderRadius: 10, backgroundColor: Colors.white }, style]} />
        )}
        footerComponent={() => <View style={{ height: bottom }} />}
        {...props}
      >
        {typeof children === 'function' ? children?.({ visible: index === 1 }) : children}
      </RNBottomSheetModal>
    )
  }
)
