import { Colors } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.overlay,
  },
  modal: {
    maxWidth: 350,
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalFullScreen: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 0,
  },
  modalChildren: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
  },
})
