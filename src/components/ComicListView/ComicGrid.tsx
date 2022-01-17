import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  ListRenderItemInfo,
  Pressable,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native";
import { HomeNavigationProps } from "@/navigators/Main/BottomMenu";
import { RootStackParamList } from "@/navigators/StackNavigator";
import { resComicItem_T } from "@/types/api";
import { comicListProps } from "./ComicList";
import {
  // SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";
import { SharedElement } from "react-navigation-shared-element";
// import { Icon } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/FontAwesome";
import QuicksandText, { QFontFamily } from "../Common/QuicksandText";
// import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import { homeActions, selectHome } from "@/app/homeSlice";

const numColumns = 3;
const ratio = 1.5;
const itemMargin = 5;
const containerMargin = 6;

const size = Dimensions.get("window").width / numColumns;
const styles = StyleSheet.create({
  container: {
    margin: containerMargin,
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
  },
  itemContainer: {
    width: size - itemMargin * 2 - (2 * containerMargin) / numColumns,
    height: size * ratio,
    margin: itemMargin,
  },
  item: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
  },
  poster: {
    width: size - itemMargin * 2 - (2 * containerMargin) / numColumns,
    height: size * ratio - 50,
    borderRadius: 8,
  },
});

export function ComicGrid({
  list,
  name,
  limit,
  onPressMore,
  subtitle,
}: comicListProps) {
  const navigation = useNavigation<HomeNavigationProps>();

  let data = list;
  if (limit) data = list?.filter((item, id) => id < limit);

  if (!list) return <Text>Error list props not found in ComicGrid2</Text>;
  const ComicGridRenderItem = ({
    item,
  }:
    | ListRenderItemInfo<resComicItem_T>
    | SectionListRenderItemInfo<resComicItem_T>
    | {
        item: resComicItem_T;
      }) => {
    // const navigation = useNavigation<HomeNavigationProps>();

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
          {/* <SharedElement id={`${item.posterUrl}`}> */}
          <Image
            style={styles.poster}
            source={{
              uri:
                item.posterUrl ||
                "http://st.imageinstant.net/data/comics/32/vo-luyen-dinh-phong.jpg",
            }}
          />
          {/* </SharedElement> */}
          <QuicksandText numberOfLines={2} style={styles.item}>
            {item.name}
          </QuicksandText>
        </View>
      </TouchableOpacity>
    );
  };

  // TODO: Use common SessionHeader
  const RenderHeader = ({
    name,
    onPressMore,
    list,
    subtitle,
  }: comicListProps): JSX.Element => {
    const HeaderHeight = 40;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginLeft: 10,
        }}
      >
        <View
          style={{
            marginLeft: 4,
          }}
        >
          <QuicksandText
            style={{
              fontFamily: "Quicksand_600SemiBold",
              fontSize: 18,
            }}
          >
            {name}
          </QuicksandText>
          <QuicksandText
            style={{
              fontFamily: QFontFamily.Quicksand_500Medium,
              fontSize: 13,
              color: "#ccc",
            }}
          >
            {subtitle}
          </QuicksandText>
        </View>
        <Pressable
          onPress={() => {
            onPressMore && onPressMore();
          }}
          style={{
            // width: HeaderHeight,
            // height: HeaderHeight,
            // flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <QuicksandText
            style={{
              // width: HeaderHeight, height: HeaderHeight,
              fontSize: 14,
              color: "#837d7d",
            }}
          >
            Show more
          </QuicksandText>
          <Icon
            name="angle-right"
            style={{
              fontSize: 20,
              color: "#837d7d",
              marginLeft: 4,
              marginRight: 16,
            }}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <RenderHeader
        name={name}
        onPressMore={onPressMore}
        list={list}
        subtitle={subtitle}
      />
      <FlatList
        initialNumToRender={1}
        style={styles.container}
        data={data}
        renderItem={ComicGridRenderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        numColumns={numColumns}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
    </>
  );
}
