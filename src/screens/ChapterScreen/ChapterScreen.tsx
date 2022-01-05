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
import { homeActions } from "@/app/homeSlice";

// import { BlurView } from "expo-blur";
import BlurHeader from "@/components/Header/BlurHeader";
import ChapterBar from "./ChapterBar";
// import {} from "@/types";

export function ChapterScreen({
  route: {
    params: { path, id },
  },
}: ChapterScreenProps) {
  const { data, isLoading, isFetching } = useApiChapter(path);
  const dispatch = useAppDispatch();
  console.log("rencer chapter screen");

  const chapterInfo = data?.data;

  useEffect(() => {
    if (!isFetching && data) {
      dispatch(homeActions.setCurrentChapter({ ...data?.data, id: id }));
    }
    return () => {
      dispatch(homeActions.removeCurrentChapter());
    };
  }, [isFetching, data]);

  console.log("rencer chapter screen 2");

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
        />
      </Layout>
      <ChapterBar />
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
