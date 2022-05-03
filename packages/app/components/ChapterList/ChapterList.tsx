/**
 * NOTE: COLLAPSE HEADER CHAPTER LIST
 */

import type { resComicDetailChapterItem_T } from "app/types";
import React, { forwardRef, memo, useCallback, useState } from "react";
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
  ListRenderItemInfo
} from "react-native";
import { Text } from "native-base";
import Animated from "react-native-reanimated";
import ChapterListItem from "./ChapterListItem";
import { useAppSelector } from "app/store/hooks";
import { historySelector } from "app/store/historySlice";
import { homeSelector } from "app/store/homeSlice";
import useInteraction from "app/hooks/useInteraction";
import { Loading } from "../EmptyPage";

// @ts-ignore
export const AnimatedFlatList: typeof FlatList =
  // @ts-ignore
  Animated.createAnimatedComponent(FlatList);

type Props = Omit<
  FlatListProps<
    resComicDetailChapterItem_T & {
      visited?: boolean;
    }
  >,
  "renderItem"
>;

/**
 * Main component
 */
const ConnectionList = forwardRef<
  FlatList,
  Props & {
    // This props for downloaded offline comic
    offline?: boolean;
    isFocused: boolean;
  }
>((props, ref) => {
  const history = useAppSelector(historySelector);
  const [sortNewer, setSortNewer] = useState(true);
  const { currentComic } = useAppSelector(homeSelector);

  // Memo
  const keyExtractor = useCallback<
    (
      item: resComicDetailChapterItem_T & {
        visited?: boolean | undefined;
      },
      index: number
    ) => string
  >(
    (_, index) => {
      const len = props.data?.length || 0;
      const key = len ? (sortNewer ? index : len - 1 - index) : -100 - index;
      // console.log(key);
      return key.toString();
    },
    [sortNewer, props.data]
  );

  const renderItem = useCallback<ListRenderItem<resComicDetailChapterItem_T>>(
    ({ item, index }) => {
      const key = props.data?.length
        ? sortNewer
          ? index
          : props.data?.length - 1 - index
        : -1;
      return (
        <ChapterListItem
          readCptObj={history.readCpt}
          chapter={item}
          id={key}
          offline={props.offline}
          comicPath={currentComic?.path}
        />
      );
    },
    [props.offline, sortNewer, props.data]
  );

  const [olderList, setOlderList] = useState<resComicDetailChapterItem_T[]>([]);

  const { loading } = useInteraction({
    callback: () => {
      const list = [];
      if (props.data)
        for (let i = props.data?.length - 1; i > 0; i--) {
          list.push(props.data[i]);
        }
      setOlderList(list);
    },
    dependencyList: [props.data]
  });

  const ListHeaderComponent = useCallback(() => {
    return (
      <ListHeader
        lastedChapter={(props.data && props.data[0].name) || ""}
        sortType={sortNewer}
        onSortTypeChange={setSortNewer}
      />
    );
  }, []);

  const getItemLayout = React.useCallback((data, index) => {
    return {
      index,
      offset: index * 50,
      length: 50
    };
  }, []);

  console.log(
    "🚀 ~ file: ChapterList.tsx ~ line 135 ~ props.isFocused",
    props.isFocused
  );

  return (
    <View style={styles.container}>
      {loading || !props.isFocused || !props.data ? (
        <Loading />
      ) : (
        <AnimatedFlatList
          // @ts-ignore
          ref={ref}
          style={styles.container}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          {...props}
          data={sortNewer ? props.data : olderList}
          getItemLayout={getItemLayout}
          ListHeaderComponent={ListHeaderComponent}
        />
      )}
    </View>
  );
});

const listHeaderStyle = StyleSheet.create({
  flex1: { flex: 1 },
  text: {
    fontSize: 10,
    paddingRight: 10
  },
  activate: {
    color: "#704217"
  }
});

export const ListHeader = ({
  lastedChapter,
  sortType,
  onSortTypeChange
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
      marginBottom: 5
    }}
  >
    <Text style={{ fontSize: 11 }} numberOfLines={1}>
      Lasted Chapter: {lastedChapter}
    </Text>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity
        onPress={() => {
          onSortTypeChange(true);
        }}
      >
        <Text
          style={[
            {
              fontSize: 10,
              paddingRight: 10
            },
            sortType && listHeaderStyle.activate
          ]}
          numberOfLines={1}
        >
          Newer
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onSortTypeChange(false);
        }}
      >
        <Text
          style={[
            {
              fontSize: 10,
              paddingRight: 5
            },
            !sortType && listHeaderStyle.activate
          ]}
          numberOfLines={1}
        >
          Older
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export const ChapterList = memo(ConnectionList);
