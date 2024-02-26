import * as React from 'react'
import { useState } from 'react'
import { Image, ImageProps } from './image'
import { Image as RNImage } from 'react-native'

export type ImageAutoHeightProps = ImageProps & {
  src: string
  width: number
}

export const ImageAutoHeight = ({ src, width, ...props }: ImageAutoHeightProps) => {
  const [size, setSize] = useState<{ height: number; width: number }>({ width, height: width })

  React.useLayoutEffect(() => {
    if (src) {
      RNImage.getSize(src, (width, height) => {
        setSize({ width, height })
      })
    }
  }, [])

  return (
    <Image
      src={src}
      contentFit="cover"
      // onLoad={({ source: { width, height } }) => {
      //   setSize({ width, height })
      // }}
      {...props}
      width={width}
      height={width * (size.height / size.width)}
    />
  )
}
