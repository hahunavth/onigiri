import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HomeNavigationProps } from "src/navigators/BottomMenu";
import { RootStackParamList } from "src/navigators/StackNavigator";
import { ComicProps, comicListProps } from "./ComicList";

const numColumns = 3;
const ratio = 1.5;
const itemMargin = 5;
const containerMargin = 6;

const size = Dimensions.get("window").width / numColumns;
const styles = StyleSheet.create({
  container: {
    margin: containerMargin,
  },
  itemContainer: {
    width: size - itemMargin * 2 - (2 * containerMargin) / numColumns,
    height: size * ratio,
    margin: itemMargin,
  },
  item: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  poster: {
    width: size - itemMargin * 2 - (2 * containerMargin) / numColumns,
    height: size * ratio - 50,
    borderRadius: 8,
  },
});

export function Grid({ list, name, limit }: comicListProps) {
  // console.log("🚀 ~ file: ComicIconList.tsx ~ line 50 ~ Grid ~ list", list);
  const navigation = useNavigation<HomeNavigationProps>();
  let data = list;
  if (limit) data = list.filter((item, id) => id < limit);
  // navigation.navigate("Find");
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={({ item }: ListRenderItemInfo<ComicProps>) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ComicDetails", {
              path: item.path,
              comic: item,
              // ComicDetails: item,
            })
          }
        >
          <View style={styles.itemContainer}>
            <Image
              style={styles.poster}
              source={{
                uri:
                  item.posterPath ||
                  "http://st.imageinstant.net/data/comics/32/vo-luyen-dinh-phong.jpg",
              }}
            />
            <Text style={styles.item}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.index}
      numColumns={numColumns}
    />
  );
}
