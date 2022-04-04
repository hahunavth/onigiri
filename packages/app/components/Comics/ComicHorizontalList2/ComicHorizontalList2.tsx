/**
 * Show read history list
 */

import { Center, FlatList, View } from "native-base";
import React from "react";
import useInteraction from "app/hooks/useInteraction";
import { HistoryComicT, historySelector } from "app/store/historySlice";
import { useAppSelector } from "app/store/hooks";
import { resComicItem_T } from "app/types";
import { Loading } from "app/components/EmptyPage";
import { ListItem2 } from "./ComicListItem2";

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
          renderItem={renderItem}
          keyExtractor={(item) => item?.path + ""}
          horizontal={true}
          style={{ flex: 1 }}
          data={list.slice(24)}
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
