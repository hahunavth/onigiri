import React, { useState } from "react";
import {
  Image,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  ImageBackgroundBase,
  ImageBackground,
} from "react-native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  ComicDetailsNavigationProps,
  ComicDetailsScreenProps,
} from "../../navigators/StackNavigator";
import { Layout, Button, List, IconProps } from "@ui-kitten/components";
import { Icon } from "@ui-kitten/components";
import { useQuery } from "react-query";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import FloatingButton from "@/components/Common/FloatingButton";
import {
  ApiRespone_T,
  resComicDetailChapterItem_T,
  resComicDetail_T,
} from "../../types/api";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";
import { QuicksandText } from "@/components/Common/QuicksandText";
import { LinearGradient } from "expo-linear-gradient";
import { TopTabNavioator } from "@/navigator/Main/ComicDetailsTopTabNavigator";

const StarIcon = (props: IconProps) => (
  <Icon {...props} name="arrow-ios-back" />
);

export let endAncestor: any;
export let endNode: any;

const { width, height } = Dimensions.get("window");

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
  if (isFetched) chapterList = data?.chapters;
  console.log(data?.chapters);

  // let chapterList: any = [];
  // if (isFetched) {
  //   chapterList =
  //     (data &&
  //       data.chapters.map((chapter, id) => ({
  //         chapterName:
  //           data.chapters[
  //             sort === "newer" ? id : data.chapters.length - id - 1
  //           ],
  //         chapterLink:
  //           data.chapterLinks[
  //             sort === "newer" ? id : data.chapters.length - id - 1
  //           ],
  //         chapterView:
  //           data.chapterViews[
  //             sort === "newer" ? id : data.chapters.length - id - 1
  //           ],
  //         chapterUpdateAt:
  //           data.chapterUpdateAt[
  //             sort === "newer" ? id : data.chapters.length - id - 1
  //           ],
  //       }))) ||
  //     [];
  // }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "flex-end", backgroundColor: "#000000" }}>
        <ImageBackground
          source={{ uri: params.comic.posterUrl }}
          resizeMode="cover"
          style={{
            width: width / 1,
            height: height / 3.2,
          }}
        >
          <LinearGradient
            colors={["#000000d8", "#00000042", "#77777747"]}
            start={{ x: 0, y: 1.1 }}
            end={{ x: 0, y: 0 }}
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <QuicksandText
              style={{
                fontFamily: "Quicksand_600SemiBold",
                fontSize: 20,
                color: "#ffffffa6",
                marginVertical: 10,
                marginHorizontal: 20,
              }}
              numberOfLines={2}
            >
              {params.comic.name}
            </QuicksandText>
          </LinearGradient>
        </ImageBackground>
      </View>
      <TopTabNavioator {...params.comic.chapters} />
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={{}}>
      <ImageBackground
        source={{ uri: params.comic.posterUrl }}
        style={{ width: width, height: height / 3 }}
      >
        <Layout>
          <Button
            // style={styles.button}
            appearance="ghost"
            accessoryLeft={StarIcon}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </Layout>
        <Layout
          ref={(ref) => (endAncestor = nodeFromRef(ref))}
          style={{
            opacity: 0.4,
          }}
        >
          <Layout>
            <Layout
              style={{
                width: 240,
                opacity: 0.4,
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
            <Layout></Layout>
            {/* </SharedElement> */}
          </Layout>

          {isLoading ? (
            <QuicksandText>Loading</QuicksandText>
          ) : (
            <ChapterList list={chapterList as resComicDetailChapterItem_T[]} />
          )}
        </Layout>
      </ImageBackground>
      <FloatingButton
        name={""}
        onPress={() => setSort(sort === "newer" ? "older" : "newer")}
      />
    </SafeAreaView>
  );
}

function ChapterList({ list }: { list: resComicDetailChapterItem_T[] }) {
  const navigation = useNavigation<ComicDetailsNavigationProps>();
  // navigation.navigate("Main", { screen: "home" });
  const renderItem = ({
    item: { url, name, updatedAt, updatedVew },
  }: ListRenderItemInfo<resComicDetailChapterItem_T>) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Chapter", {
          // TODO: rEPLACE WITH GENERIC
          path: url.replace("http://www.nettruyengo.com/", ""),
        })
      }
    >
      <QuicksandText>{name}</QuicksandText>
      <QuicksandText>{updatedVew}</QuicksandText>
      <QuicksandText>{updatedAt}</QuicksandText>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <List data={list} renderItem={renderItem} />
    </Layout>
  );
}
