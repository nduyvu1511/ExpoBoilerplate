import { Colors, CommonStyles, Typography } from '@/theme'
import { Dimensions, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: Colors.transparent,
  },
  wrap: {
    position: 'absolute',
    zIndex: 100,
    borderRadius: 8,
    backgroundColor: Colors.white,
    width: 240,
    maxHeight: 200,
    shadowColor: Colors.gray60,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  wrapContent: {
    overflow: 'hidden',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray20,
  },
  trigger: {
    ...CommonStyles.flexRowItemsCenter,
    paddingHorizontal: 8,
    borderColor: Colors.gray20,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
  },
  triggerLabel: {
    ...Typography.body14Normal,
    marginRight: 4,
    flex: 1,
  },
})
