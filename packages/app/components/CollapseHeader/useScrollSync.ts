import React from "react";
import { FlatListProps } from "react-native";
import { HeaderConfig } from "./Header";
import { ScrollPair } from "./ScrollPair";

const useScrollSync = (scrollPairs: ScrollPair[], headerDiff: number) => {
  const sync = React.useCallback<
    NonNullable<FlatListProps<any>["onMomentumScrollEnd"]>
  >(
    (event) => {
      const { y } = event.nativeEvent.contentOffset;

      // const { heightCollapsed, heightExpanded } = headerConfig;
      // const headerDiff = heightExpanded - heightCollapsed;

      for (const { list, position } of scrollPairs) {
        const scrollPosition = position.value ?? 0;

        if (scrollPosition > headerDiff && y > headerDiff) {
          continue;
        }

        // @ts-ignore
        list.current?.scrollToOffset({
          offset: Math.min(y, headerDiff),
          animated: false
        });
      }
    },
    [scrollPairs, headerDiff]
  );

  return { sync };
};

export default useScrollSync;
