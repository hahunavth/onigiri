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

import { useApiRecently } from "@/app/api";
import QuicksandText, { QFontFamily } from "@/components/Common/QuicksandText";

// import { fox, cat, background, element, lion } from "./images";
import { CustomPagination } from "./CustomPagination";
import FlatlistBannerItem from "./FlatlistBannerItem";
import { LinearGradient } from "expo-linear-gradient";

// Shared Element
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "@react-navigation/native";
import { MainNavigationProps } from "@/navigators/StackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export const FlatlistBanner = () => {
  const [list, setList] = useState<resComicItem_T[]>([]);

  const { data, isError, isFetching, isSuccess, error } = useApiRecently("1", {
    selectFromResult: (result) => result,
  });

  useEffect(() => {
    if (isSuccess) setList(() => data?.data.filter((item, id) => id < 6));
  }, [isFetching]);

  return (
    <View>
      <SwiperFlatList
        autoplay
        autoplayDelay={25}
        // index={3}
        autoplayLoop
        // autoplayInvertDirection
        data={isSuccess ? list : []}
        renderItem={(props) => <Item {...props} />}
        showPagination
        initialNumToRender={1}
        PaginationComponent={CustomPagination}

        // horizontal
      />
    </View>
  );
};

const Item = React.memo(({ item }: ListRenderItemInfo<resComicItem_T>) => {
  const navigation = useNavigation<MainNavigationProps>();

  return (
    <TouchableOpacity
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
              <View style={{ marginBottom: 10 }}>
                <QuicksandText style={{ color: "white" }}>
                  {item?.lastedChapters && item?.lastedChapters[0].chapterName}
                </QuicksandText>
                <QuicksandText style={{ color: "white" }}>
                  {item?.lastedChapters &&
                    item?.lastedChapters[0].updatedDistance}
                </QuicksandText>
              </View>
            </View>
            <SharedElement id={`${item.posterUrl}`}>
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
