// import { useVisible } from '@/hooks'
// import { Colors } from '@/theme'
// import { AnimatePresence, MotiView } from 'moti'
// import React from 'react'
// import { Pressable, StyleSheet, Text, View } from 'react-native'
// import Animated, {
//   measure,
//   runOnUI,
//   useAnimatedRef,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated'

// type Props = {}

// const Collapsible = ({}: Props) => {
//   const listRef = useAnimatedRef<any>()
//   const heightValue = useSharedValue(0)
//   const open = useSharedValue(false)
//   const { visible, onOpen, onClose } = useVisible()

//   const heightAnimationStyle = useAnimatedStyle(() => ({
//     height: heightValue.value,
//   }))

//   return (
//     <View style={styles.container}>
//       <Pressable
//         onPress={() => {
//           if (heightValue.value === 0) {
//             onOpen()
//             runOnUI(() => {
//               'worklet'
//               heightValue.value = withTiming(measure(listRef)!.height)
//             })()
//           } else {
//             onClose()
//             heightValue.value = withTiming(0)
//           }
//           open.value = !open.value
//         }}
//         style={styles.titleContainer}
//       >
//         <Text style={styles.textTitle}>Open it</Text>
//       </Pressable>

//       <Animated.View style={heightAnimationStyle}>
//         <Animated.View style={styles.contentContainer} ref={listRef}>
//           <AnimatePresence>
//             {visible ? (
//               <MotiView key="collapsible-children" from={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                 <View style={{ height: 100, backgroundColor: Colors.red }}></View>
//               </MotiView>
//             ) : null}
//           </AnimatePresence>
//         </Animated.View>
//       </Animated.View>
//     </View>
//   )
// }

// export { Collapsible }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#E3EDFB',
//     marginHorizontal: 10,
//     marginVertical: 10,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#0F56B3',
//     overflow: 'hidden',
//   },
//   textTitle: {
//     fontSize: 16,
//     color: 'black',
//   },
//   titleContainer: {
//     padding: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   contentContainer: {
//     position: 'absolute',
//     width: '100%',
//     top: 0,
//   },
//   content: {
//     padding: 20,
//     backgroundColor: '#D6E1F0',
//   },
//   textContent: {
//     fontSize: 14,
//     color: 'black',
//   },
// })

export {}
