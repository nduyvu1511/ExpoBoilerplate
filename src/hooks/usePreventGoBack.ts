import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Alert } from 'react-native'

export type UsePreventGoBackProps = {
  title?: string
  desc?: string
  hasUnsavedChanges?: boolean
  onConfirm?: () => void
}

export const usePreventGoBack = (props?: UsePreventGoBackProps) => {
  const navigation = useNavigation()

  const {
    title = 'Bạn có muốn thoát?',
    desc = 'Nếu rời khỏi, dữ liệu vừa nhập của bạn sẽ không được lưu lại',
    hasUnsavedChanges = true,
    onConfirm,
  } = props || {}

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) return

        e.preventDefault()
        Alert.alert(title, desc, [
          { text: 'Ở lại', onPress: onConfirm, style: 'cancel' },
          { text: 'Rời khỏi', onPress: () => navigation.dispatch(e.data.action) },
        ])
      }),
    [navigation, hasUnsavedChanges]
  )
}
