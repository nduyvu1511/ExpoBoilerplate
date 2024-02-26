import { useIsFocused } from '@react-navigation/native'
import { useEffect, useRef } from 'react'

// trigger when go back
export const useScreenGoBack = (callback: () => void) => {
  const firstRef = useRef<boolean>(false)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (firstRef.current === false) {
      firstRef.current = true
    } else {
      if (isFocused) {
        callback()
      }
    }
  }, [isFocused])
}
