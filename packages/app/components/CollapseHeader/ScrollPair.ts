import { RefObject } from "react";
import { FlatList, ScrollView } from "react-native";
import Animated from "react-native-reanimated";

export type ScrollPair = {
  list: RefObject<FlatList> | RefObject<ScrollView>;

  position: Animated.SharedValue<number>;
};
