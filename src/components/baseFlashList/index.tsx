import { Empty, EmptyProps, Spin } from '@/components'
import { DEFAULT_LIMIT } from '@/constants'
import { UseQueryInfiniteListRes } from '@/types'
import { Colors, Typography } from '@/theme'
import { FlashList, FlashListProps } from '@shopify/flash-list'
import React, { forwardRef } from 'react'
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type PartialElement = JSX.Element | null | undefined

export type InfiniteListNoQueryQueryProps<Data> = FlashListProps<Data> &
  Required<Pick<FlashListProps<Data>, 'renderItem' | 'estimatedItemSize'>> & {
    emptyComponentProps?: EmptyProps
    LoadingComponent?: PartialElement
    LoadingItemComponent?: PartialElement
  } & Pick<UseQueryInfiniteListRes<Data>, 'getMore' | 'isLoading' | 'isLoadingMore'> &
  Partial<Pick<UseQueryInfiniteListRes<Data>, 'error'>> & {
    limit?: number
  }

const InfiniteListNoQueryChild = <Data = any,>(
  {
    getMore,
    error,
    isLoading,
    isLoadingMore,
    limit = DEFAULT_LIMIT,

    LoadingComponent,
    LoadingItemComponent,
    ListFooterComponent,
    emptyComponentProps,
    data,
    onRefresh,
    refreshControl,
    refreshing,
    renderItem,
    ...props
  }: InfiniteListNoQueryQueryProps<Data>,
  ref?: React.MutableRefObject<FlashList<Data>>
) => {
  const { bottom } = useSafeAreaInsets()

  return isLoading || refreshing ? (
    LoadingComponent ||
      (LoadingItemComponent ? (
        <ScrollView scrollEnabled={false} style={{ flex: 1, backgroundColor: Colors.white }}>
          {Array.from({ length: limit }).map((_, index) => (
            <View key={index}>{LoadingItemComponent}</View>
          ))}
        </ScrollView>
      ) : (
        <Spin size={28} style={{ paddingVertical: 24, backgroundColor: Colors.white, flex: 1 }} />
      ))
  ) : !data?.length ? (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: Colors.white }}
      refreshControl={
        refreshControl || <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      {error ? (
        <Empty title={error?.message || 'Có lỗi xảy ra, vui lòng thử lại'}>
          <TouchableOpacity activeOpacity={0.7} onPress={onRefresh}>
            <Text style={[Typography.body14Medium, { color: Colors.active }]}>Tải lại trang</Text>
          </TouchableOpacity>
        </Empty>
      ) : (
        <Empty
          style={{ flex: 1, backgroundColor: Colors.white, paddingVertical: 24 }}
          title="Không có dữ liệu nào"
          {...emptyComponentProps}
        />
      )}
    </ScrollView>
  ) : (
    <FlashList
      ref={ref}
      data={data}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.4}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      renderItem={renderItem}
      onEndReached={getMore}
      ListFooterComponent={
        <>
          {isLoadingMore ? <Spin style={{ paddingVertical: 12 }} /> : null}
          {ListFooterComponent || <View style={{ height: bottom / 2 }} />}
        </>
      }
      onRefresh={onRefresh}
      refreshing={refreshing}
      refreshControl={refreshControl}
      {...props}
    />
  )
}

export const InfiniteListNoQuery = forwardRef(InfiniteListNoQueryChild) as <Data = any>(
  props: InfiniteListNoQueryQueryProps<Data> & {
    ref?: React.MutableRefObject<FlashList<Data>>
  }
) => ReturnType<typeof InfiniteListNoQueryChild>
