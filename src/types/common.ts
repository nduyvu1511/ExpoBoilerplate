import { ReactNode } from 'react'
import { TextStyle, ViewStyle } from 'react-native'

export interface IdAndName<T extends number | string = number> {
  id: T
  name: string
}

export interface Option<T extends string | number> {
  value: T
  label: string
}

export type IdNameAndDesc<T extends number | string = number> = IdAndName<T> & {
  desc?: string
}

export interface NameAndValue<T extends string = string> {
  name: string
  value: T
}

export type ForwardModalRef = {
  close: () => void
  open: () => void
}

export interface LngLat {
  longitude: number
  latitude: number
}

export type IconProps = {
  fill?: string
  size?: number
}

export type DateRange<T extends Date | string = string> = {
  fromDate: T
  toDate: T
}

export type BaseInputProps = {
  inputLabel?: string
  inputLabelStyle?: ViewStyle | ViewStyle[] | TextStyle | TextStyle[]
  containerStyle?: ViewStyle | ViewStyle[]
  inputErrorTextStyle?: ViewStyle | ViewStyle[] | TextStyle | TextStyle[]
  required?: boolean
  errorMsg?: string
  error?: boolean
}

export type ToastOption = {
  message: string
  duration?: number
  description?: string
  position: 'top' | 'bottom' | 'center'
  type?: 'danger' | 'warning' | 'default' | 'success' | 'info'
  onPress?: () => void
  onLongPress?: () => void
}

export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>

export type RequiredExceptFor<T, TOptional extends keyof T> = Required<Omit<T, TOptional>> &
  Partial<Pick<T, TOptional>>

export type RequiredFields<T, TRequired extends keyof T> = Omit<T, TRequired> &
  Required<Pick<T, TRequired>>

export type OptionalFields<T, TOptional extends keyof T> = Omit<T, TOptional> &
  Partial<Pick<T, TOptional>>

export type ChildrenProps = {
  children: ReactNode
}
