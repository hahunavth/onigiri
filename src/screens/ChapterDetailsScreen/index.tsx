import React, { useEffect, useState } from "react";
import {
  Image,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  ImageBackgroundBase,
  ImageBackground,
  Animated,
  Text,
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
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FloatingButton from "@/components/Common/FloatingButton";
import {
  ApiRespone_T,
  resComicDetailChapterItem_T,
  resComicDetail_T,
} from "../../types/api";
import {
  // SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";

import { SharedElement } from "react-navigation-shared-element";
import QuicksandText from "@/components/Common/QuicksandText";
import { LinearGradient } from "expo-linear-gradient";
import { TopTabNavioator } from "@/navigators/Main/ComicDetailsTopTabNavigator";
import { useApiComicDetail } from "../../app/api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { downloadAction, downloadSelector } from "../../app/downloadSlice";
import { homeActions, selectHome } from "../../app/homeSlice";

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

  const { data, isFetching, isLoading } = useApiComicDetail(params.path);

  const download = useAppSelector(downloadSelector);
  const dispatch = useAppDispatch();

  const home = useAppSelector(selectHome);

  useEffect(() => {
    dispatch(homeActions.setCurrentComic(data));

    return () => {
      dispatch(homeActions.removeCurrentComic());
    };
  }, [data]);

  let chapterList: any = [];
  if (!isFetching) chapterList = data?.chapters;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        ref={(ref) => (endAncestor = nodeFromRef(ref))}
        style={{ alignItems: "flex-end", backgroundColor: "#000000" }}
      >
        <SharedElement id={`${params.comic.posterUrl}`}>
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
              <SharedElement id={`comicName.${params.comic.name}`}>
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
              </SharedElement>
            </LinearGradient>
          </ImageBackground>
        </SharedElement>
      </Layout>
      <TopTabNavioator path={params.path} />
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
