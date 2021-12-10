import React, { useState } from "react";
import {
  Image,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ComicProps } from "@/components/ComicListView/ComicList";
import {
  ComicDetailsNavigationProps,
  ComicDetailsScreenProps,
} from "../navigators/StackNavigator";
import { Layout, Button, List, IconProps } from "@ui-kitten/components";
import { Icon } from "@ui-kitten/components";
import { useQuery } from "react-query";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import FloatingButton from "@/components/Common/FloatingButton";
import { resComicDetail_T } from "../types/api";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";
import { QuicksandText } from "@/components/Common/QuicksandText";

const StarIcon = (props: IconProps) => (
  <Icon {...props} name="arrow-ios-back" />
);

export let endAncestor: any;
export let endNode: any;

export function ComicDetailsScreen({
  navigation,
  route: { params },
}: ComicDetailsScreenProps) {
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
    <SafeAreaView style={{}}>
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
      <Layout ref={(ref) => (endAncestor = nodeFromRef(ref))} style={{}}>
        <Layout
          style={{
            // flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            flexGrow: 1,
            // flexShrink: 1,
            // width: 100,
            height: 240,
          }}
        >
          <Layout
            style={{
              width: 240,
            }}
          >
            {/* <QuicksandText>{params.path}</Qui> */}
            <QuicksandText>{params.comic.name}</QuicksandText>
            <QuicksandText>{params.comic.author}</QuicksandText>
            <QuicksandText>{params.comic.follows}</QuicksandText>
            <QuicksandText>{params.comic.views}</QuicksandText>
            <QuicksandText>{params.comic.updateAt}</QuicksandText>
            <QuicksandText>
              {params.comic.kind && params.comic.kind[0]}
            </QuicksandText>
          </Layout>
          {/* <SharedElement onNode={(node) => (endNode = node)} > */}
          <Layout>
            <Image
              source={{ uri: params.comic.posterPath }}
              style={{ width: 96, height: 128 }}
            />
          </Layout>
          {/* </SharedElement> */}
        </Layout>
        {isLoading ? (
          <QuicksandText>Loading</QuicksandText>
        ) : (
          <ChapterList list={chapterList} />
        )}
      </Layout>
      <FloatingButton
        name={""}
        onPress={() => setSort(sort === "newer" ? "older" : "newer")}
      />
    </SafeAreaView>
  );
}

type ChapterListItem_T = {
  chapterName: string;
  chapterLink: string;
  chapterView: string;
  chapterUpdateAt: string;
};

function ChapterList({ list }: { list: ChapterListItem_T[] }) {
  const navigation = useNavigation<ComicDetailsNavigationProps>();
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
      <QuicksandText>{chapterName}</QuicksandText>
      <QuicksandText>{chapterView}</QuicksandText>
      <QuicksandText>{chapterUpdateAt}</QuicksandText>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <List data={list} renderItem={renderItem} />
    </Layout>
  );
}
