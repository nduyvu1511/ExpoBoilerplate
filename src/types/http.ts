import { Key, KeyedMutator } from 'swr'
import { SWRInfiniteConfiguration, SWRInfiniteResponse } from 'swr/infinite'

export type QueryListParams = {
  limit?: number
  page?: number
}

export type QueryListParamsNoPage = Omit<QueryListParams, 'page'>

export type Pagination = Required<QueryListParams> & {
  total: number
}

export enum HTTPMethodEnum {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export type HTTPMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

export enum ApiUrlEnum {
  social_api = 'social_api',
  com_api = 'com_api',
  loy_api = 'loy_api',
  social_avatar_api = 'social_avatar_api',
  funnel_api = 'funnel_api',
  fulfillment_api = 'fulfillment_api',
  file_api = 'file_api',
  hac_api = 'hac_api',
}

export type HTTPError = Error

export type HTTPResponse<Response> = any

export type ListResponse<T> = {
  data: T[]
  totalCount: number
}

export type HTTPListResponse<Response> = ListResponse<HTTPResponse<Response[]>>

export type HTTPListResponsePromise<Response> = Promise<HTTPResponse<ListResponse<Response>>>

export type HTTPResponsePromise<Response> = Promise<HTTPResponse<Response>>

export type Fetcher<Params, Data> = (params: Params) => HTTPListResponsePromise<Data>

export type FetcherPartialParams<Params, Data> = (
  params: Partial<Params>
) => HTTPListResponsePromise<Data>

export type AsyncHandlerFetcher<Params, Response> = (
  params: Params
) => HTTPResponsePromise<Response>

export type AsyncHandlerOptions = {
  method?: HTTPMethod
  errorMsg?: string
  successMsg?: string
  showBackdrop?: boolean
  showErrorMsg?: boolean
  requiredToken?: boolean
  showSuccessMsg?: boolean
  shouldNavigateToLoginIfNoTokenFound?: boolean
  // messageOptions?: Partial<MessageOptions>
  // popupParams?: Pick<PopupState, 'desc' | 'cancelBtnTitle' | 'confirmBtnTitle' | 'title'>
}

export interface AsyncHandlerParams<Params = any, Response = any, Error = any> {
  params: Params
  options?: AsyncHandlerOptions
  fetcher: AsyncHandlerFetcher<Params, Response>
  onSuccess?: (params: Response) => Promise<void> | void
  onMissingToken?: () => void
  onError?: (data: Error) => Promise<void> | void
}

export type UseQueryInfiniteList<
  Data = any,
  Params extends QueryListParamsNoPage = any,
  AdditionalParams = any
> = {
  key: Key
  initialParams?: Params
  initialAdditionalParams?: AdditionalParams
  config?: Partial<SWRInfiniteConfiguration<any, any, () => any>>
  fetcher: Fetcher<Params, Data> | FetcherPartialParams<Params, Data>
  mutateFetcherResponse?: (params: HTTPResponse<ListResponse<Data>>) => ListResponse<Data>
}

export type UseQueryInfiniteListRes<
  Data,
  Params extends QueryListParamsNoPage = any,
  AdditionalParams = any
> = Omit<SWRInfiniteResponse<Data, HTTPError>, 'size' | 'setSize' | 'mutate' | 'data'> & {
  data: Data[]
  params: Params
  isEmpty: boolean
  isRefreshing: boolean
  isReachingEnd: boolean
  isLoadingMore: boolean
  pagination: Pagination
  additionalParams: AdditionalParams
  mutate: KeyedMutator<Data[][]>
  getMore: () => void
  refresh: () => void
  filter: (_params: Partial<Params>, additionalParams?: AdditionalParams) => void
}

export type InfiniteListQueryFilterProps<
  Data = any,
  Params extends QueryListParamsNoPage = any,
  AdditionalParams = any
> = Pick<
  UseQueryInfiniteListRes<Data, Params, AdditionalParams>,
  'filter' | 'params' | 'isValidating' | 'isLoading' | 'pagination' | 'data' | 'additionalParams'
> & {
  initialParams?: Params
}

export type InfiniteListQueryFooterProps<
  Data = any,
  Params extends QueryListParamsNoPage = any,
  AdditionalParams = any
> = InfiniteListQueryFilterProps<Data, Params, AdditionalParams>
