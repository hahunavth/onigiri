import React from "react";
import { View, ListRenderItemInfo, InteractionManager } from "react-native";
import { FlatList } from "native-base";
import { ComicListItem } from "./ComicListItem";
import { Loading } from "../../EmptyPage/Loading";
import { ListFooter } from "./ListFooter";

import type { resComicItem_T } from "app/types";
import useInteraction from "app/hooks/useInteraction";
import { navigate } from "app/navigators";
import { TNFlatlist } from "../../Typo";

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

export const ComicVerticalList = ({
  list,
  onEndReach,
  listFooterComponent,
  listEmptyComponent
}: Props) => {
  /**
   * STUB: Wrap item component of flatlist inside function
   * So item component be able to call hook
   *
   * TODO: Convert all flatlist to this.
   */
  // console.log("re codev");
  const renderItem = React.useCallback(
    (props: ListRenderItemInfo<resComicItem_T>) => {
      // if (props.index === 1 || props.index === 5) return <Text>Sticky</Text>
      return <ComicListItem item={props.item} id={props.index} />;
    },
    []
  );

  const keyExtractor = React.useCallback(
    // FIXME: Find why have same key
    // (item, index) => item.path + index.toString(),
    (item, index) => index.toString(),
    []
  );

  // const { loading } = useInteraction();

  // return !list ? (
  //   // loading &&
  //   <Loading animation={true} />
  // ) :
  return (
    <View style={{ flex: 1 }}>
      <TNFlatlist
        style={{ flex: 1, backgroundColor: "#FAFAFA" }}
        data={list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // NOTE: THIS IS NUM PIXEL FROM END, NOT %HEIGHT
        onEndReachedThreshold={500}
        onEndReached={onEndReach}
        // NOTE: FLATLIST CAUSE SLOW NAVIGATION
        // SOLUTION1: decrease initialNumToRender
        // SOLUTION2: use Interaction manager
        // TODO: USE SOLUTION2
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        // updateCellsBatchingPeriod={120}
        // alwaysBounceHorizontal
        // removeClippedSubviews
        // directionalLockEnabled
        // disableVirtualization

        // removeClippedSubviews
        // FIXME: Sticky list too slow
        // stickyHeaderIndices={[1, 5]}
        // invertStickyHeaders
        alwaysBounceHorizontal={true}
        ListFooterComponent={listFooterComponent}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
};
