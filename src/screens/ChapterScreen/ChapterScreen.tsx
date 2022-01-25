import {
  Card,
  Layout,
  List,
  ListItemProps,
  Modal,
  Spinner,
} from "@ui-kitten/components";
import React, { useEffect, useRef } from "react";
import {
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
  withDelay,
} from "react-native-reanimated";
import { historyAction, historySelector } from "@/app/historySlice";
import QuicksandText, { QFontFamily } from "@/components/Common/QuicksandText";
import FadeInView from "@/components/Common/FadeInView";
import SessionHeader from "@/components/Common/SessionHeader";
import NavigatorHeader from "@/components/Common/NavigatorHeader";
import { SafeAreaView } from "react-native-safe-area-context";

let oldOffset = 0;
let headerVisible = true;

const screenHeight = Dimensions.get("screen").height;

const AnimatedLayout = Animated.createAnimatedComponent(Layout);

export function ChapterScreen({
  route: {
    params: { path, id, name },
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
            duration: 100,
            easing: Easing.out(Easing.exp),
          }),
        },
      ],
    };
  });

  const headerAnimatedStyles = useAnimatedStyle(() => {
    return {
      // top: offset.value,
      transform: [
        {
          // offset.value,
          translateY: withTiming(-offset.value, {
            duration: 100,
            easing: Easing.out(Easing.exp),
          }),
        },
      ],
    };
  });

  const splashOffset = useSharedValue(0);

  const splashStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1 - splashOffset.value / 2, {
        duration: 800,
        easing: Easing.inOut(Easing.sin),
      }),
      transform: [
        {
          translateY: withTiming(-splashOffset.value * screenHeight, {
            duration: 800,
            easing: Easing.in(Easing.exp),
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
        // console.log(home.currentComic);
        splashOffset.value = 1;
      }
    }
    return () => {
      dispatch(homeActions.removeCurrentChapter());
    };
  }, [isFetching, data]);

  if (isFetching || !data)
    return (
      <Layout
        style={[
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "red",
          },
          // splashStyles,
        ]}
      >
        <QuicksandText
          style={{
            fontSize: 18,
            zIndex: 100,
            fontFamily: QFontFamily.Quicksand_600SemiBold,
          }}
        >
          Loading...
        </QuicksandText>
        <QuicksandText
          style={{
            fontSize: 24,
            fontFamily: QFontFamily.Quicksand_600SemiBold,
          }}
        >
          {name}
        </QuicksandText>
        <Spinner size={"giant"} />
      </Layout>
    );

  return (
    <>
      {/* {!isFetching && data && ( */}
      <Layout style={{ flex: 1 }}>
        <AnimatedLayout
          style={[
            {
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
              // backgroundColor: "red",
            },
            splashStyles,
          ]}
          level={"2"}
        >
          {/* <QuicksandText
            style={{
              fontSize: 18,
              zIndex: 100,
              fontFamily: QFontFamily.Quicksand_600SemiBold,
            }}
          >
            Loading...
          </QuicksandText> */}
          <QuicksandText
            style={{
              fontSize: 24,
              fontFamily: QFontFamily.Quicksand_600SemiBold,
              color: "white",
            }}
          >
            {name}
          </QuicksandText>
          {/* <Spinner /> */}
        </AnimatedLayout>
        <SafeAreaView style={{ flex: 1 }}>
          <Layout style={{ flex: 1 }}>
            {/* <BlurHeader /> */}

            <List
              data={chapterInfo?.images || []}
              renderItem={renderItem}
              initialNumToRender={3}
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
        </SafeAreaView>
        <NavigatorHeader
          title="Chapter"
          headerContainerStyle={headerAnimatedStyles}
        />
        <ChapterBar style={animatedStyles} />
      </Layout>
      {/* )} */}
    </>
  );
}

const renderItem = ({ item }: ListRenderItemInfo<string>) => {
  return (
    <ScaledImage
      src={"https://hahunavth-express-api.herokuapp.com/api/v1/cors/" + item}
    />
  );
};
