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
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewProps,
  ViewStyle,
  Animated as RNAnimated,
  Easing,
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
import {
  Button,
  Icon,
  Layout,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import QuicksandText from "../Common/QuicksandText";
import DetailList from "./DetailList";

import { ColorSchemeE } from "@/styles/colorScheme";
import { navigate } from "@/navigators";

type Props = {
  comic?: resComicDetail_T;
  routeParam?: resComicItem_T;
};

const themedStyles = StyleService.create({
  tabBar: {
    backgroundColor: ColorSchemeE["background-basic-color-1"],
  },
  iconColor: {
    backgroundColor: ColorSchemeE["text-basic-color"],
  },
});

const AnimatedLayout = Animated.createAnimatedComponent(Layout);

const ToastComingSoon = () => {
  ToastAndroid.show("Coming Soon!", 500);
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
  const tbStyle = useStyleSheet(themedStyles);
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

  // STUB: V2 TRANSLATE Y
  // const translateY = useDerivedValue(
  //   () => -Math.min(сurrentScrollValue.value, headerDiff)
  // );
  // ANCHOR:
  const translateY = useRef(new RNAnimated.Value(0)).current;

  // STUB: V2 TRANSLATE Y
  // const tabBarAnimatedStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateY: translateY.value }],
  // }));
  // ANCHOR:
  const tabBarAnimatedStyle = {
    transform: [{ translateY: 100 }],
  };
  // STUB: V2 TRANSLATE Y
  // const headerAnimatedStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateY: translateY.value }],
  //   opacity: interpolate(
  //     translateY.value,
  //     [-headerDiff, 0],
  //     [Visibility.Hidden, Visibility.Visible]
  //   ),
  // }));
  // ANCHOR:
  const headerTranslateYOpacity = translateY.interpolate({
    // inputRange: [-headerDiff, 0],
    inputRange: [0, 1000],
    outputRange: [Visibility.Hidden, Visibility.Visible],
    easing: Easing.linear,
  });
  const headerAnimatedStyle = {
    transform: [{ translateY: 200 }],
    opacity: headerTranslateYOpacity,
  };
  //

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
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={10}
        {...sharedProps}
        //   ListHeaderComponent={() => (
        //     <ListHeader
        //       lastedChapter={props.comic?.chapters[0].name || ""}
        //       sortType="newer"
        //       onSortTypeChange={(type) => null}
        //     />
        //   )}
      />
    ),
    [suggestionsRef, suggestionsScrollHandler, sharedProps]
  );

  const tabBarStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      rendered ? styles.tabBarContainer : undefined,
      { top: rendered ? headerHeight : undefined },
      // @ts-ignore
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
      // @ts-ignore
      headerAnimatedStyle,
    ],

    [rendered, top, headerAnimatedStyle]
  );

  // STUB: V2 TRANSLATE Y
  // const collapsedOverlayAnimatedStyle = useAnimatedStyle(() => ({
  //   opacity: interpolate(
  //     translateY.value,
  //     [-headerDiff, OVERLAY_VISIBILITY_OFFSET - headerDiff, 0],
  //     [Visibility.Visible, Visibility.Hidden, Visibility.Hidden]
  //   ),
  // }));
  // ANCHOR:
  // const collapsedOverlayOpacity
  const collapsedOverlayAnimatedStyle = translateY.interpolate({
    // inputRange: [-headerDiff, OVERLAY_VISIBILITY_OFFSET - headerDiff, 0],
    inputRange: [0, 200, 400],
    outputRange: [Visibility.Visible, Visibility.Hidden, Visibility.Hidden],
    easing: Easing.linear,
  });

  const collapsedOverlayStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.collapsedOverlay,
      // @ts-ignore
      collapsedOverlayAnimatedStyle,
      { height: heightCollapsed, paddingTop: top },
    ],
    [collapsedOverlayAnimatedStyle, heightCollapsed, top]
  );

  return (
    <SafeAreaView style={{ marginTop: -28, flex: 1 }}>
      <View style={styles.container}>
        <Animated.View
          // ANCHOR: STATE OK
          onLayout={handleHeaderLayout}
          style={headerContainerStyle}
          //
        >
          <Header
            name={props.routeParam?.name || props.comic?.title || ""}
            bio={
              props.comic?.rate ? `Rating: ${props.comic?.rate}` : "Loading..."
            }
            photo={props.routeParam?.posterUrl || props.comic?.posterUrl || ""}
          />
        </Animated.View>
        <AnimatedLayout style={collapsedOverlayStyle}>
          <HeaderOverlay
            name={props.comic?.title || ""}
            numChapter={props.comic?.chapters?.length || 0}
          />
        </AnimatedLayout>
        <Tab.Navigator
          tabBar={renderTabBar}
          pageMargin={10}
          screenOptions={{
            tabBarStyle: tbStyle.tabBar,
            tabBarLabelStyle: {},
            tabBarItemStyle: {
              margin: -5,
              justifyContent: "center",
              alignItems: "center",
            },
            tabBarPressOpacity: 0.1,
            tabBarIndicatorStyle: {
              backgroundColor: "#f0125cdf",
              flex: 1,
              height: 38,
              borderWidth: 5,
              borderRadius: 12,
              borderColor: "transparent",
            },
            tabBarActiveTintColor: "white",
            tabBarAllowFontScaling: false,
            tabBarInactiveTintColor: "gray",
            tabBarPressColor: "transparent",
          }}
        >
          <Tab.Screen name="Friends" component={renderFriends}></Tab.Screen>
          <Tab.Screen
            name="Suggestions"
            component={renderSuggestions}
          ></Tab.Screen>
        </Tab.Navigator>
        {/* NOTE: Bottom bar */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
          }}
        >
          <TouchableOpacity
            style={{ margin: "auto", alignItems: "center", marginLeft: 24 }}
            onPress={ToastComingSoon}
          >
            <AntDesign
              name="sharealt"
              size={24}
              color={tbStyle.iconColor.backgroundColor}
            />
            <QuicksandText style={{ fontSize: 11 }}>Share</QuicksandText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ToastComingSoon}
            style={{ margin: "auto", alignItems: "center" }}
          >
            <AntDesign
              name="adduser"
              size={24}
              color={tbStyle.iconColor.backgroundColor}
            />
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
            onPress={() => {
              const chapter1 =
                props.comic?.chapters[props.comic?.chapters.length - 1];
              chapter1?.path &&
                props.comic?.chapters.length &&
                navigate("Chapter", {
                  id: props.comic?.chapters.length - 1,
                  path: chapter1?.path,
                  name: chapter1?.name,
                });
            }}
          >
            Read now!
          </Button>
        </View>
        {/*  */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
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
    // backgroundColor: "white",
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
