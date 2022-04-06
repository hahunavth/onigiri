// Lib
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  FlatListProps,
  StyleProp,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  ViewProps,
  ViewStyle,
  InteractionManager
} from "react-native";
import { Button, View, Text, Badge, usePlatformProps } from "native-base";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  interpolateColor,
  withTiming,
  withDecay,
  withDelay
} from "react-native-reanimated";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import {
  useSafeAreaInsets,
  SafeAreaView
} from "react-native-safe-area-context";
import { useAppSafeAreaInsets } from "app/provider/safe-area/use-safe-area";
// App
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { goBack, navigate } from "app/navigators";
import {
  historySelector,
  selectDownloadedChapters,
  selectLastedReadChapterPath,
  selectReadChapters,
  selectThisComicIsSubscribed,
  toggleSubscribeComicThunk
} from "app/store/historySlice";
import { useColorModeStyle } from "app/hooks/useColorModeStyle";
// Local
import Header, { HeaderConfig, Visibility } from "./Header";
import HeaderOverlay from "./HeaderOverlay";
import { ScrollPair } from "./ScrollPair";
import useScrollSync from "./useScrollSync";
import { ChapterList } from "../ChapterList";
import TabBar from "./TabBar";
import DetailList from "./DetailList";
// Type
import type {
  resComicDetailChapterItem_T,
  resComicDetail_T,
  resComicItem_T
} from "app/types";
import useInteraction from "app/hooks/useInteraction";
import usePrevious from "react-use/esm/usePrevious";
import ComicDetailBottomBar, { styles } from "./ComicDetailBottomBar";
import CollapseTab from "./CollapseTab";
import CollapseTop from "./CollapseTop";

type Props = {
  comic?: resComicDetail_T;
  routeParam?: resComicItem_T;
  offline?: boolean;
};

// Constant
const TAB_BAR_HEIGHT = 48;
const HEADER_HEIGHT = 48;
const OVERLAY_VISIBILITY_OFFSET = 32;

// const getItemLayout = (data, index) => (
//   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
// );

