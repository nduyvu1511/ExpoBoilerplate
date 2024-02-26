import { DraggableBottomSheet, SelectItem } from '@/components'
import { Colors } from '@/theme'
import { View } from 'moti'
import React, { useRef, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

export default function TabOneScreen() {
  const ref = useRef<DraggableBottomSheet>(null)

  return (
    <Pressable onPress={() => ref.current?.open()} style={styles.container}>
      <DraggableBottomSheet ref={ref} title="Tạo sản phẩm">
        <View style={{ flex: 1 }}>
          <SelectItem
            scrollEnabled={false}
            onChange={(val) => console.log(val)}
            data={[
              { id: 1, name: 'Title 1' },
              { id: 2, name: 'Title 2' },
              { id: 3, name: 'Title 3' },
              { id: 4, name: 'Title 4' },
              { id: 5, name: 'Title 5' },
              { id: 6, name: 'Title 6' },
            ]}
          />
        </View>
      </DraggableBottomSheet>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: Colors.white,
  },
  box: {
    width: 200,
    height: 200,
    borderRadius: 8,
    backgroundColor: 'cyan',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
