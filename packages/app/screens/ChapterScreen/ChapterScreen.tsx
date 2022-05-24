import React, { useLayoutEffect } from "react";
import { Dimensions, StyleSheet, FlatList as FlatListT } from "react-native";
import { View, Text } from "native-base";
import { ChapterScreenProps } from "app/navigators/StackNav";
import { comicApi } from "app/store/api";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import ChapterBar from "./ChapterBar";
import ChapterHeader from "./ChapterHeader";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import useUpdateCurrentChapter from "app/hooks/useUpdateCurrentChapter";
import useInteraction from "app/hooks/useInteraction";
import ChapterViewVerticalList from "./ChapterViewVerticalList";
import { homeSelector } from "app/store/homeSlice";
import { ChapterViewHorizontalList } from "./ChapterViewHorizontalList";
import { navigate } from "app/navigators";
import {
  chapterActions,
  chapterSelector,
  selectChapterInfo
} from "app/store/chapterSlice";
import { resComicDetailChapterItem_T } from "app/types";
import TFastImage from "app/components/Typo/TFastImage";
// import * as Sentry from "@sentry/react-native";

const OFFSET_MAX = 64;
const ZERO = 0;

export function ChapterScreen(props: ChapterScreenProps) {
  // Sentry.useProfiler("ChapterScreen");

  return (
    // <ChapterContextProvider>
    <ChapterScreenNode {...props} />
    // </ChapterContextProvider>
  );
}

let oldOffset = 0;
const screenHeight = Dimensions.get("screen").height;

function ChapterScreenNode(props: ChapterScreenProps) {
  // const {
  //   ctxId,
  //   ctxName,
  //   ctxPath,
  //   setCtxId,
  //   setCtxName,
  //   setCtxPath,
  //   viewStatus
  // } = useContext(ChapterContext);
  // NOTE: INITIAL
  const {
    path,
    // : _path
    name,
    // : _name
    id,
    // : _id
    preloadItem
  } = props.route.params;

  const dispatch = useAppDispatch();
  const comicPath = useAppSelector(homeSelector).currentComic?.path;
  const { current, setting } = useAppSelector(chapterSelector);
  const {
    // id,
    // name,
    // path,
    updatedAt,
    updatedDistance,
    updatedVew,
    url
  }: Partial<resComicDetailChapterItem_T> = useAppSelector((state) =>
    selectChapterInfo(state)
  );

  const flatListRef = React.useRef<FlatListT>(null);

  useLayoutEffect(() => {
    dispatch(chapterActions.setCurrentChapter(id));
    return () => {
      dispatch(chapterActions.setCurrentChapter(-1));
    };
  }, [id]);

  // ANCHOR: ANIMATION
  const offset = useSharedValue(ZERO);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(offset.value, {
            duration: 200,
            easing: Easing.in(Easing.linear)
          })
        }
      ]
    };
  });

  const headerAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: 1 - offset.value / 100,
      transform: [
        {
          translateY: withTiming(-offset.value * 2, {
            duration: 100,
            easing: Easing.in(Easing.linear)
          })
        }
      ]
    };
  });
  const splashOffset = useSharedValue(0);
  const splashStyles = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
      backgroundColor: "white",
      opacity: withTiming(1 - splashOffset.value / 2, {
        duration: 800,
        easing: Easing.inOut(Easing.sin)
      }),
      transform: [
        {
          translateY: withTiming(-splashOffset.value * screenHeight, {
            duration: 800,
            easing: Easing.in(Easing.exp)
          })
        }
      ]
    };
  });

  // ANCHOR: DATA LOGIC
  const [lazy, data, p] = comicApi.endpoints.getChapterByPath.useLazyQuery();
  console.log("renderer chapter screen");
  const [imgs, setImgs] = React.useState<{ uri: string; h: number }[]>([]);

  React.useLayoutEffect(() => {
    splashOffset.value = ZERO;
  }, [id, path]);

  const { loading: loading2 } = useInteraction({
    callback: () => {
      lazy(path || "_path");
    },
    dependencyList: [id, path]
  });
  // TODO: USE LAYOUT EFFECT
  React.useLayoutEffect(() => {
    // clear cache before fetch new chapter
    (async () => {
      // console.log("async");
      // await TFastImage?.clearDiskCache();
      // await TFastImage?.clearMemoryCache();

      // NOTE: PRELOAD IMAGE CAUSE CRASH
      // if (data?.data?.data) {
      // await TFastImage.preload(
      //   data?.data?.data.images.slice(5).map((url: string) => url)
      // );
      // }

      setImgs(
        data?.data?.data?.images.map((uri: string) => ({ uri, h: 0 })) || []
      );
    })();
  }, [data]);

  // DISPATCH ACTION
  const { loading } = useUpdateCurrentChapter({
    chapterDetail: data?.data?.data,
    id: id,
    isFetching: false,
    callback: () => {
      imgs?.length &&
        flatListRef.current?.scrollToIndex({
          animated: false,
          index: 0,
          viewPosition: 0
        });
      splashOffset.value = 2;
    }
  });

  const handleScroll = React.useCallback((e) => {
    // NOTE: V2: Chapter bar when scroll end or tap
    const currentOffset = e.nativeEvent.contentOffset.y;
    const scrollLen = currentOffset - oldOffset;
    if (scrollLen > 6 && currentOffset > 32) {
      offset.value = OFFSET_MAX;
      // bottomSheetRef.current?.close()
    } else if (scrollLen < -10) {
      offset.value = ZERO;
      // bottomSheetRef.current?.snapToIndex(0)
    }
    oldOffset = currentOffset;
  }, []);

  const toggleFloatingVisible = React.useCallback(() => {
    if (offset.value > 0) offset.value = ZERO;
    else offset.value = OFFSET_MAX;
  }, [offset]);

  return (
    <>
      <SafeAreaView style={style.container}>
        {/* Splash */}
        <Animated.View style={splashStyles}>
          <Text style={style.splashText}>{name}</Text>
        </Animated.View>

        {/* ComicView */}
        {loading ? null : setting.viewMode === "Vertical" ? (
          <View style={style.container}>
            <ChapterViewVerticalList
              ref={flatListRef as any}
              handleScroll={handleScroll}
              imgs={imgs}
              imgList={data?.data?.data?.chapterList || []}
              setImgs={setImgs}
              // onEndReach={expandSheet}
            />
          </View>
        ) : (
          <ChapterViewHorizontalList
            ref={flatListRef as any}
            handleScroll={handleScroll}
            imgs={imgs}
            imgList={data?.data?.data?.chapterList || []}
            setImgs={setImgs}
            // onEndReach={expandSheet}
            toggleFloatingVisible={toggleFloatingVisible}
          />
        )}
      </SafeAreaView>

      {/* Floating */}
      <ChapterHeader style={headerAnimatedStyles} name={name} />
      <ChapterBar
        style={animatedStyles}
        onCommentClick={() => navigate("comment", { path: comicPath || "a" })}
        //  onCommentClick={expandSheet}
      />
      {/* FIXME: NOT SUPPORT FOR WEB */}
    </>
  );
}

const style = StyleSheet.create({
  splashText: {
    fontSize: 24,
    color: "black"
  },
  container: { flex: 1 },
  textInput: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "grey",
    color: "white",
    textAlign: "center"
  }
});
