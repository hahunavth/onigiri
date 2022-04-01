/**
 * Show read history list
 */

import { FlatList } from "native-base";
import React from "react";
import { HistoryComicT, historySelector } from "../../../store/historySlice";
import { useAppSelector } from "../../../store/hooks";
import { resComicItem_T } from "../../../types";
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
  return (
    <>
      <FlatList
        // data={renderedList}
        renderItem={({ item }) => <ListItem2 item={item} />}
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
    </>
  );
});
