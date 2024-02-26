import { Images } from '@/assets'
import { Regex } from '@/constants'
import { Image as ExpoImage, ImageProps as ExpoImageProps } from 'expo-image'
import React, { useState } from 'react'
import { Pressable } from 'react-native'

export type ImageSize =
  | 'pico'
  | 'icon'
  | 'thumb'
  | 'small'
  | 'compact'
  | 'medium'
  | 'large'
  | 'grande'
  | '1024x1024'
  | '2048x2048'
  | 'master'

export type ImageProps = ExpoImageProps & {
  src: string | undefined
  height?: number
  width?: number
  borderRadius?: number
  imageSize?: ImageSize
  defaultSource?: Pick<ExpoImageProps, 'source'>
  onPress?: (src: string) => void
  onLongPress?: (src: string) => void
}

export const Image = ({
  src,
  imageSize,
  defaultSource = Images.default,
  width,
  height,
  style,
  borderRadius,
  onError,
  onPress,
  onLongPress,
  ...props
}: ImageProps) => {
  const [isError, setIsError] = useState<boolean>(false)

  const checkIsImageResized = (source: string, name: string) => {
    const matches = source.match(Regex.imageSize)
    if (!matches) return false

    const size = matches[2]
    return name.endsWith(size)
  }

  const changeImageSize = (src: string | undefined, size?: ImageSize) => {
    if (!src) return

    if (!size) return src

    const matches = src.match(Regex.imageFormat)
    if (!matches) return src

    let name = matches[1]
    const ext = matches[2]

    if (checkIsImageResized(src, name)) {
      // name = name.slice(0, name.lastIndexOf('_'))
      return `${name}_${size}.${ext}`
    }

    return `${name}.${ext}`
  }

  return (
    <Pressable onPress={() => src && onPress?.(src)} onLongPress={() => src && onLongPress?.(src)}>
      <ExpoImage
        placeholder="UARfh0_200ax~qazWAfP00xuM|WB-:offRj?"
        contentFit="cover"
        transition={300}
        source={isError ? defaultSource : changeImageSize(src, imageSize)}
        {...props}
        style={[{ width, height, borderRadius }, style]}
        onError={(event) => {
          onError?.(event)
          setIsError(true)
        }}
      />
    </Pressable>
  )
}
