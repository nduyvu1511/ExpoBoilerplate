import { DEFAULT_LIMIT } from '@/constants'
import { HTTPError, OptionalExceptFor, QueryListParamsNoPage, RequiredFields } from '@/types'
import { isBoolean, isNumber, removeEmptyValueFromObject } from '@/utils'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Key } from 'swr'
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'

type MutateFetcherResponseParams<Fetcher, Data, Params extends QueryListParamsNoPage = any> = {
  response: Fetcher
  params: Params
  data: Data[]
}

type MutateFetcherResponseFunc<FetcherResponse, Data, Params extends QueryListParamsNoPage = any> = (
  params: MutateFetcherResponseParams<FetcherResponse, Data, Params>
) =>
  | Promise<OptionalExceptFor<MutateFetcherResponse<Data>, 'data'>>
  | OptionalExceptFor<MutateFetcherResponse<Data>, 'data'>

type MutateFetcherResponse<Data> = {
  data: Data[]
  total?: number
  hasMore: boolean
  nextCursor?: string
}

type MutateFetcherParams<Params, Data> = {
  params: Params & Paginate
  data: Data[]
}

type MutateFetcherParamsFunc<Params, Data> = (params: MutateFetcherParams<Params, Data>) => Params

type Fetcher<Params, Fetcher> = (params: Params) => Promise<Fetcher>
type FetcherOptionalParams<Params, Fetcher> = (params?: Params) => Promise<Fetcher>

type Paginate = {
  page: number
  nextCursor?: string
}

type GetKey<Params> = [Key, Paginate, Params]

type UseQueryInfiniteList<
  Data = any,
  FetcherResponse = any,
  Params extends QueryListParamsNoPage = any,
  AdditionalParams = any
> = {
  key: Key
  enabled?: boolean
  initialParams?: Params
  paginateBy?: 'page' | 'cursor'
  initialAdditionalParams?: AdditionalParams
  config?: Partial<SWRInfiniteConfiguration<any, any, () => any>>
  mutateFetcherParams: MutateFetcherParamsFunc<Params, Data>
  mutateFetcherResponse: MutateFetcherResponseFunc<FetcherResponse, Data, Params>
  fetcher: Fetcher<Params, FetcherResponse> | FetcherOptionalParams<Params, FetcherResponse>
}

export const useQueryInfiniteV2 = <
  Data = any,
  Fetcher = any,
  Params extends QueryListParamsNoPage = any,
  AdditionalParams = any
>({
  key,
  config,
  enabled, // is conditional fetching
  paginateBy = 'page',
  initialParams = {} as Params,
  initialAdditionalParams,
  fetcher,
  mutateFetcherParams,
  mutateFetcherResponse, // If the response data is different from the defined data type, use this to modify the response correctly
}: UseQueryInfiniteList<Data, Fetcher, Params, AdditionalParams>) => {
  const dataRef = useRef<Data[]>([])

  const getInitialParams = useCallback(
    (): RequiredFields<Params, 'limit'> => ({
      ...initialParams,
      limit: initialParams?.limit || DEFAULT_LIMIT,
    }),
    []
  )

  const [additionalParams, setAdditionalParams] = useState<AdditionalParams | undefined>(initialAdditionalParams)
  const [params, setParams] = useState<RequiredFields<Params, 'limit'>>(getInitialParams)

  const [reValidateAll, setReValidateAll] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const getKey = useCallback(
    (page: number, previousData: MutateFetcherResponse<Data>): GetKey<RequiredFields<Params, 'limit'>> | null => {
      if (enabled === false) return null

      if (previousData && !previousData?.data?.length) return null

      return [key, { page: page + 1, nextCursor: previousData?.nextCursor }, params]
    },
    [params, key]
  )

  const fetcherHandler = useCallback(
    async ([, pagination, parameters]: GetKey<RequiredFields<Params, 'limit'>>): Promise<
      MutateFetcherResponse<Data>
    > => {
      setReValidateAll(false)

      try {
        const fetcherParams = mutateFetcherParams({
          data: dataRef.current,
          params: {
            ...parameters,
            page: pagination.page,
            nextCursor: pagination?.nextCursor,
          } as Params & Paginate,
        })

        const response = await fetcher(fetcherParams)

        const { data, total, hasMore, nextCursor } = await mutateFetcherResponse({
          response,
          data: dataRef.current,
          params: fetcherParams,
        })

        return {
          data: data ?? [],
          total,
          nextCursor,
          hasMore: isBoolean(hasMore)
            ? hasMore
            : isNumber(total)
            ? dataRef.current.length + data.length < total
            : data.length >= (params?.limit as number),
        }
      } catch (error) {
        console.log('fetcher handler error: ', error)

        if (pagination.page > 1) {
          return { data: [], hasMore: false }
        }

        throw new Error('Không thể tải dữ liệu, vui lòng thử lại sau')
      }
    },
    []
  )

  const {
    data = [],
    error,
    size,
    setSize,
    isLoading,
    isValidating,
    mutate,
  } = useSWRInfinite<MutateFetcherResponse<Data>, HTTPError>(getKey, fetcherHandler, {
    parallel: paginateBy === 'page',
    revalidateAll: reValidateAll,
    revalidateFirstPage: false,
    ...config,
  })

  const flattenData = useMemo(() => {
    const result = data?.map?.((item) => item.data)?.flat?.() || []
    dataRef.current = result
    return result
  }, [data])

  const hasMore = data?.[data.length - 1]?.hasMore || false

  const getMore = async () => {
    if (!hasMore || isValidating || !data?.length) return

    setSize(size + 1)
  }

  const filter = useCallback(
    async (_params: Partial<Params>, additionalParams?: AdditionalParams) => {
      const nextParams = removeEmptyValueFromObject<Params>({
        ...params,
        ..._params,
      } as Params)
      setParams(nextParams as RequiredFields<Params, 'limit'>)

      if (additionalParams) {
        setAdditionalParams(additionalParams)
      }
    },
    [params]
  )

  const refresh = useCallback(async () => {
    setParams(getInitialParams)
    setAdditionalParams(initialAdditionalParams)

    setIsRefreshing(true)
    await mutate()
    setIsRefreshing(false)
  }, [])

  return {
    refresh,
    getMore,
    filter,
    mutate,
    setReValidateAll,
    error,
    data: flattenData,
    params,
    hasMore,
    isLoading,
    isValidating,
    isRefreshing,
    additionalParams,
    pagination: { limit: params.limit, page: size },
  }
}

/*
  Usage: 
    cursor: 
      const { data, isLoading, hasMore, getMore } = useQueryInfiniteV2({
        paginateBy: 'cursor',
        key: 'facebook-images',
        initialParams: {
          page_id,
          channel_id,
          album_id: '534364758692556',
          limit: 30,
        },
        fetcher: inboxAPI.getFacebookImages,
        mutateFetcherParams: ({ params }) => ({ ...params, after: params?.nextCursor || '' }),
        mutateFetcherResponse: ({ response }) => {
          const { after, photos, hasNext } = response?.data || {}
          return { data: photos, hasMore: hasNext, nextCursor: after }
        },
      })

    page: 
      const { data, isLoading, hasMore, isRefreshing, refresh, getMore, filter, params } = useQueryInfiniteV2({
        key: 'tags',
        initialParams: { page_id, channel_id, limit: 30 },
        fetcher: inboxAPI.getChannelTags,
        mutateFetcherParams: ({ params }) => params,
        mutateFetcherResponse: ({ response }) => {
          const { data, totalCount } = response?.data || {}
          return { data, total: totalCount }
        },
      })
*/
