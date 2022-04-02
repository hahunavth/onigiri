import { View, Text } from "native-base";
import React from "react";
import { ChapterList2 as CptList } from "../ChapterList";
import store from "app/store/store";
import { historyAction } from "app/store/historySlice";

type Props = {};

const ChapterList = (props: Props) => {
  store.dispatch(historyAction.reset);
  return (
    <View flex={1}>
      <CptList />
    </View>
  );
};

export default ChapterList;
