import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ComicProps, comicListProps } from "./ComicList";

const data = [
  { id: "a", value: "A" },
  { id: "b", value: "B" },
  { id: "c", value: "C" },
  { id: "d", value: "D" },
  { id: "e", value: "E" },
  { id: "f", value: "F" },
];

const numColumns = 3;
const size = Dimensions.get("window").width / numColumns;
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: "lightblue",
  },
  poster: {
    width: 72,
    height: 108,
  },
});

export function Grid({ list, name }: comicListProps) {
  const navigation: any = useNavigation();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image
            style={styles.poster}
            source={{
              uri:
                item.posterPath ||
                "http://st.imageinstant.net/data/comics/32/vo-luyen-dinh-phong.jpg",
            }}
          />
          <Text style={styles.item}>{item.value}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
    />
  );
}
