import React, {
  useEffect,
  useRef,
  useContext,
  useImperativeHandle
} from "react";
import {
  ListRenderItemInfo,
  Dimensions,
  InteractionManager,
  StyleSheet,
  FlatList as FlatListT,
  Platform,
  LayoutAnimation
} from "react-native";
import { View, Text, FlatList, HStack } from "native-base";
import { ChapterScreenProps } from "app/navigators/StackNav";
import { comicApi, useApiChapter } from "app/store/api";
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
import useUpdateCurrentChapter from "../../hooks/useUpdateCurrentChapter";
import useInteraction from "../../hooks/useInteraction";
import ChapterViewVerticalList from "./ChapterViewVerticalList";
import ChapterContextProvider, { ChapterContext } from "./ChapterContext";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { FontAwesome } from "@expo/vector-icons";
import { CommentBottomSheet, CommentLoader } from "../../components/Comment";
import { homeSelector } from "../../store/homeSlice";
import { ChapterViewHorizontalList } from "./ChapterViewHorizontalList";
import ChapterSetting from "../ChapterSettingScreen/ChapterSettingScreen";
import { navigate } from "../../navigators";
import {
  chapterActions,
  chapterSelector,
  selectChapterInfo
} from "../../store/chapterSlice";
import { resComicDetailChapterItem_T } from "../../types";

export function ChapterScreen(props: ChapterScreenProps) {
  return (
    <ChapterContextProvider>
      <ChapterScreenNode {...props} />
    </ChapterContextProvider>
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
  const { path: _path, name: _name, id: _id, preloadItem } = props.route.params;

  const dispatch = useAppDispatch();
  const comicPath = useAppSelector(homeSelector).currentComic?.path;
  const { current, setting } = useAppSelector(chapterSelector);
  const {
    id,
    name,
    path,
    updatedAt,
    updatedDistance,
    updatedVew,
    url
  }: Partial<resComicDetailChapterItem_T> = useAppSelector((state) =>
    selectChapterInfo(state)
  );

  const flatListRef = React.useRef<FlatListT>(null);

  useEffect(() => {
    dispatch(chapterActions.setCurrentChapter(_id));
    return () => {
      dispatch(chapterActions.setCurrentChapter(-1));
    };
  }, [id]);

  // const {} = props.navigation.
  // ANCHOR: ANIMATION
  const offset = useSharedValue(0);

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
  // VAr
  // const { data, isFetching } = useApiChapter(path || "_path");
  const [lazy, data, p] = comicApi.endpoints.getChapterByPath.useLazyQuery();
  // const data?.data?.data = data?.data;

  const [imgs, setImgs] = React.useState<{ uri: string; h: number }[]>([]);

  React.useEffect(() => {
    // setImmediate(async () => {
    // console.log(p.lastArg);
    const t = setTimeout(() => {
      lazy(path || "_path");
    }, 50);
    // });
    splashOffset.value = 0;
    imgs?.length &&
      flatListRef.current?.scrollToIndex({ animated: false, index: 0 });
    return () => {
      clearTimeout(t);
    };
  }, [id, path]);
  // TODO: USE LAYOUT EFFECT
  React.useEffect(() => {
    setImgs(data?.data?.data?.images.map((uri) => ({ uri, h: 0 })) || []);
  }, [data]);

  // UPDATE IMAGE LIST
  // useEffect(() => {
  //   // NOTE: Do not using if here
  //   // useEffect run when change path (navigate to new chapter)
  //   // if (!imgs.length) {
  //     setImgs(data?.data?.data?.images.map((uri) => ({ uri, h: 0 })) || [])
  //     setIsLoading(false)
  //   // }
  // }, [path])

  // NOTE: Start animation when change chapter
  // React.useEffect(() => {
  // reset
  // setImgs([]);
  // }, [path]);

  // useImperativeHandle(flatListRef, () => {
  //   return {
  //     scrollToEnd: () => {
  //       try {
  //         imgs?.length &&
  //           flatListRef.current?.scrollToIndex({ animated: false, index: 0 });
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //   };
  // });

  // useInteraction({
  //   callback: () => {
  //     setImgs(data?.data?.data?.images.map((uri) => ({ uri, h: 0 })) || []);
  //   },
  //   dependencyList: [path, data?.data?.data]
  // });

  // DISPATCH ACTION
  const { loading } = useUpdateCurrentChapter({
    chapterDetail: data?.data?.data,
    id: id,
    isFetching: false,
    callback: () => (splashOffset.value = 2)
  });

  // ref
  // const bottomSheetRef = useRef<BottomSheet>(null);
  // const settingRef = useRef<BottomSheet>(null);
  // MEMO
  // const toggleSetting = React.useCallback(() => {
  //   settingRef.current?.expand();
  // }, [settingRef]);
  const handleScroll = React.useCallback((e) => {
    // NOTE: V1: Chapter bar show related with scroll
    // const currentOffset = e.nativeEvent.contentOffset.y
    // const newScrollValue = offset.value + currentOffset - oldOffset
    // if (newScrollValue > 100) {
    //   offset.value = 100
    //   headerVisible = false
    // } else if (newScrollValue < 0) offset.value = 0
    // else offset.value = newScrollValue
    // oldOffset = currentOffset

    // NOTE: V2: Chapter bar when scroll end or tap
    const currentOffset = e.nativeEvent.contentOffset.y;
    const scrollLen = currentOffset - oldOffset;
    if (scrollLen > 6 && currentOffset > 32) {
      offset.value = 64;
      // bottomSheetRef.current?.close()
    } else if (scrollLen < -10) {
      offset.value = 0;
      // bottomSheetRef.current?.snapToIndex(0)
    }
    oldOffset = currentOffset;
  }, []);

  const toggleFloatingVisible = React.useCallback(() => {
    if (offset.value > 0) offset.value = 0;
    else offset.value = 64;
  }, [offset]);

  // const expandSheet = React.useCallback(() => {
  //   bottomSheetRef.current?.snapToIndex(0);
  // }, []);

  // useEffect(() => {
  //   bottomSheetRef.current?.close();
  // }, [ctxId]);

  // return <ComicViewHorizontaList />

  return (
    <>
      <SafeAreaView style={style.container}>
        {/* Splash */}
        <Animated.View style={splashStyles}>
          <Text style={style.splashText}>{name}</Text>
        </Animated.View>

        {/* ComicView */}
        {
          // loading ? null :
          setting.viewMode === "Vertical" ? (
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
          )
        }
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
