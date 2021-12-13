import { resComicDetail_T, resComicItem_T } from "@/types/api";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import { BlurView } from "expo-blur";

import { useApiRecently } from "../../app/api";
import QuicksandText, { QFontFamily } from "../Common/QuicksandText";

// import { fox, cat, background, element, lion } from "./images";
import { CustomPagination } from "./CustomPagination";
import FlatlistBannerItem from "./FlatlistBannerItem";
import { LinearGradient } from "expo-linear-gradient";

// Shared Element
import {
  // SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "@react-navigation/native";
import { MainNavigationProps } from "@/navigator/StackNavigator";
import {
  ComicDetailsScreen,
  endAncestor,
  endNode,
} from "@/screens/ChapterDetailsScreen";

export let startAncestor: any;
export let startNode: any;

const { width, height } = Dimensions.get("window");

const newImage = ["lion", "fox", "cat", "background", "element"];
const image = (index: number) => ({ image: newImage[index % newImage.length] });

const items = Array.from(Array(5)).map((_, index) => image(index));

export default () => {
  const [list, setList] = useState<resComicItem_T[]>([]);

  const { data, isError, isFetching, isSuccess, refetch, error } =
    useApiRecently("1");

  useEffect(() => {
    if (isSuccess) setList(() => data?.data.filter((item, id) => id < 36));
    console.log("rerendre");
  }, [isFetching]);

  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={5}
      // index={3}
      autoplayLoop
      // autoplayInvertDirection
      data={isSuccess ? list : []}
      renderItem={(props) => <Item {...props} />}
      // showPagination
      initialNumToRender={1}
      // PaginationComponent={CustomPagination}
      // horizontal
    />
  );
};

const Item = React.memo(({ item }: ListRenderItemInfo<resComicItem_T>) => {
  // const imgRef = useRef(null);

  const navigation = useNavigation<MainNavigationProps>();

  useEffect(() => {
    console.log("render");
    return () => console.log("unmount");
  });

  return (
    <TouchableOpacity
      ref={(ref) => (startAncestor = nodeFromRef(ref))}
      onPress={() =>
        navigation.navigate("ComicDetails", {
          comic: item,
          path: item.path || "",
        })
      }
      activeOpacity={0.8}
    >
      {/* <Image style={styles.image} source={{ uri: item.posterUrl }} /> */}
      <ImageBackground
        source={{ uri: item.posterUrl }}
        style={{
          width: width - 10,
          height: height / 4,
          margin: 5,
        }}
        // imageRef={imgRef || null}
        blurRadius={8}
        borderRadius={8}
        progressiveRenderingEnabled
        fadeDuration={500}
      >
        <LinearGradient
          colors={["#0000009d", "#0000004c", "#ffffffb7"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: width,
            height: height / 4,
            borderRadius: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // backgroundColor: "#42424237",
            }}
          >
            <View
              style={{
                width: width / 2,
                justifyContent: "space-between",
                margin: 15,
              }}
            >
              <QuicksandText
                style={{
                  color: "white",
                  fontFamily: QFontFamily.Quicksand_600SemiBold,
                  fontSize: 15,
                }}
                numberOfLines={2}
              >
                {item?.name}
              </QuicksandText>
              <View>
                <QuicksandText style={{ color: "white" }}>
                  {item?.lastedChapters && item?.lastedChapters[0].chapterName}
                </QuicksandText>
                <QuicksandText style={{ color: "white" }}>
                  {item?.lastedChapters &&
                    item?.lastedChapters[0].updatedDistance}
                </QuicksandText>
              </View>
            </View>
            <SharedElement id={`poster.${item.posterUrl}`}>
              <Image
                // ref={imgRef}
                style={styles.image}
                source={{ uri: item.posterUrl }}
              />
            </SharedElement>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  image: {
    height: height / 4 - 20,
    width: width / 3,
    marginVertical: 10,
    marginRight: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#636363",
  },
});

ComicDetailsScreen.sharedElements = (
  navigation: ReturnType<typeof useNavigation>
) => {
  // const item = navigation.getParam("ComicDetails");
  // console.log(navigation.route.params.comic.posterUrl);
  return [
    `${navigation.route.params.comic.posterUrl}`,
    `comicName.${navigation.route.params.name}`,
  ];
};