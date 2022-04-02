import { View, Text } from "native-base";
import React from "react";
import { LibraryTopNavigator } from "app/navigators/LibraryTopNavigator";
import ChapterContextProvider from "../ChapterScreen/ChapterContext";
import LibraryContextProvider from "./LibraryContext";

type Props = {};

export const LibraryScreen = (props: Props) => {
  return (
    <View flex={1}>
      <LibraryContextProvider>
        <LibraryTopNavigator />
      </LibraryContextProvider>
    </View>
  );
};
