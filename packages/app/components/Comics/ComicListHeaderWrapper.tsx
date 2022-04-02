import React from "react";
import {
  Animated,
  FlatListProps,
  ListRenderItemInfo,
  TextInput
} from "react-native";
import {
  useCollapsibleSubHeader,
  CollapsibleSubHeaderAnimator
} from "react-navigation-collapsible";

import { resComicItem_T } from "app/types";
import { ComicListItem } from "app/components/Comics/ComicVerticalList/ComicListItem";
import { Loading } from "../EmptyPage/Loading";
import { View } from "native-base";
import ListFooter from "./ListFooter";

// const MySearchBar = () => (
//   <View style={{ padding: 15, width: "100%", height: 600 }}>
//     <TextInput placeholder="search here" />
//   </View>
// );

export const ComicListHeaderWrapper = (
  props: Partial<FlatListProps<resComicItem_T>>
) => {
  const {
    onScroll /* Event handler */,
    containerPaddingTop /* number */,
    scrollIndicatorInsetTop /* number */,
    translateY,
    offsetY
  } = useCollapsibleSubHeader({
    config: {
      elevation: 10,
      useNativeDriver: true
    }
  });

  const renderItem = React.useCallback(
    (props: ListRenderItemInfo<resComicItem_T>) => {
      // if (props.index === 1 || props.index === 5) return <Text>Sticky</Text>
      return <ComicListItem item={props.item} />;
    },
    []
  );

  return (
    <>
      {/* @ts-ignore */}
      <Animated.FlatList
        {...props}
        renderItem={renderItem}
        keyExtractor={(item, id) => item.path || id.toString()}
        onScroll={onScroll}
        contentContainerStyle={{ paddingTop: containerPaddingTop }}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
        ListFooterComponent={ListFooter}
        /* rest of your stuff */
      />
      <CollapsibleSubHeaderAnimator translateY={translateY}>
        <View
          bg={"orange.50"}
          style={{
            padding: 13,
            width: "100%",
            height: 100
            // backgroundColor: "green"
          }}
        >
          <Loading />
        </View>
      </CollapsibleSubHeaderAnimator>
    </>
  );
};
