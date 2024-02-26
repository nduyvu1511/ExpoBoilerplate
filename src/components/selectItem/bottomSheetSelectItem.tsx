import React, { useRef } from 'react'
import { useWindowDimensions } from 'react-native'
import { BottomSheetModal, BottomSheetModalProps } from '../bottomSheetModal'
import { SelectItem, SelectItemProps, SelectItemValue } from './'

export type BottomSheetSelectItemProps<IsMulti extends boolean, Value extends string | number> = Pick<
  BottomSheetModalProps,
  'onDismiss' | 'isVisible' | 'title'
> &
  SelectItemProps<IsMulti, Value> & {
    onChangeAfterModalHide?: (data: IsMulti extends true ? SelectItemValue<Value>[] : SelectItemValue<Value>) => void
  }

export const BottomSheetSelectItem = <IsMulti extends boolean = false, Value extends string | number = number>({
  onChangeAfterModalHide,
  isMulti,
  onChange,
  onDismiss,
  isVisible,
  title,
  ...props
}: BottomSheetSelectItemProps<IsMulti, Value>) => {
  const { height } = useWindowDimensions()
  type Data = IsMulti extends true ? SelectItemValue<Value>[] : SelectItemValue<Value>
  const onSelectRef = useRef<Data | undefined>()

  return (
    <BottomSheetModal
      title={title}
      isVisible={isVisible}
      onDismiss={onDismiss}
      onModalHide={
        onChangeAfterModalHide
          ? () => {
              if (onSelectRef.current) {
                onChangeAfterModalHide?.(onSelectRef.current)
                onSelectRef.current = undefined
              }
            }
          : undefined
      }
    >
      <SelectItem
        isMulti={isMulti}
        showSearchInput={false}
        onChange={(item) => {
          onChange?.(item)
          onDismiss()
          if (onChangeAfterModalHide) {
            onSelectRef.current = item
          }
        }}
        onClose={onDismiss}
        style={{ flex: undefined }}
        viewStyle={{
          flex: undefined,
          paddingTop: title ? 0 : 12,
          // maxHeight: height - (top + TABBAR_MODAL_HEIGHT + 12 + (hasNotch() ? 24 : 0)),
          maxHeight: height - 150,
        }}
        {...props}
      />
    </BottomSheetModal>
  )
}
