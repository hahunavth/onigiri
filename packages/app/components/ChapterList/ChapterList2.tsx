/**
 * NOTE: FOR BOTTOM SHEET IN CHAPTER SCREEN
 */

import type { resComicDetailChapterItem_T } from "app/types";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  Dimensions,
  FlatList,
  FlatListProps,
  InteractionManager,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Text } from "native-base";
import Animated from "react-native-reanimated";
import ChapterListItem from "./ChapterListItem";
import { MotiScrollView } from "moti";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import {
  historySelector,
  selectLastedReadChapterPathList
} from "app/store/historySlice";
import { homeSelector } from "../../store/homeSlice";
import useInteraction from "../../hooks/useInteraction";
import usePrevious from "react-use/esm/usePrevious";
import { chapterActions, selectChapterInfo } from "../../store/chapterSlice";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetSectionList
} from "@gorhom/bottom-sheet";
import { goBack, navigate } from "../../navigators";
// import { ANFlatlist } from '../Typo'

// type Props = Omit<
//   FlatListProps<
//     resComicDetailChapterItem_T & {
//       visited?: boolean;
//     }
//   >,
//   "renderItem"
// >;

/**
 * Main component
 */
const ConnectionList = forwardRef<
  FlatList,
  // Props & {
  //   // This props for downloaded offline comic
  //   offline?: boolean;
  // }
  any
>((props, ref) => {
  const dispatch = useAppDispatch();

  const comic = useAppSelector(homeSelector).currentComic;
  const chapters = comic?.chapters || [];
  const history = useAppSelector(historySelector);
  const [sortNewer, setSortNewer] = useState(true);
  const { currentComic } = useAppSelector(homeSelector);

  const readerChapterList = useAppSelector((state) =>
    selectLastedReadChapterPathList(state)
  );

  // Memo
  const keyExtractor = useCallback(
    (_: resComicDetailChapterItem_T, index) => _.path,
    []
  );

  const renderItem = useCallback<ListRenderItem<resComicDetailChapterItem_T>>(
    ({ item, index }) => (
      <ChapterListItem
        customOnPress={() => {
          dispatch(
            chapterActions.setCurrentChapter(
              sortNewer ? index : chapters.length - 1 - index
            )
          );
          goBack();
        }}
        readCptObj={history.readCpt}
        chapter={item}
        id={
          props.data?.length
            ? sortNewer
              ? index
              : props.data?.length - 1 - index
            : -1
        }
        offline={props.offline}
        comicPath={currentComic?.path}
      />
    ),
    [props.offline, sortNewer]
  );

  const renderItem2 = useCallback<ListRenderItem<resComicDetailChapterItem_T>>(
    ({ item, index }) => (
      <ChapterListItem
        customOnPress={() => {
          const cId = chapters.findIndex((c) => c.path === item.path);
          if (cId) dispatch(chapterActions.setCurrentChapter(cId));
          goBack();
        }}
        readCptObj={history.readCpt}
        chapter={item}
        id={
          props.data?.length
            ? sortNewer
              ? index
              : props.data?.length - 1 - index
            : -1
        }
        offline={props.offline}
        comicPath={currentComic?.path}
      />
    ),
    [props.offline, sortNewer]
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

  const ListHeaderComponent = () => {
    return (
      <ListHeader
        lastedChapter={(props.data && props.data[0].name) || ""}
        sortType={sortNewer}
        onSortTypeChange={setSortNewer}
      />
    );
  };

  const getItemLayout = React.useCallback((data, index) => {
    return {
      index,
      offset: index * 50,
      length: 50
    };
  }, []);

  return (
    <View style={styles.container}>
      {loading ? null : (
        <BottomSheetSectionList
          sections={[
            {
              header: () => (
                <Text fontSize={12} pl={3}>
                  Lasted Read
                </Text>
              ),
              data: readerChapterList
            },
            { header: () => <ListHeaderComponent />, data: chapters }
          ]}
          renderItem={({ index, item, section, separators }) => {
            const Render1 = renderItem;
            const Render2 = renderItem2;
            if (index === 1)
              return (
                <Render1 index={index} item={item} separators={separators} />
              );
            else
              return (
                <Render2 index={index} item={item} separators={separators} />
              );
          }}
          renderSectionHeader={({ section }) => {
            const Header = section.header;
            return <Header />;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        // {/* <BottomSheetFlatList
        //   scrollEnabled={true}
        //   nestedScrollEnabled={true}
        //   data={[
        //     () => (
        //       <BottomSheetFlatList
        //         // @ts-ignore
        //         ref={ref}
        //         style={styles.container}
        //         renderItem={renderItem2}
        //         keyExtractor={(item) => item.path + "V2"}
        //         // scrollEnabled={false}
        //         // {...props}

        //         data={readerChapterList}
        //         getItemLayout={getItemLayout}
        //         ListHeaderComponent={() => (
        //           <Text fontSize={12} pl={3}>
        //             Lasted Read
        //           </Text>
        //         )}
        //       />
        //     ),
        //     () => (
        //       <BottomSheetFlatList
        //         // @ts-ignore
        //         ref={ref}
        //         // scrollEnabled={false}
        //         style={styles.container}
        //         renderItem={renderItem}
        //         keyExtractor={keyExtractor}
        //         // {...props}
        //         initialNumToRender={1}
        //         data={chapters}
        //         getItemLayout={getItemLayout}
        //         ListHeaderComponent={ListHeaderComponent}
        //       />
        //     )
        //   ]}
        //   renderItem={({ item: Item }) => <Item />}
        //   keyExtractor={(item, id) => id.toString()}
        // /> */}
      )}
    </View>
  );
});

const listHeaderStyle = StyleSheet.create({
  flex1: { flex: 1 },
  text: {
    fontSize: 10,
    paddingRight: 10
    // fontFamily: QFontFamily.Quicksand_600SemiBold
  },
  activate: {
    color: "#704217"
  }
});

const ListHeader = ({
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
export const ChapterList2 = memo(ConnectionList);
