import { FlatList, Factory } from "native-base";
import React, { PureComponent } from "react";
import { FlatList as RNCFlatlist, FlatListProps } from "react-native";
import Animated from "react-native-reanimated";

import type { IFlatListProps } from "native-base/src/components/basic/FlatList";
import type {} from "native-base/src/components/basic/FlatList/FlatList";

// class TNFlatlist<T> extends PureComponent<IFlatListProps<T>, any> {
//   render() {
//     return <FlatList scrollEventThrottle={16} {...this.props} />
//   }
// }

const TNFlatlist: typeof FlatList = React.memo(
  React.forwardRef(function (props, ref: any) {
    return (
      <FlatList
        scrollEventThrottle={16}
        {...props}
        // @ts-ignore
        ref={ref}
      />
    );
  })
);

// @ts-ignore
// const ANFlatlist: // | typeof FlatList
// React.FunctionComponent<Animated.AnimateProps<IFlatListProps<unknown>>> =
//   Animated.createAnimatedComponent(TNFlatlist)

class RNFlatlist<T> extends PureComponent<FlatListProps<T>, any> {
  render() {
    return <RNFlatlist {...this.props} />;
  }
}
const FRNFlatlist = Factory(RNFlatlist);

/**
 *
 */
export {
  // ANFlatlist,
  TNFlatlist,
  RNFlatlist,
  FRNFlatlist
};
