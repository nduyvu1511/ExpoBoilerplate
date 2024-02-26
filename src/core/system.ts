import { ToastOption } from '@/types'
import * as Haptics from 'expo-haptics'
import { Platform, Vibration } from 'react-native'
import { showMessage } from 'react-native-flash-message'

type ToastOptionParams = Omit<ToastOption, 'type'>

export class CoreSystem {
  static patternVibration = 400

  static toastInfo = (options: ToastOptionParams) => {
    showMessage({
      type: 'info',
      ...options,
    })
  }

  static toastSuccess = (options: ToastOptionParams) => {
    showMessage({
      type: 'success',
      ...options,
    })
  }

  static toastWarning = (options: ToastOptionParams) => {
    showMessage({
      type: 'info',
      ...options,
    })
  }

  static toastError = (options: ToastOptionParams & { vibrate?: boolean }) => {
    showMessage({
      type: 'info',
      ...options,
    })

    if (options.vibrate && Platform.OS == 'ios') {
      if (Platform.OS === 'ios') {
        this.startHaptics('notification', 'error')
      } else {
        this.startVibration()
      }
    }
  }

  static startVibration = (pattern: number | number[] = 400, repeat: boolean = false) => {
    Vibration.vibrate(pattern ? pattern : this.patternVibration, repeat)
  }

  static stopVibration = () => {
    Vibration.cancel()
  }

  static startHaptics = async (type: ETypeHaptic, style?: EImpactStyle | ENoticationStyle) => {
    switch (type) {
      case 'impact':
        let impactType = Haptics.ImpactFeedbackStyle.Medium
        switch (style) {
          case 'light':
            impactType = Haptics.ImpactFeedbackStyle.Light
            break
          case 'heavy':
            impactType = Haptics.ImpactFeedbackStyle.Heavy
            break
        }
        await Haptics.impactAsync(impactType)
        break
      case 'notification':
        let notificationType = Haptics.NotificationFeedbackType.Success
        switch (style) {
          case 'warning':
            notificationType = Haptics.NotificationFeedbackType.Warning
            break
          case 'error':
            notificationType = Haptics.NotificationFeedbackType.Error
            break
        }
        await Haptics.notificationAsync(notificationType)
        break
      case 'select':
        await Haptics.selectionAsync()
        break
    }
  }
}

declare type ETypeHaptic = 'impact' | 'notification' | 'select'
declare type EImpactStyle = 'light' | 'medium' | 'heavy'
declare type ENoticationStyle = 'success' | 'error' | 'warning'
