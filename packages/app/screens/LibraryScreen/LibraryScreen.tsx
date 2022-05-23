import { View, Text } from "native-base";
import React from "react";
import { LibraryTopNavigator } from "app/navigators/LibraryTopNavigator";
import ChapterContextProvider from "../ChapterScreen/ChapterContext";
import LibraryContextProvider from "./LibraryContext";
import { useIsFocused } from "../../hooks/useIsFocused";

type Props = {};

/**
 * FIXME: LIBRARY SCREEN SELECTOR CAUSE LAG COMIC DETAIL SCREEN
 * NOTE: unmount on blur and lazy in bottom nav
 */
export const LibraryScreen = (props: Props) => {
  // try {
  //   throw Error("test error");
  // } catch (e) {
  //   console.warn(e.message);
  // }
  return (
    // <View flex={1}>
    // <LibraryContextProvider>
    <LibraryTopNavigator />
    // </LibraryContextProvider>
    // </View>
  );
};
