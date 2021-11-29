import React, { useState } from "react";
import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ComicProps } from "@/components/ComicListView/ComicList";
import {
  ComicListNavigationProps,
  ComicListScreenProps,
} from "../navigators/StackNavigator";
import { Layout, Button, List, IconProps } from "@ui-kitten/components";
import { Icon } from "@ui-kitten/components";
import { useQuery } from "react-query";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import FloatingButton from "@/components/FloatingButton";
import { resComicDetail_T } from "../types/api";

const StarIcon = (props: IconProps) => (
  <Icon {...props} name="arrow-ios-back" />
);

export function ComicDetailsScreen({
  navigation,
  route: { params },
}: ComicListScreenProps) {
  const [sort, setSort] = useState<"newer" | "older">("newer");

  const { data, isFetched, isLoading } = useQuery<resComicDetail_T>(
    ["details", params.path],
    () =>
      fetch(
        "https://hahunavth-express-api.herokuapp.com/api/v1/" + params.path
      ).then((res) => res.json())
  );

  let chapterList: any = [];
  if (isFetched) {
    chapterList =
      (data &&
        data.chapters.map((chapter, id) => ({
          chapterName:
            data.chapters[
              sort === "newer" ? id : data.chapters.length - id - 1
            ],
          chapterLink:
            data.chapterLinks[
              sort === "newer" ? id : data.chapters.length - id - 1
            ],
          chapterView:
            data.chapterViews[
              sort === "newer" ? id : data.chapters.length - id - 1
            ],
          chapterUpdateAt:
            data.chapterUpdateAt[
              sort === "newer" ? id : data.chapters.length - id - 1
            ],
        }))) ||
      [];
  }

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ justifyContent: "flex-start", width: 60, height: 60 }}>
        <Button
          // style={styles.button}
          appearance="ghost"
          accessoryLeft={StarIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Layout>
      <Layout>
        <Image
          source={{ uri: params.comic.posterPath }}
          style={{ width: 96, height: 128 }}
        />
        <Layout>
          <Text>Details Screen</Text>
          <Text>{params.path}</Text>
          <Text>{params.comic.name}</Text>
          <Text>{params.comic.author}</Text>
          <Text>{params.comic.follows}</Text>
          <Text>{params.comic.views}</Text>
          <Text>{params.comic.updateAt}</Text>
        </Layout>
        {isLoading ? <Text>Loading</Text> : <ChapterList list={chapterList} />}
      </Layout>
      <FloatingButton
        name={""}
        onPress={() => setSort(sort === "newer" ? "older" : "newer")}
      />
    </Layout>
  );
}

type ChapterListItem_T = {
  chapterName: string;
  chapterLink: string;
  chapterView: string;
  chapterUpdateAt: string;
};

function ChapterList({ list }: { list: ChapterListItem_T[] }) {
  const navigation = useNavigation<ComicListNavigationProps>();
  // navigation.navigate("Main", { screen: "home" });
  const renderItem = ({
    item: { chapterLink, chapterName, chapterUpdateAt, chapterView },
  }: ListRenderItemInfo<ChapterListItem_T>) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Chapter", {
          path: chapterLink.replace("http://www.nettruyenpro.com/", ""),
        })
      }
    >
      <Text>{chapterName}</Text>
      <Text>{chapterView}</Text>
      <Text>{chapterUpdateAt}</Text>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <List data={list} renderItem={renderItem} />
    </Layout>
  );
}
