import Constants, { ExecutionEnvironment } from 'expo-constants'

const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient

export function hasNotch(): boolean {
  if (!isExpoGo) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('react-native-device-info').hasNotch()
  }

  return false
}
