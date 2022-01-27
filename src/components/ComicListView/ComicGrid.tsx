import React from "react";
import {
  Dimensions,
  Image,
  ListRenderItemInfo,
  Pressable,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { resComicItem_T } from "@/types/api";
import { comicListProps } from "./ComicList";

import Icon from "react-native-vector-icons/FontAwesome";
import QuicksandText, { QFontFamily } from "../Common/QuicksandText";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { ColorSchemeE } from "@/styles/colorScheme";

import { navigate } from "@/navigators/index";
import { SharedElement } from "react-navigation-shared-element";

const numColumns = 3;
const ratio = 1.5;
const itemMargin = 5;
const containerMargin = 6;

const size = Dimensions.get("window").width / numColumns;
const themedStyles = StyleSheet.create({
  container: {
    margin: containerMargin,
    flex: 1,
    // flexGrow: 1,
    // flexShrink: 1,
  },
});

const itemStyles = StyleSheet.create({
  itemContainer: {
    width: size - itemMargin * 2 - (2 * containerMargin) / numColumns,
    height: size * ratio,
    margin: itemMargin,
  },
  item: {
    flex: 1,
    fontSize: 12,
    fontFamily: QFontFamily.Quicksand_600SemiBold,
    opacity: 0.8,
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
  // const navigation = useNavigation<HomeNavigationProps>();

  const styles = useStyleSheet(themedStyles);

  let data = list;

  if (limit) data = list?.filter((item, id) => id < limit);

  if (!list) return <Text>Error list props not found in ComicGrid2</Text>;
  // console.log("data", data);

  return (
    <>
      <RenderHeader
        name={name}
        onPressMore={onPressMore}
        list={list}
        subtitle={subtitle}
      />
      <FlatList
        // initialNumToRender={1}
        style={styles.container}
        data={data}
        renderItem={({
          item,
        }:
          | ListRenderItemInfo<resComicItem_T>
          | SectionListRenderItemInfo<resComicItem_T>
          | {
              item: resComicItem_T;
            }) => {
          // const navigation = useNavigation<HomeNavigationProps>();
          // const styles = useStyleSheet(themedStyles);

          return (
            <TouchableOpacity
              onPress={() => {
                navigate("ComicDetails", {
                  path: item.path || "",
                  comic: item,
                });
              }}
            >
              <View style={itemStyles.itemContainer}>
                <SharedElement id={`${item.posterUrl}`}>
                  <Image
                    style={itemStyles.poster as any}
                    source={{
                      uri:
                        item.posterUrl ||
                        "http://st.imageinstant.net/data/comics/32/vo-luyen-dinh-phong.jpg",
                    }}
                  />
                </SharedElement>
                <QuicksandText numberOfLines={2} style={itemStyles.item}>
                  {item.name}
                </QuicksandText>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        numColumns={numColumns}
        // scrollEnabled={false}
        // nestedScrollEnabled={true}
      />
    </>
  );
}

const headerThemedStyles = StyleService.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  titleContainer: {
    marginLeft: 4,
  },
  title: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 18,
    color: ColorSchemeE["text-basic-color"],
  },
  subTitle: {
    fontFamily: QFontFamily.Quicksand_500Medium,
    fontSize: 13,
    color: ColorSchemeE["text-hint-color"],
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    // width: HeaderHeight, height: HeaderHeight,
    fontSize: 14,
    color: ColorSchemeE["text-hint-color"],
  },
  btnIcon: {
    fontSize: 20,
    color: ColorSchemeE["text-hint-color"],
    marginLeft: 4,
    marginRight: 16,
  },
});

// TODO: Use common SessionHeader
export const RenderHeader = ({
  name,
  onPressMore,
  list,
  subtitle,
}: comicListProps): JSX.Element => {
  const styles = useStyleSheet(headerThemedStyles);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <QuicksandText style={styles.title}>{name}</QuicksandText>
        <QuicksandText style={styles.subTitle}>{subtitle}</QuicksandText>
      </View>
      <Pressable
        onPress={() => {
          onPressMore && onPressMore();
        }}
        style={styles.btn}
      >
        <QuicksandText style={styles.btnText}>Show more</QuicksandText>
        <Icon name="angle-right" style={styles.btnIcon} />
      </Pressable>
    </View>
  );
};

const ComicGridRenderItem = 0;
