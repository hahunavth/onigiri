import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native";
import { HomeNavigationProps } from "src/navigators/Main/BottomMenu";
import { comicListProps } from "./ComicList";
import { resComicItem_T } from "src/types/api";
// import { Icon } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/FontAwesome";
import QuicksandText from "../Common/QuicksandText";
import { RenderHeader } from "./ComicGrid";

const numColumns = 2;
const ratio = 1;
const itemMargin = 5;
const containerMargin = 6;

const size = Dimensions.get("window").width / numColumns;
const styles = StyleSheet.create({
  container: {
    margin: containerMargin,
    // backgroundColor: "white",
  },
  itemContainer: {
    width: size - itemMargin * 2 - (2 * containerMargin) / numColumns,
    height: size * ratio,
    margin: itemMargin,
  },
  item: {
    flex: 1,
    // backgroundColor: "lightblue",
    fontSize: 13,
    fontFamily: "Quicksand_600SemiBold",
  },
  poster: {
    width: size - itemMargin * 2 - (2 * containerMargin) / numColumns,
    height: size * ratio - 50,
    borderRadius: 8,
  },
});

export function ComicGrid2({
  list,
  name,
  limit,
  onPressMore,
  subtitle,
}: comicListProps) {
  // console.log("🚀 ~ file: ComicIconList.tsx ~ line 50 ~ Grid ~ list", list);
  let data = list;

  const navigation = useNavigation<HomeNavigationProps>();

  if (!list) return <Text>Error list props not found in ComicGrid2</Text>;

  if (limit) data = list.filter((item, id) => id < limit);

  const ComicGridRenderItem2 = ({
    item,
  }:
    | ListRenderItemInfo<resComicItem_T>
    | {
        item: resComicItem_T;
      }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ComicDetails", {
            path: item.path || "",
            comic: item,
          });
        }}
      >
        <View style={styles.itemContainer}>
          <Image
            style={styles.poster}
            source={{
              uri:
                item.posterUrl ||
                "http://st.imageinstant.net/data/comics/32/vo-luyen-dinh-phong.jpg",
            }}
          />
          <QuicksandText numberOfLines={2} style={styles.item}>
            {item.name}
          </QuicksandText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <RenderHeader
        list={list}
        name={name}
        onPressMore={onPressMore}
        subtitle={subtitle}
      />
      <FlatList
        style={styles.container}
        data={data}
        scrollEnabled={false}
        nestedScrollEnabled={true}
        renderItem={ComicGridRenderItem2}
        keyExtractor={(item, index) => item.path + index.toString()}
        numColumns={numColumns}
      />
    </>
  );
}

// const RenderHeader = ({
//   name,
//   onPressMore,
//   list,
//   subtitle,
// }: comicListProps): JSX.Element => {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         alignItems: "flex-end",
//         justifyContent: "space-between",
//         marginLeft: 10,
//       }}
//     >
//       <View
//         style={{
//           marginLeft: 4,
//         }}
//       >
//         <QuicksandText
//           style={{
//             fontSize: 20,
//             fontFamily: "Quicksand_600SemiBold",
//           }}
//         >
//           {name}
//         </QuicksandText>
//         <QuicksandText style={{ fontSize: 13, color: "#ccc" }}>
//           {subtitle}
//         </QuicksandText>
//       </View>
//       <Pressable
//         onPress={() => {
//           onPressMore && onPressMore();
//         }}
//         style={{
//           // width: HeaderHeight,
//           // height: HeaderHeight,
//           // flex: 1,
//           flexDirection: "row",
//           alignItems: "center",
//         }}
//       >
//         <QuicksandText
//           style={{
//             // width: HeaderHeight, height: HeaderHeight,
//             fontSize: 14,
//             color: "#837d7d",
//           }}
//         >
//           Show more
//         </QuicksandText>
//         <Icon
//           name="angle-right"
//           style={{
//             // width: HeaderHeight, height: HeaderHeight,
//             fontSize: 20,
//             color: "#837d7d",
//             marginLeft: 4,
//             marginRight: 16,
//           }}
//         />
//       </Pressable>
//     </View>
//   );
// };
