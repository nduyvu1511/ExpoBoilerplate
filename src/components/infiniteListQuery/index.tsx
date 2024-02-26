import { Empty, EmptyProps, Spin } from '@/components'
import { useQueryInfiniteList } from '@/hooks'
import { Colors, Typography } from '@/theme'
import { InfiniteListQueryFilterProps, QueryListParamsNoPage, UseQueryInfiniteList } from '@/types'
import { FlashList, FlashListProps } from '@shopify/flash-list'
import React, { ReactNode, forwardRef, useImperativeHandle } from 'react'
import { Pressable, ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native'

type PartialElement = JSX.Element | null | undefined

export type InfiniteListQueryForwardRef<
  Data = any,
  Params extends QueryListParamsNoPage = any,
  AdditionalParams = any
> = {
  getData: () => Data[]
  getParams: () => Params
  getAdditionalParams: () => AdditionalParams
}

export type InfiniteListQueryProps<
  Data = any,
  Params extends QueryListParamsNoPage = any,
  AdditionalParams = any
> = Omit<UseQueryInfiniteList<Data, Params, AdditionalParams>, 'key'> & {
  swrKey: UseQueryInfiniteList['key']
} & Partial<FlashListProps<Data>> &
  Required<Pick<FlashListProps<Data>, 'renderItem'>> & {
    renderEmptyComponent?: (params: Params) => PartialElement
    renderHeaderComponent?: (
      params: InfiniteListQueryFilterProps<Data, Params, AdditionalParams>
    ) => PartialElement
    renderStickyFooterComponent?: (
      params: InfiniteListQueryFilterProps<Data, Params, AdditionalParams>
    ) => ReactNode
    renderStickyHeaderComponent?: (
      params: InfiniteListQueryFilterProps<Data, Params, AdditionalParams>
    ) => ReactNode
    emptyComponentProps?: EmptyProps
    containerStyle?: StyleProp<ViewStyle>
    LoadingComponent?: PartialElement
    LoadingItemComponent?: PartialElement
  }

const InfiniteListQueryInner = <
  Data = any,
  Params extends QueryListParamsNoPage = any,
  AddditionalParams = any
>(
  {
    swrKey,
    fetcher,
    config,
    initialParams,
    initialAdditionalParams,
    mutateFetcherResponse,

    style,
    containerStyle,
    LoadingComponent,
    LoadingItemComponent,
    ListFooterComponent,
    emptyComponentProps,
    contentContainerStyle,
    renderStickyHeaderComponent,
    renderStickyFooterComponent,
    renderHeaderComponent,
    renderEmptyComponent,
    onRefresh,
    renderItem,
    ...props
  }: InfiniteListQueryProps<Data, Params, AddditionalParams>,
  ref?: React.ForwardedRef<InfiniteListQueryForwardRef<Data, Params, AddditionalParams>>
) => {
  const {
    data,
    error,
    params,
    isLoading,
    isValidating,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    pagination,
    additionalParams,
    filter,
    getMore,
    refresh,
  } = useQueryInfiniteList<Data, Params, AddditionalParams>({
    key: swrKey,
    fetcher,
    initialParams,
    mutateFetcherResponse,
    initialAdditionalParams,
    config,
  })

  useImperativeHandle(
    ref,
    () => ({
      getAdditionalParams: () => additionalParams,
      getData: () => data,
      getParams: () => params,
    }),
    [ref, data, params, additionalParams]
  )

  const getQuerylistFilterProps = (): InfiniteListQueryFilterProps<
    Data,
    Params,
    AddditionalParams
  > => ({
    data,
    params,
    isLoading,
    pagination,
    isValidating,
    initialParams,
    additionalParams,
    filter: (params, additionalParams) => filter(params, additionalParams),
  })

  return (
    <View
      style={[
        [
          { flex: 1 },
          !isLoading && !data?.length && { backgroundColor: Colors.white },
          containerStyle,
        ],
      ]}
    >
      {renderStickyHeaderComponent ? renderStickyHeaderComponent(getQuerylistFilterProps()) : null}

      {error ? (
        <Empty title={error?.message || 'Có lỗi xảy ra, vui lòng thử lại'}>
          <Pressable onPress={refresh}>
            <Text style={[Typography.body14Medium, { color: Colors.active }]}>Tải lại trang</Text>
          </Pressable>
        </Empty>
      ) : isLoading ? (
        LoadingComponent ||
        (LoadingItemComponent ? (
          <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
            {Array.from({ length: pagination.limit }).map((_, index) => (
              <View key={index}>{LoadingItemComponent}</View>
            ))}
          </ScrollView>
        ) : (
          <Spin size={28} style={{ flex: 1, paddingVertical: 32, backgroundColor: Colors.white }} />
        ))
      ) : (
        <FlashList
          data={data}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.4}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          renderItem={renderItem}
          refreshing={isRefreshing}
          onRefresh={
            !isLoading
              ? () => {
                  refresh(), onRefresh?.()
                }
              : undefined
          }
          ListHeaderComponent={
            renderHeaderComponent ? renderHeaderComponent(getQuerylistFilterProps()) : null
          }
          onEndReached={() => !isLoadingMore && !isReachingEnd && getMore()}
          ListEmptyComponent={
            renderEmptyComponent ? (
              renderEmptyComponent(params)
            ) : (
              <Empty
                style={{ flex: 1, backgroundColor: Colors.white, paddingVertical: 32 }}
                title="Không có dữ liệu nào"
                {...emptyComponentProps}
              />
            )
          }
          ListFooterComponent={
            <>
              {ListFooterComponent || <View style={{ height: 24 }} />}
              {isLoadingMore ? <Spin style={{ paddingVertical: 12 }} /> : null}
            </>
          }
          {...props}
        />
      )}

      {renderStickyFooterComponent ? renderStickyFooterComponent(getQuerylistFilterProps()) : null}
    </View>
  )
}

export const InfiniteListQuery = forwardRef(InfiniteListQueryInner) as <
  Data = any,
  Params extends QueryListParamsNoPage = any,
  AdditionalParams = any
>(
  props: InfiniteListQueryProps<Data, Params, AdditionalParams> & {
    ref?: React.ForwardedRef<InfiniteListQueryForwardRef<Data, Params, AdditionalParams>>
  }
) => ReturnType<typeof InfiniteListQueryInner>
