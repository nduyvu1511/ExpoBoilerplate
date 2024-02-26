import { StyleSheet } from 'react-native'
import { Typography } from '../../theme'

export const styles = StyleSheet.create({
  inputContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7FA',
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  inputContainerActive: {},
  inputWrapper: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  inputText: {
    ...Typography.body16Normal,
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    height: '100%',
    textAlignVertical: 'center',
  },
  leftIcon: {
    marginRight: 4,
    marginLeft: 4,
  },
  rightIcon: {
    marginLeft: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
