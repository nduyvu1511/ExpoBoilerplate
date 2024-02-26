import { Colors } from '@/theme'
import { IdAndName } from '@/types'
import { convertViToEn } from '@/utils'
import { Draft, produce } from 'immer'
import React, { Ref, forwardRef, useEffect, useState } from 'react'
import { FlatList, FlatListProps, StyleProp, View, ViewStyle } from 'react-native'
import { Empty, EmptyProps } from '../empty'
import { SearchInput, SearchInputProps } from '../searchInput'
import { Spin } from '../spin'
import { ListItem, ListItemProps } from './listItem'

type ItemValue = IdAndName &
  Pick<ListItemProps<any>, 'rightIcon' | 'onRightIconPress' | 'leftIcon'> & { onPress?: () => void }

type GetItem<T> = (data: T) => ItemValue

type GetItemRequired<T> = {
  getItem: GetItem<T>
}

type GetItemOptional<T> = {
  getItem?: GetItem<T>
}

type Value = number

export type SelectItemProps<IsMulti extends boolean, Data = any> = Omit<
  Partial<FlatListProps<Data>>,
  'data'
> & {
  data: readonly Data[] | Data[]
  isMulti?: IsMulti
  idExcludes?: Value[]
  value?: IsMulti extends true ? Value[] : Value
  onClose?: () => void
  onChange?: (data: IsMulti extends true ? Value[] : Value) => void

  viewStyle?: StyleProp<ViewStyle>
  emptyProps?: EmptyProps
  emptyTitle?: string
  loading?: boolean
  itemStyle?: StyleProp<ViewStyle>
  showSearchInput?: boolean
  searchInputProps?: SearchInputProps
} & (Data extends IdAndName ? GetItemOptional<Data> : GetItemRequired<Data>)

const _SelectItem = <IsMulti extends boolean = false, Data = any>(
  {
    onClose,
    onChange,
    renderItem,
    getItem, // required if type of data doesn't extends IdAndName
    data,
    value: externalValue,
    isMulti,
    loading,
    viewStyle,
    itemStyle,
    idExcludes,
    emptyTitle = 'Không có dữ liệu',
    showSearchInput = true,
    emptyProps,
    searchInputProps,
    ListEmptyComponent,
    ...props
  }: SelectItemProps<IsMulti, Data>,
  ref?: Ref<FlatList>
) => {
  const [result, setResult] = useState<readonly ItemValue[] | ItemValue[]>([])
  const [value, setValue] = useState<Value[]>((externalValue || []) as Value[])

  useEffect(() => {
    setResult(getData(data))
  }, [data])

  useEffect(() => {
    if ((externalValue as Value[])?.length) {
      setValue(externalValue as Value[])
    }
  }, [externalValue])

  const getData = (data: Data[] | readonly Data[]): ItemValue[] => {
    if (getItem) {
      return [...data].map((item) => getItem(item))
    } else {
      return [...data] as ItemValue[]
    }
  }

  const getResult = (
    data: ItemValue[] | readonly ItemValue[],
    idExcludes: Value[] | undefined
  ): ItemValue[] | readonly ItemValue[] => {
    if (!idExcludes?.length) {
      return [...data]
    }
    return [...data].filter((item) => !idExcludes.includes(item.id))
  }

  const handleSearch = (keyword: string) => {
    // const newData = data.map(item => getItem? getItem(item))
    if (keyword === '') {
      setResult(getData(data))
    } else {
      setResult(
        getData(data).filter((item) => convertViToEn(item.name).includes(convertViToEn(keyword)))
      )
    }
  }

  return (
    <View style={[{ flex: 1 }, viewStyle]}>
      {showSearchInput ? (
        <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
          <SearchInput
            convertViToEn
            showDebounce={false}
            onChangeText={handleSearch}
            {...searchInputProps}
          />
        </View>
      ) : null}

      <FlatList<Data>
        ref={ref}
        refreshing={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        onEndReachedThreshold={0.4}
        style={{ flex: 1 }}
        data={(!loading ? getResult(result, idExcludes) : []) as Data[]}
        ListEmptyComponent={loading ? <Spin /> : <Empty title={emptyTitle} {...emptyProps} />}
        renderItem={({ item: rawItem, index, separators }) => {
          const item = getItem ? getItem(rawItem) : (rawItem as ItemValue)
          item
          const active = isMulti
            ? !!(value?.length && value?.includes?.(item.id))
            : externalValue === item.id

          if (renderItem) {
            return renderItem({ item: rawItem, index, separators })
          }

          const handleChange = () => {
            if (isMulti) {
              setValue((prev) => {
                const ids = produce(prev, (draft) => {
                  const index = draft.findIndex((id) => id === item.id)
                  if (index !== -1) {
                    draft.splice(index, 1)
                  } else {
                    draft.push(item.id as Draft<Value>)
                  }
                })
                const values: Value[] = []
                getData(data).forEach((item) => {
                  if (ids.includes(item.id)) {
                    values.push(item.id)
                  }
                })
                onChange?.(values as IsMulti extends true ? Value[] : Value)
                return ids
              })
            } else {
              !active && onChange?.(item.id as IsMulti extends true ? Value[] : Value)
              onClose?.()
            }
          }

          return (
            <ListItem
              leftIcon={item?.leftIcon}
              rightIcon={item?.rightIcon}
              containerStyle={[{ paddingHorizontal: 16 }]}
              style={[
                { paddingHorizontal: 0, borderBottomColor: Colors.gray20, borderBottomWidth: 0.7 },
                itemStyle,
              ]}
              onRightIconPress={item.onRightIconPress}
              title={item.name}
              active={active}
              onPress={handleChange}
            />
          )
        }}
        {...props}
      />
    </View>
  )
}

export const SelectItem = forwardRef(_SelectItem) as <IsMulti extends boolean = false, Data = any>(
  props: SelectItemProps<IsMulti, Data> & { ref?: Ref<FlatList> }
) => ReturnType<typeof _SelectItem>
