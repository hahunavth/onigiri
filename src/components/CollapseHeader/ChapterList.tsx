import { resComicDetailChapterItem_T } from "@/types";
import { Layout } from "@ui-kitten/components";
import React, { forwardRef, memo, useCallback } from "react";
import {
  Dimensions,
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import QuicksandText, { QFontFamily } from "../Common/QuicksandText";
import ChapterListItem from "./ChapterListItem";

// @ts-ignore
export const AnimatedFlatList: typeof FlatList =
  Animated.createAnimatedComponent(FlatList);

type Props = Omit<FlatListProps<resComicDetailChapterItem_T>, "renderItem">;

const ConnectionList = forwardRef<FlatList, Props>((props, ref) => {
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const renderItem = useCallback<ListRenderItem<resComicDetailChapterItem_T>>(
    ({ item, index }) => <ChapterListItem chapter={item} id={index} />,
    []
  );

  return (
    <AnimatedFlatList
      ref={ref}
      style={styles.container}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      {...props}
    />
  );
});

export const ListHeader = ({
  lastedChapter,
  sortType,
  onSortTypeChange,
}: {
  lastedChapter: string;
  sortType: "newer" | "older";
  onSortTypeChange: (type: "newer" | "older") => any;
}) => (
  <Layout
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
    }}
  >
    <QuicksandText style={{ fontSize: 11 }} numberOfLines={1}>
      Lasted Chapter: {lastedChapter}
    </QuicksandText>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <QuicksandText
        style={{
          fontSize: 10,
          paddingRight: 10,
          fontFamily: QFontFamily.Quicksand_600SemiBold,
          color: "red",
        }}
        numberOfLines={1}
      >
        Newer
      </QuicksandText>
      <QuicksandText
        style={{ fontSize: 10, fontFamily: QFontFamily.Quicksand_600SemiBold }}
        numberOfLines={1}
      >
        Older
      </QuicksandText>
    </View>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default memo(ConnectionList);
