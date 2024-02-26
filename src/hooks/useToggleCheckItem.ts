// import { AsyncHandler } from '@/types'
// import { Draft, produce } from 'immer'
// import { useState } from 'react'
// import { PopUpState, useCommonSlice } from '../store'
// import { useAsync } from './useAsync'

// export type RequestAPIWithSelectedItems<Params = any> = {
//   fetcher: (params: Params) => Promise<any>
//   params: Params
//   popupParams?: Partial<PopUpState>
// } & Pick<AsyncHandler, 'config' | 'onSuccess'>

// export type UseToggleCheckItemProps<T = any> = {
//   getId: (data: T) => number
// }

// export const useToggleCheckItem = <T = any>({ getId }: UseToggleCheckItemProps<T>) => {
//   const setPopUpVisible = useCommonSlice((state) => state.setPopUpVisible)
//   const { asyncHandler, isLoading } = useAsync()
//   const [selectedItems, setSelectedItems] = useState<T[]>([])
//   const [selectedIds, setSelectedIds] = useState<number[]>([])

//   const syncSelectedIds = (data: T[]) => {
//     setSelectedIds([...data].map((item) => getId(item)))
//   }

//   const toggleSelectItem = (item: T) => {
//     setSelectedItems((selectedItems) => {
//       const data = produce(selectedItems, (draft) => {
//         const index = draft.findIndex((_item) => getId(_item as T) === getId(item))
//         if (index !== -1) {
//           draft.splice(index, 1)
//         } else {
//           draft.push(item as Draft<T>)
//         }
//       })
//       syncSelectedIds(data)
//       return data
//     })
//   }

//   const reset = () => {
//     setSelectedIds([])
//     setSelectedItems([])
//   }

//   const toggleAllItems = (data: T[]) => {
//     if (data?.length) {
//       if (data.length === selectedItems.length) {
//         reset()
//       } else {
//         setSelectedItems(data)
//         syncSelectedIds(data)
//       }
//     }
//   }

//   const deleteItemSelectedItem = (id: number) => {
//     setSelectedItems((selectedItems) => {
//       const data = produce(selectedItems, (draft) => {
//         const index = draft.findIndex((item) => getId(item as T) === id)
//         if (index !== -1) {
//           draft.splice(index, 1)
//         }
//       })
//       syncSelectedIds(data)
//       return data
//     })
//   }

//   const requestAPI = <Params = any, Response = T>({
//     params,
//     config,
//     fetcher,
//     onSuccess,
//   }: RequestAPIWithSelectedItems<Params>) => {
//     asyncHandler<Response>({
//       fetcher: fetcher(params),
//       config,
//       onSuccess: (res) => {
//         reset()
//         onSuccess?.(res)
//       },
//       // onError: reset,
//     })
//   }

//   const requestAPIWithSelectedItems = <Params = any, Response = T>({
//     popupParams,
//     ...params
//   }: RequestAPIWithSelectedItems<Params>) => {
//     if (!selectedItems?.length) return

//     if (popupParams) {
//       setPopUpVisible({
//         ...popupParams,
//         onLeftBtnPress: setPopUpVisible,
//         onDismiss: setPopUpVisible,
//         onRightBtnPress: () => requestAPI(params),
//       })
//     } else {
//       requestAPI(params)
//     }
//   }

//   return {
//     isLoading,
//     selectedItems,
//     selectedIds,
//     reset,
//     toggleAllItems,
//     toggleSelectItem,
//     deleteItemSelectedItem,
//     requestAPIWithSelectedItems,
//   }
// }

export {}
