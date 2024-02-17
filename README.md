# react-native-reorderable-flatlist
A lightweight, zero-dependency flatlist with a simple item reordering animation

## Installation
 - Using npm: `npm i react-native-reorderable-flatlist`
 - Using yarn: `yarn add react-native-reorderable-flatlist`

## Usage
This package exports `ReorderableFlatList`, which closely replicates `FlatList` from `react-native`, but with some slight changes. It's renderItem has a few additional controls, 

```tsx
import { ReorderableFlatList, ListRenderItem } from "react-native-reorderable-flatlist";

export function ExampleComponent() {

  const renderItem: ListRenderItem<DataType> = useCallback(({ item, moveDown, moveUp }) => (
      <View style={{ backgroundColor: item.color, paddingVertical: 20 }}>
        <Pressable onPress={moveUp}>
          <Text>Move up</Text>
        </Pressable>
        <Text>{item.label}</Text>
        <Pressable onPress={moveDown}>
          <Text>Move Down</Text>
        </Pressable>
      </View>
    ), []);
  
  return (
    <SafeAreaView>
      <ReorderableFlatList
        data={exampleData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

```