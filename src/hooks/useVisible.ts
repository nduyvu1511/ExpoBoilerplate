import { useCallback, useState } from 'react'

export type UseBoolean = {
  visible: boolean
  setVisible: (visible: boolean) => void
  onClose: () => void
  onOpen: () => void
  toggle: () => void
}

export const useBoolean = (active = false): UseBoolean => {
  const [visible, setVisible] = useState<boolean>(active)

  const onClose = useCallback(() => setVisible(false), [])
  const onOpen = useCallback(() => setVisible(true), [])
  const toggle = useCallback(() => setVisible((visible) => !visible), [])

  return {
    visible,
    onOpen,
    toggle,
    onClose,
    setVisible,
  }
}
