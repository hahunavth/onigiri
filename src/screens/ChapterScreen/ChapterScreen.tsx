import { Layout, List, ListItemProps } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ListRenderItemInfo,
  Dimensions,
  Button,
  ActivityIndicator,
} from "react-native";
import ImageSize from "react-native-image-size";

import { ChapterScreenProps } from "@/navigators/StackNavigator";
import ScaledImage from "@/components/ComicListView/ScaledImage";
import { useApiChapter } from "@/app/api";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { downloadAction, downloadSelector } from "@/app/downloadSlice";
import { homeActions } from "@/app/homeSlice";

import { BlurView } from "expo-blur";
import BlurHeader from "@/components/Header/BlurHeader";
// import {} from "@/types";

export function ChapterScreen({ route: { params: path } }: ChapterScreenProps) {
  const { data, isLoading, isFetching } = useApiChapter(path.path);

  const dispatch = useAppDispatch();

  const chapterInfo = data?.data;

  useEffect(() => {
    if (!isFetching) {
      dispatch(homeActions.setCurrentChapter(data?.data));
    }
    return () => {
      dispatch(homeActions.removeCurrentChapter());
    };
  }, [isFetching, data]);

  if (isFetching)
    return (
      <Layout>
        <Text>Loading</Text>
      </Layout>
    );

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        {/* <BlurHeader /> */}
        <List data={chapterInfo?.images || []} renderItem={renderItem} />
      </Layout>
    </Layout>
  );
}

const windowWidth = Dimensions.get("window").width;

const renderItem = ({ item }: ListRenderItemInfo<string>) => {
  let ratio = 0;

  return (
    <ScaledImage
      src={"https://hahunavth-express-api.herokuapp.com/api/v1/cors/" + item}
    />
  );
};
