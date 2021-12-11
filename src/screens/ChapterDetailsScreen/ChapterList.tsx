import { HomeNavigationProps } from "@/navigator/Main/BottomMenu";
import {
  chapterListComicDetailsTopBarNavigation,
  chapterListComicDetailsTopBarProps,
} from "@/navigator/Main/ComicDetailsTopTabNavigator";
import { MainNavigationProps } from "@/navigator/StackNavigator";
import { resComicDetailChapterItem_T } from "@/types/api";
import { useNavigation } from "@react-navigation/native";
import { BottomNavigation } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

const ChapterList: React.FunctionComponent<
  chapterListComicDetailsTopBarProps | undefined
> = (props) => {
  const navigator = useNavigation<HomeNavigationProps>();
  return <View></View>;
};

export default ChapterList;
