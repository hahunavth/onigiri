import { Layout, List, ListItemProps } from "@ui-kitten/components";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ListRenderItemInfo,
  Dimensions,
} from "react-native";
import { useQuery } from "react-query";
import { ChapterScreenProps } from "../navigators/StackNavigator";
import ImageSize from "react-native-image-size";
import ScaledImage from "../components/ComicListView/ScaledImage";
import { useApiChapter } from "../app/api";

export default function ChapterScreen({
  route: { params: path },
}: ChapterScreenProps) {
  const { data, isLoading, isFetching } = useApiChapter(path.path);

  console.log(data);
  const chapterInfo = data?.data;

  if (isFetching)
    return (
      <Layout>
        <Text>Loading</Text>
      </Layout>
    );

  return (
    <Layout style={{ flex: 1 }}>
      <Layout>
        <Text>aa</Text>
      </Layout>
      <Layout style={{ flex: 1 }}>
        <List data={chapterInfo?.images || []} renderItem={renderItem} />
      </Layout>
    </Layout>
  );
}

const renderItem = ({ item }: ListRenderItemInfo<string>) => {
  let ratio = 0;

  const windowWidth = Dimensions.get("window").width;
  // const windowHeight = Dimensions.get("window").height;

  return (
    <ScaledImage
      src={"https://hahunavth-express-api.herokuapp.com/api/v1/cors/" + item}
    />
  );
};
