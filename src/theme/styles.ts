import { StyleSheet } from 'react-native'
import { Colors } from './colors'

export const Shadow = StyleSheet.create({
  element: {
    shadowColor: Colors.gray30,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  box: {
    shadowColor: Colors.gray50,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    shadowColor: Colors.gray90,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
})

export const CommonStyles = StyleSheet.create({
  paper: {
    ...Shadow.element,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRowItemsCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  flexRowSpaceBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container: {
    padding: 16,
    flex: 1,
  },
  buttonBarBottom: {
    padding: 16,
    // paddingBottom: hasNotch() ? 24 : 16,
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  absoluteInset: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingViewAbsolute: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black20,
  },
})
