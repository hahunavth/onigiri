import {
  Button,
  Card,
  Layout,
  List,
  ListItemProps,
  Modal,
  Spinner,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ListRenderItemInfo,
  Dimensions,
  ActivityIndicator,
} from "react-native";
// import ImageSize from "react-native-image-size";

import { ChapterScreenProps } from "@/navigators/StackNavigator";
import ScaledImage from "@/components/ComicListView/ScaledImage";
import { useApiChapter, usePrefetch } from "@/app/api";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { downloadAction, downloadSelector } from "@/app/downloadSlice";
import { homeActions, selectHome } from "@/app/homeSlice";

// import { BlurView } from "expo-blur";
import BlurHeader from "@/components/Header/BlurHeader";
import ChapterBar from "./ChapterBar";
// import {} from "@/types";
import Animated, {
  Easing,
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { historyAction, historySelector } from "@/app/historySlice";

let oldOffset = 0;
let headerVisible = true;

export function ChapterScreen({
  route: {
    params: { path, id },
  },
}: ChapterScreenProps) {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // top: offset.value,
      transform: [
        {
          // offset.value,
          translateY: withTiming(offset.value * 2, {
            duration: 500,
            easing: Easing.out(Easing.exp),
          }),
        },
      ],
    };
  });

  const home = useAppSelector(selectHome);
  const history = useAppSelector(historySelector);
  console.log(history);
  // const [oldOffset, setOldOffset] = useState(0);

  const { data, isLoading, isFetching } = useApiChapter(path);
  const dispatch = useAppDispatch();

  const chapterInfo = data?.data;

  useEffect(() => {
    if (!isFetching && data) {
      dispatch(homeActions.setCurrentChapter({ ...data?.data, id: id }));
      if (home.currentComic) {
        // dispatch(historyAction.pushComic(home.currentComic));
        // dispatch(
        // historyAction.pushChapter({
        // comicPath: home.currentComic?.path,
        // chapterPath: data?.data.path,
        // })
        // );
        console.log(home.currentComic);
      }
    }
    return () => {
      dispatch(homeActions.removeCurrentChapter());
    };
  }, [isFetching, data]);

  if (isFetching && !data)
    return (
      <Layout style={{ flex: 1 }}>
        <Modal visible={true}>
          <Card disabled={true}>
            <Text>{path}</Text>
            <Spinner />
          </Card>
        </Modal>
      </Layout>
    );

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        {/* <BlurHeader /> */}
        <List
          data={chapterInfo?.images || []}
          renderItem={renderItem}
          keyExtractor={(item, id) => item}
          style={{ zIndex: 11 }}
          onScroll={(e) => {
            const currentOffset = e.nativeEvent.contentOffset.y;

            const newScrollValue = offset.value + currentOffset - oldOffset;

            if (newScrollValue > 100) {
              offset.value = 100;
              headerVisible = false;
            } else if (newScrollValue < 0) offset.value = 0;
            else offset.value = newScrollValue;

            oldOffset = currentOffset;
          }}
        />
      </Layout>
      <ChapterBar style={animatedStyles} />
    </Layout>
  );
}

const renderItem = ({ item }: ListRenderItemInfo<string>) => {
  return (
    <ScaledImage
      src={"https://hahunavth-express-api.herokuapp.com/api/v1/cors/" + item}
    />
  );
};
