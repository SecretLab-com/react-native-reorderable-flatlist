import { StatusBar } from "expo-status-bar";
import { ColorValue, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ReorderableFlatList } from "react-native-reorderable-flatlist";

type ExampleData = {
  id: string;
  title: string;
  color: ColorValue;
};

const exampleData: ExampleData[] = [
  {
    id: "1",
    color: "red",
    title: "Red",
  },
  {
    id: "2",
    color: "blue",
    title: "Blue",
  },
  {
    id: "3",
    color: "green",
    title: "Green",
  },
  {
    id: "4",
    color: "purple",
    title: "Purple",
  },
  {
    id: "5",
    color: "orange",
    title: "Orange",
  },
  {
    id: "6",
    color: "yellow",
    title: "Yellow",
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ReorderableFlatList
        data={exampleData}
        renderItem={({ item, moveDown, moveUp }) => (
          <View style={{ backgroundColor: item.color, paddingVertical: 20 }}>
            <Pressable onPress={moveUp}><Text>Up</Text></Pressable>
            <Text>Item</Text>
            <Pressable onPress={moveDown}><Text>Down</Text></Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
