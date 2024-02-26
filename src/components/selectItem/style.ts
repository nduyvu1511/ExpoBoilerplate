import { Colors, CommonStyles, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  left: {
    position: 'relative',
    width: 20,
    height: 20,
    marginRight: 12,
  },
  body: {
    ...CommonStyles.flexRowItemsCenter,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 4,
    marginRight: 12,
    position: 'relative',
  },
  item: {
    ...CommonStyles.flexRowSpaceBetween,
  },
  text: {
    ...Typography.body16Normal,
    color: Colors.gray90,
    flex: 1,
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  loadingView: {
    ...CommonStyles.absoluteInset,
    ...CommonStyles.flexCenter,
    zIndex: 100,
  },
})
