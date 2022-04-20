/**
 * Show read history list
 */

import { Center, FlatList, Text, View } from "native-base";
import React from "react";
import useInteraction from "app/hooks/useInteraction";
import { HistoryComicT, historySelector } from "app/store/historySlice";
import { useAppSelector } from "app/store/hooks";
import { resComicItem_T } from "app/types";
import { Loading } from "app/components/EmptyPage";
import { ListItem2 } from "./ComicListItem2";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableNativeFeedback } from "react-native";

type Props = {
  list: resComicItem_T[];
  onEndReach?: () => any;
  listFooterComponent?: React.ReactElement;
  listEmptyComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
};

export const ComicHorizontalList2 = React.memo(function ComicHorizontalList2({
  list,
  onEndReach
}: Props) {
  const { loading } = useInteraction();

  const renderItem = React.useCallback(
    ({ item }) => <ListItem2 item={item} />,
    []
  );

  const listFooter = React.useCallback(
    () => (
      <View
        w={100}
        h={"full"}
        bg={"$light.backgroundSecondary"}
        _dark={{
          bg: "$dark.backgroundSecondary"
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <TouchableNativeFeedback>
          <MaterialIcons name="navigate-next" size={32} color="black" />
        </TouchableNativeFeedback>
        {/* <Text>More</Text> */}
      </View>
    ),
    []
  );

  return (
    <>
      {loading || !list.length ? (
        <Center
          h={200}
          w={"full"}
          justifyContent="center"
          alignItems={"center"}
          flex={1}
        >
          <Loading />
        </Center>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          renderItem={renderItem}
          ListFooterComponent={listFooter}
          keyExtractor={(item) => item?.path + ""}
          horizontal={true}
          data={list}
          onEndReachedThreshold={500}
          onEndReached={onEndReach}
          initialNumToRender={30}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={120}
          removeClippedSubviews
          alwaysBounceHorizontal={true}
        />
      )}
    </>
  );
});

// /**
//  * Show read history list
//  */

//  import { Center, FlatList, View } from "native-base";
//  import React from "react";
//  import useInteraction from "app/hooks/useInteraction";
//  import { HistoryComicT, historySelector } from "app/store/historySlice";
//  import { useAppSelector } from "app/store/hooks";
//  import { resComicItem_T } from "app/types";
//  import { Loading } from "app/components/EmptyPage";
//  import { ListItem2 } from "./ComicListItem2";
//  import {
//  import { TouchableNativeFeedback } from 'react-native';
// RecyclerListView,
//    DataProvider,
//    LayoutProvider
//  } from "recyclerlistview";

//  type Props = {
//    list: resComicItem_T[];
//    onEndReach?: () => any;
//    listFooterComponent?: React.ReactElement;
//    listEmptyComponent?:
//      | React.ComponentType<any>
//      | React.ReactElement
//      | null
//      | undefined;
//  };

//  const ViewTypes = {
//    FULL: 0,
//    HALF_LEFT: 1,
//    HALF_RIGHT: 2
//  };

//  export const ComicHorizontalList2 = React.memo(function ComicHorizontalList2({
//    list,
//    onEndReach
//  }: Props) {
//    const { loading } = useInteraction();

//    //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
//    //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
//    let dProvider = new DataProvider((r1, r2) => {
//      return r1 !== r2;
//    });

//    const dataProvider = dProvider.cloneWithRows(list.slice(24));

//    const renderItem = React.useCallback(
//      ({ item }) => <ListItem2 item={item} />,
//      []
//    );

//    return (
//      <>
//        {loading || !list.length ? (
//          <Center
//            h={200}
//            w={"full"}
//            justifyContent="center"
//            alignItems={"center"}
//            flex={1}
//          >
//            <Loading />
//          </Center>
//        ) : (
//          // <FlatList
//          //   renderItem={renderItem}
//          //   keyExtractor={(item) => item?.path + ""}
//          //   horizontal={true}
//          //   style={{ flex: 1 }}
//          //   data={list.slice(24)}
//          //   onEndReachedThreshold={500}
//          //   onEndReached={onEndReach}
//          //   initialNumToRender={30}
//          //   maxToRenderPerBatch={8}
//          //   updateCellsBatchingPeriod={120}
//          //   removeClippedSubviews
//          //   alwaysBounceHorizontal={true}
//          // />
//          <RecyclerListView
//            style={{ flex: 1, width: 500, height: 200 }}
//            layoutProvider={
//              new LayoutProvider(
//                (id) => "",
//                (type, dim) => {
//                  dim.height = 200;
//                  dim.width = 200;
//                }
//              )
//            }
//            rowRenderer={renderItem}
//            dataProvider={dataProvider}
//            onEndReached={onEndReach}
//          />
//        )}
//      </>
//    );
//  });
