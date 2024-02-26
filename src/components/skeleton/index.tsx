import { Colors } from '@/theme'
import { Skeleton as MotiSkeleton } from 'moti/skeleton'
import React from 'react'

export type SkeletonProps = {
  radius?: number
  height?: number | string
  width?: number | string
  children?: JSX.Element | null
  show?: boolean
  duration?: number // ms unit
}

export const Skeleton = ({ duration = 2000, ...props }: SkeletonProps) => {
  return (
    <MotiSkeleton
      colorMode={'light'}
      backgroundColor={Colors.gray30}
      width={'100%'}
      height={24}
      radius={8}
      transition={{ translateX: { duration } }}
      {...props}
    />
  )
}

export type CircleSkeletonProps = SkeletonProps & {
  size?: number
}

export const CircleSkeleton = ({ size = 48, ...props }: CircleSkeletonProps) => (
  <Skeleton height={size} width={size} radius={size / 2} {...props} />
)
