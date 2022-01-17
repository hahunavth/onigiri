import {
  resComicDetailChapterItem_T,
  resComicDetail_T,
  resComicItem_T,
} from "@/types";
import React, { FC, memo, useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  FlatListProps,
  Image,
  ImageBackground,
  ImageProps,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header, { HeaderConfig, Visibility } from "./Header";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import HeaderOverlay from "./HeaderOverlay";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import {
  useSafeAreaInsets,
  Edge,
  SafeAreaView,
} from "react-native-safe-area-context";
import { ScrollPair } from "./ScrollPair";
import useScrollSync from "./useScrollSync";
import { Connection } from "@/screens/TestScreen/Connection";
import ChapterList, { ListHeader } from "./ChapterList";
import TabBar from "./TabBar";
import { Button, Icon, Layout } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import QuicksandText from "../Common/QuicksandText";
import DetailList from "./DetailList";
import { useAppSelector } from "@/app/hooks";
import { selectHome } from "@/app/homeSlice";

type Props = {
  comic?: resComicDetail_T;
  routeParam?: resComicItem_T;
};

// Constant
const TAB_BAR_HEIGHT = 48;
const HEADER_HEIGHT = 48;
const OVERLAY_VISIBILITY_OFFSET = 32;

const Tab = createMaterialTopTabNavigator();

// const getItemLayout = (data, index) => (
//   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
// );

export const CollapseHeader = (props: Props) => {
  // Get safe area
  const { top, bottom } = useSafeAreaInsets();

  const { height: screenHeight } = useWindowDimensions();

  const friendsRef = useRef<FlatList>(null);
  const suggestionsRef = useRef<FlatList>(null);

  const [tabIndex, setTabIndex] = useState(0);

  const [headerHeight, setHeaderHeight] = useState(0);
  const defaultHeaderHeight = top + HEADER_HEIGHT;

  const headerConfig = useMemo<HeaderConfig>(
    () => ({
      heightCollapsed: defaultHeaderHeight,
      heightExpanded: headerHeight,
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
      { list: suggestionsRef, position: suggestionsScrollValue },
    ],
    [friendsRef, friendsScrollValue, suggestionsRef, suggestionsScrollValue]
  );

  const { sync } = useScrollSync(scrollPairs, headerConfig);

  const сurrentScrollValue = useDerivedValue(
    () =>
      tabIndex === 0 ? friendsScrollValue.value : suggestionsScrollValue.value,
    [tabIndex, friendsScrollValue, suggestionsScrollValue]
  );

  const translateY = useDerivedValue(
    () => -Math.min(сurrentScrollValue.value, headerDiff)
  );

  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: interpolate(
      translateY.value,
      [-headerDiff, 0],
      [Visibility.Hidden, Visibility.Visible]
    ),
  }));

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: rendered ? headerHeight + TAB_BAR_HEIGHT : 0,
      paddingBottom: bottom,
      minHeight: screenHeight + headerDiff,
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
      scrollIndicatorInsets: { top: heightExpanded },
    }),
    [contentContainerStyle, sync, heightExpanded]
  );

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
        {...sharedProps}
      />
    ),
    [friendsRef, friendsScrollHandler, sharedProps]
  );

  const renderSuggestions = useCallback(
    () => (
      <ChapterList
        ref={suggestionsRef}
        data={props.comic?.chapters}
        onScroll={suggestionsScrollHandler}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        {...sharedProps}
        ListHeaderComponent={() => (
          <ListHeader
            lastedChapter={props.comic?.chapters[0].name || ""}
            sortType="newer"
            onSortTypeChange={(type) => null}
          />
        )}
      />
    ),
    [suggestionsRef, suggestionsScrollHandler, sharedProps]
  );

  const tabBarStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      rendered ? styles.tabBarContainer : undefined,
      { top: rendered ? headerHeight : undefined },
      tabBarAnimatedStyle,
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
    () => [
      rendered ? styles.headerContainer : undefined,
      {
        paddingTop: top,
      },
      headerAnimatedStyle,
    ],

    [rendered, top, headerAnimatedStyle]
  );

  const collapsedOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [-headerDiff, OVERLAY_VISIBILITY_OFFSET - headerDiff, 0],
      [Visibility.Visible, Visibility.Hidden, Visibility.Hidden]
    ),
  }));

  const collapsedOverlayStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.collapsedOverlay,
      collapsedOverlayAnimatedStyle,
      { height: heightCollapsed, paddingTop: top },
    ],
    [collapsedOverlayAnimatedStyle, heightCollapsed, top]
  );

  return (
    <SafeAreaView style={{ marginTop: -28, flex: 1 }}>
      <View style={styles.container}>
        <Animated.View
          onLayout={handleHeaderLayout}
          style={headerContainerStyle}
        >
          <Header
            name={props.routeParam?.name || props.comic?.title || ""}
            bio={`Rating: ${props.comic?.rate}`}
            photo={props.routeParam?.posterUrl || props.comic?.posterUrl || ""}
          />
        </Animated.View>
        <Animated.View style={collapsedOverlayStyle}>
          <HeaderOverlay
            name={props.comic?.title || ""}
            numChapter={props.comic?.chapters?.length || 0}
          />
        </Animated.View>
        <Tab.Navigator
          tabBar={renderTabBar}
          pageMargin={10}
          screenOptions={{
            tabBarStyle: {},
            tabBarLabelStyle: {},
            tabBarItemStyle: {
              margin: -5,
              justifyContent: "center",
              alignItems: "center",
            },
            tabBarIndicatorStyle: {
              backgroundColor: "red",
            },
            tabBarActiveTintColor: "red",
            tabBarAllowFontScaling: false,
            tabBarInactiveTintColor: "gray",
            tabBarPressColor: "transparent",
            // tabBarContentContainerStyle: { backgroundColor: "blue" },
            // tabBarShowLabel: false,
            // tabBarBounces: true,
            // lazy: true,
          }}
        >
          <Tab.Screen name="Friends">{renderFriends}</Tab.Screen>
          <Tab.Screen name="Suggestions">{renderSuggestions}</Tab.Screen>
        </Tab.Navigator>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
            // height: 64,
            // margin: 0,
            // padding: -10,
            // position: "absolute",
            // bottom: 0,
            // left: 0,
            // right: 0,
            // height: 100,
          }}
        >
          <TouchableOpacity
            style={{ margin: "auto", alignItems: "center", marginLeft: 24 }}
          >
            <AntDesign name="sharealt" size={24} />
            <QuicksandText style={{ fontSize: 11 }}>Share</QuicksandText>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: "auto", alignItems: "center" }}>
            <AntDesign name="adduser" size={24} />
            <QuicksandText style={{ fontSize: 11 }}>Subscribe</QuicksandText>
          </TouchableOpacity>
          <Button
            status={"danger"}
            style={{
              width: 210,
              borderRadius: 100,
              margin: 0,
              padding: 0,
              marginRight: 12,
            }}
          >
            Read now!
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabBarContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 1,
  },
  overlayName: {
    fontSize: 24,
  },
  collapsedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    justifyContent: "center",
    zIndex: 2,
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 1,
  },
});
