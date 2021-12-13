import QuicksandText from "@/components/Common/QuicksandText";
import { HomeNavigationProps } from "@/navigator/Main/BottomMenu";
import {
  chapterListcomicDetailsProps,
  chapterListComicDetailsTopBarNavigation,
  chapterListComicDetailsTopBarProps,
} from "@/navigator/Main/ComicDetailsTopTabNavigator";
import { MainNavigationProps } from "@/navigator/StackNavigator";
import { resComicDetailChapterItem_T } from "@/types/api";
import { useNavigation } from "@react-navigation/native";
import { BottomNavigation } from "@ui-kitten/components";
import React from "react";
import { ListRenderItemInfo, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useApiComicDetail } from "../../app/api";

const ChapterList: React.FunctionComponent<
  chapterListcomicDetailsProps | undefined
> = (props) => {
  const { data, isFetching, isLoading } = useApiComicDetail(
    props.route.params.path
  );
  console.log(
    "🚀 ~ file: ChapterList.tsx ~ line 22 ~   props.route.params.path",
    props.route.params.path
  );
  const navigator = useNavigation<HomeNavigationProps>();
  return (
    <FlatList
      data={isFetching ? [] : data?.chapters}
      renderItem={(item: ListRenderItemInfo<resComicDetailChapterItem_T>) => (
        <TouchableOpacity
          onPress={() =>
            navigator.navigate("Chapter", { path: item.item.path })
          }
        >
          <QuicksandText>{item.item.name}</QuicksandText>
        </TouchableOpacity>
      )}
    />
  );
};

export default ChapterList;
