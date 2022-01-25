import { resComicDetailChapterItem_T } from "@/types";
import { Layout } from "@ui-kitten/components";
import React, { forwardRef, memo, useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
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
  const [sortNewer, setSortNewer] = useState(true);

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const renderItem = useCallback<ListRenderItem<resComicDetailChapterItem_T>>(
    ({ item, index }) => <ChapterListItem chapter={item} id={index} />,
    []
  );

  const olderList = useMemo(() => {
    const list = [];
    if (props.data)
      for (let i = props.data?.length - 1; i > 0; i--) {
        list.push(props.data[i]);
      }
    return list;
  }, [props.data]);

  return (
    <Layout style={{ flex: 1 }} level={"2"}>
      <AnimatedFlatList
        ref={ref}
        style={styles.container}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...props}
        data={sortNewer ? props.data : olderList}
        ListHeaderComponent={() => {
          return (
            <ListHeader
              lastedChapter={(props.data && props.data[0].name) || ""}
              sortType={sortNewer}
              onSortTypeChange={setSortNewer}
            />
          );
        }}
      />
    </Layout>
  );
});

const listHeaderStyle = StyleSheet.create({
  text: {
    fontSize: 10,
    paddingRight: 10,
    fontFamily: QFontFamily.Quicksand_600SemiBold,
  },
  activate: {
    color: "red",
  },
});

export const ListHeader = ({
  lastedChapter,
  sortType,
  onSortTypeChange,
}: {
  lastedChapter: string;
  sortType: boolean;
  onSortTypeChange: (type: boolean) => any;
}) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
      marginBottom: 5,
    }}
  >
    <QuicksandText style={{ fontSize: 11 }} numberOfLines={1}>
      Lasted Chapter: {lastedChapter}
    </QuicksandText>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity
        onPress={() => {
          onSortTypeChange(true);
        }}
      >
        <QuicksandText
          style={[
            {
              fontSize: 10,
              paddingRight: 10,
              fontFamily: QFontFamily.Quicksand_600SemiBold,
            },
            sortType && listHeaderStyle.activate,
          ]}
          numberOfLines={1}
        >
          Newer
        </QuicksandText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onSortTypeChange(false);
        }}
      >
        <QuicksandText
          style={[
            {
              fontSize: 10,
              paddingRight: 5,
              fontFamily: QFontFamily.Quicksand_600SemiBold,
            },
            !sortType && listHeaderStyle.activate,
          ]}
          numberOfLines={1}
        >
          Older
        </QuicksandText>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    flex: 1,
  },
});

export default memo(ConnectionList);