export const CollapseHeader = (props: Props) => {
  // STORE
  const downloadCpt = useAppSelector(selectDownloadedChapters);

  // const subscribed = !!useAppSelector(historySelector).subscribeComics.find(
  //   (path) => path === props.comic?.path
  // )

  const prev = usePrevious(props);
  // console.log('CollapseHeader', props === prev)

  // Get safe area
  const { top, bottom } = useAppSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const friendsRef = useRef<FlatList>(null);
  const suggestionsRef = useRef<FlatList>(null);

  const [tabIndex, setTabIndex] = useState(0);

  const [headerHeight, setHeaderHeight] = useState(0);
  const defaultHeaderHeight = top + HEADER_HEIGHT;

  const headerConfig = useMemo<HeaderConfig>(
    () => ({
      heightCollapsed: defaultHeaderHeight,
      heightExpanded: headerHeight
    }),
    [defaultHeaderHeight, headerHeight]
  );

  const { heightCollapsed, heightExpanded } = headerConfig;

  const headerDiff = heightExpanded - heightCollapsed;
  const rendered = headerHeight > 0;

  const handleHeaderLayout = useCallback<NonNullable<ViewProps["onLayout"]>>(
    (event) => setHeaderHeight(event.nativeEvent.layout.height),
    []
  );

  const friendsScrollValue = useSharedValue(0);
  const friendsScrollHandler = useAnimatedScrollHandler(
    (event) => (friendsScrollValue.value = event.contentOffset.y)
  );

  const suggestionsScrollValue = useSharedValue(0);
  const suggestionsScrollHandler = useAnimatedScrollHandler(
    (event) => (suggestionsScrollValue.value = event.contentOffset.y)
  );

  const scrollPairs = useMemo<ScrollPair[]>(
    () => [
      { list: friendsRef, position: friendsScrollValue },
      { list: suggestionsRef, position: suggestionsScrollValue }
    ],
    [friendsRef, friendsScrollValue, suggestionsRef, suggestionsScrollValue]
  );

  // const { sync } = useScrollSync(scrollPairs, headerConfig)
  const { sync } = useScrollSync(scrollPairs, headerDiff);

  const currentScrollValue = useDerivedValue(
    () =>
      tabIndex === 0 ? friendsScrollValue.value : suggestionsScrollValue.value,
    [tabIndex, friendsScrollValue, suggestionsScrollValue]
  );

  const translateY = useDerivedValue(
    () => -Math.min(currentScrollValue.value, headerDiff)
  );

  // NOTE: Set position for poster before animation
  // -> Fix shared animation transition
  const [predefinePosterImage, setPredefinePosterImage] = React.useState(0);
  React.useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() =>
      setPredefinePosterImage(1)
    );
    return () => {
      interaction.cancel();
    };
  }, []);
  const newTranslateY = useDerivedValue(() => {
    return predefinePosterImage && translateY.value;
  });
  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: newTranslateY.value }]
  }));
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: newTranslateY.value }],
    opacity: interpolate(
      translateY.value,
      [-headerDiff, 0],
      [Visibility.Hidden, Visibility.Visible]
    )
  }));

  // header icon color transform
  // const backgroundColor = useDerivedValue(() =>
  //   mixColor(translateY.value/headerDiff, "#ff3884", "#38ffb3")
  // );

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: rendered ? headerHeight + TAB_BAR_HEIGHT : 0,
      paddingBottom: bottom,
      minHeight: screenHeight + headerDiff
    }),
    [rendered, headerHeight, bottom, screenHeight, headerDiff]
  );

  const sharedProps = useMemo<
    Partial<FlatListProps<resComicDetailChapterItem_T>>
  >(
    () => ({
      contentContainerStyle,
      onMomentumScrollEnd: sync,
      onScrollEndDrag: sync,
      scrollEventThrottle: 16,
      scrollIndicatorInsets: { top: heightExpanded }
    }),
    [contentContainerStyle, sync, heightExpanded]
  );

  const downloadedChapterList = useMemo(() => {
    return props.offline
      ? props.comic?.chapters.filter((item) => !!downloadCpt[item.path])
      : props.comic?.chapters;
  }, [props.comic, props.offline]);

  // const detailData = useMemo(() => {
  //   return props.comic ? [props.comic] : []
  // }, [props.comic])

  // NOTE: Render List
  const renderFriends = useCallback(
    () => (
      <DetailList
        ref={friendsRef}
        // @ts-ignore
        data={props.comic ? [props.comic] : []}
        onScroll={friendsScrollHandler}
        // Performance settings
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={10} // Reduce initial render amount
        maxToRenderPerBatch={5} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        windowSize={10} // Reduce the window size
        showsVerticalScrollIndicator={false}
        {...sharedProps}
      />
    ),
    [friendsRef, friendsScrollHandler, sharedProps, props.comic]
  );

  const renderSuggestions = useCallback(
    () => (
      <ChapterList
        ref={suggestionsRef}
        data={downloadedChapterList}
        onScroll={suggestionsScrollHandler}
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={10}
        offline={props.offline}
        {...sharedProps}
      />
    ),
    [
      suggestionsRef,
      suggestionsScrollHandler,
      downloadedChapterList,
      sharedProps
    ]
  );

  const tabBarStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      rendered ? styles.tabBarContainer : undefined,
      { top: rendered ? headerHeight : undefined },
      tabBarAnimatedStyle
    ],
    [rendered, headerHeight, tabBarAnimatedStyle]
  );

  const renderTabBar = useCallback<
    (props: MaterialTopTabBarProps) => React.ReactElement
  >(
    (props) => (
      <Animated.View style={tabBarStyle}>
        <TabBar onIndexChange={setTabIndex} {...props} />
      </Animated.View>
    ),
    [tabBarStyle]
  );

  const headerContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.headerContainer, headerAnimatedStyle],
    [rendered, top, headerAnimatedStyle]
  );

  const collapsedOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      newTranslateY.value,
      [-headerDiff, OVERLAY_VISIBILITY_OFFSET - headerDiff, 0],
      [Visibility.Visible, Visibility.Hidden, Visibility.Hidden]
    )
  }));

  const collapsedOverlayStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.collapsedOverlay,
      collapsedOverlayAnimatedStyle,
      { height: heightCollapsed, paddingTop: top }
    ],
    [collapsedOverlayAnimatedStyle, heightCollapsed, top]
  );

  const offset = useSharedValue(0);

  const opacityStyle2 = useAnimatedStyle(() => {
    return {
      flex: 1,
      opacity: withDelay(
        200,
        withTiming(offset.value, {
          duration: 1000
        })
      )
      // transform: [
      //   {
      //     translateY: withTiming((1 - offset.value) * 100, {
      //       duration: 1000
      //     })
      //   }
      // ]
    };
  });

  const { loading } = useInteraction({
    callback: () => {
      offset.value = 1;
    }
  });

  return (
    <View style={styles.wrapperContainer}>
      <View style={styles.container}>
        {/* Custom Header Icon */}
        {/* {loading || ( */}
        <CollapseTop
          comic={props.comic}
          headerDiff={headerDiff}
          offline={props.offline}
          translateY={translateY}
        />
        {/* )} */}
        <Animated.View
          onLayout={handleHeaderLayout}
          style={headerContainerStyle}
        >
          <Header
            name={props.routeParam?.name || props.comic?.title || ""}
            bio={"Loading..."}
            rating={props.comic?.rate}
            photo={props.routeParam?.posterUrl || props.comic?.posterUrl || ""}
          />
        </Animated.View>
        {/* {loading ? null : ( */}
        <Animated.View style={collapsedOverlayStyle}>
          <HeaderOverlay
            name={props.comic?.title || ""}
            numChapter={props.comic?.chapters?.length || 0}
          />
        </Animated.View>
        {/* // )} */}
        {loading ? null : (
          <>
            <Animated.View style={opacityStyle2}>
              <CollapseTab
                renderFriends={renderFriends}
                renderSuggestions={renderSuggestions}
                renderTabBar={renderTabBar}
              />
            </Animated.View>

            <ComicDetailBottomBar
              comic={props.comic}
              path={props.comic?.path || ""}
              // handleReadNowClick={handleReadNowClick}
              // handleSubscribeClick={handleSubscribeClick}
            />
          </>
        )}
      </View>
    </View>
  );
};

/**
 * NOTE: USE IT TO MEMO COMPONENT BEHIND SCREEN NAVIGATOR
 */
const MemoCollapseHeader = React.memo((props: any) => {
  return (
    <>
      <CollapseHeader {...props} />
    </>
  );
});
export default MemoCollapseHeader;
