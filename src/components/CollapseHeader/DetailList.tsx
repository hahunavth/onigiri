import {
  resChapterDetail_T,
  resComicDetailChapterItem_T,
  resComicDetail_T,
} from "@/types";
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

type Props = Omit<FlatListProps<resComicDetail_T>, "renderItem">;

const Details = forwardRef<FlatList, Props>((props, ref) => {
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const renderItem = useCallback<ListRenderItem<resComicDetail_T>>(
    ({ item }) => (
      <View>
        <QuicksandText>{item.author}</QuicksandText>
        <QuicksandText>{item.kind}</QuicksandText>
        <QuicksandText>{item.rate}</QuicksandText>
        <QuicksandText>{item.status}</QuicksandText>
        <QuicksandText>{item.info}</QuicksandText>
        <QuicksandText>{item.detail}</QuicksandText>
      </View>
    ),
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default memo(Details);
