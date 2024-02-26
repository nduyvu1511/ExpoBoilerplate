import { CloseIcon, SearchIcon } from '@/assets'
import { Colors } from '@/theme'
import { convertViToEn } from '@/utils'
import debounce from 'lodash/debounce'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { Pressable, StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native'
import { styles } from './style'

export interface SearchInputForwardRef {
  reset: () => void
}

export interface SearchInputProps extends Omit<TextInputProps, 'onChangeText'> {
  showDebounce?: boolean
  convertViToEn?: boolean // đầu ra của onChange sẽ là tiếng việt không dấu
  timer?: number // available if showDebounce = true
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  leftIconStyle?: StyleProp<ViewStyle>
  onChangeText?: (val: string) => void
}

export const SearchInput = forwardRef<SearchInputForwardRef, SearchInputProps>(
  (
    {
      showDebounce = true,
      timer = 300,
      style = {},
      inputStyle,
      convertViToEn: _convertViToEn,
      leftIconStyle,
      defaultValue,
      onChangeText: externalOnChange,
      value: externalValue,
      ...attributes
    },
    ref = null
  ) => {
    const [value, setValue] = useState<string>('')
    const [isFocused, setIsFocused] = useState<boolean>(false)

    useImperativeHandle(
      ref,
      () => ({
        reset: () => setValue(''),
      }),
      [ref]
    )

    useEffect(() => {
      if (externalValue !== undefined) {
        setValue(externalValue)
      }
    }, [externalValue])

    const debounceFn = useCallback(debounce(externalOnChange as (val: string) => void, timer), [externalOnChange])

    const handleChange = (value: string) => {
      setValue(value)
      const formattedValue = value ? (_convertViToEn ? convertViToEn(value) : value) : ''
      if (showDebounce) {
        debounceFn(formattedValue)
      } else {
        externalOnChange?.(formattedValue)
      }
    }

    return (
      <View style={[styles.inputContainer, isFocused && styles.inputContainerActive, style]}>
        <View style={[styles.leftIcon, { marginRight: 8 }, leftIconStyle]}>
          <SearchIcon fill={Colors.gray50} size={20} />
        </View>

        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.inputText, inputStyle]}
          placeholderTextColor={Colors.gray50}
          placeholder={attributes?.placeholder || 'Tìm kiếm sản phẩm...'}
          onChangeText={handleChange}
          value={value}
          {...attributes}
        />

        {value ? (
          <View style={styles.rightIcon}>
            <Pressable style={{ padding: 6 }} onPress={() => handleChange('')}>
              <CloseIcon fill={Colors.gray80} size={20} />
            </Pressable>
          </View>
        ) : null}
      </View>
    )
  }
)
