import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from "@react-navigation/native-stack";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { Easing } from "react-native";
import {
  NavigationHeader,
  SearchNavigationHeader
} from "app/components/NavigationHeader";
import {
  ChapterScreen,
  ComicDetailScreen,
  ComicListScreen,
  FindResultScreen,
  LoginScreen,
  SignupScreen,
  TestScreen,
  TopComicScreen,
  OfflineChapterScreen,
  OfflineComicScreen,
  GenresList,
  Genres,
  HomeSessionDetailListScreen
} from "app/screens";

import BottomNav, { BottomNavParamsList } from "./BottomNav";
import type {
  resComicItem_T,
  resComicDetail_T,
  resChapterDetail_T
} from "../types";
import { SelectDownloadChapter } from "../screens/SelectDownloadChapterScreen/SelectDownloadChapter";
import { HistoryComicT } from "../store/historySlice";
import { FindOptionT } from "../utils/findOption";
import Header from "../components/CollapseHeader/Header";
import { Icon, Text, View } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MotiView } from "moti";
import { FindByNameResultScreen } from "../screens/FindByNameResultScreen";

import {
  createSharedElementStackNavigator,
  SharedElementAnimation
} from "react-navigation-shared-element";
import { StackNavParamsList } from "./StackNav";

/**
 * Using common params
 * Routing expo with react navigation and next.js with same params
 * @param preloadItem: option in expo
 */
export type SharedNavParamList = {
  "shared/comic-detail": StackNavParamsList["comic-detail"];
  "shared/find-result": StackNavParamsList["find-result"];
};

/**
 * Screen props
 */
export type ComicDetailScreenProps = NativeStackScreenProps<
  SharedNavParamList,
  "shared/comic-detail"
>;
export type FindResultScreenProps = NativeStackScreenProps<
  SharedNavParamList,
  "shared/find-result"
>;

/**
 * Export navigation
 */
const { Navigator, Screen } =
  createSharedElementStackNavigator<SharedNavParamList>();

export function SharedNav() {
  const renderHeader = React.useCallback(
    (props: any) => <NavigationHeader {...props} />,
    []
  );

  const renderRight = React.useCallback((props: any) => {
    return (
      <MotiView
        from={{
          transform: [{ scale: 0 }, { translateX: -10 }]
        }}
        animate={{
          transform: [{ scale: 1 }, { translateX: 0 }]
        }}
      >
        <AntDesign name="upsquare" size={24} color="black" />
      </MotiView>
    );
  }, []);

  return (
    <Navigator
      screenOptions={{
        // NOTE: For shared element stack
        // cardOverlayEnabled: true,
        // cardOverlay: ({ style }) => {
        //   return (
        //     <View
        //       bg={'red.400'}
        //       // style={style}
        //       flex={1}
        //     ></View>
        //   )
        // },
        // detachPreviousScreen: false,

        presentation: "modal",
        transitionSpec: {
          open: {
            animation: "timing",
            config: { duration: 700, easing: Easing.out(Easing.exp) }
          },
          close: {
            animation: "timing",
            config: { duration: 500, easing: Easing.out(Easing.exp) }
          }
          // close: {
          //   animation: 'spring',
          //   config: {
          //     damping: 15,
          //     mass: 1,
          //     stiffness: 150,
          //     overshootClamping: false,
          //     restSpeedThreshold: 0.001,
          //     restDisplacementThreshold: 0.001
          //   }
          // }
        },
        // cardStyleInterpolator: ,
        cardShadowEnabled: true,

        animationEnabled: true,
        animationTypeForReplace: "push",
        gestureEnabled: false,
        // transitionSpec: {}
        header: renderHeader,
        headerRight: renderRight
      }}
    >
      <Screen
        name="shared/comic-detail"
        options={{
          title: "Comic Detail Screen",
          headerShown: false
        }}
        component={ComicDetailScreen}
        // ANCHOR: SHARED ELEMENT CONFIG
        sharedElements={(route, otherRoute, showing) => {
          // Only transition when coming from a specific route
          // console.log(route.name, otherRoute.name, showing)
          if (otherRoute.name === "shared/find-result") {
            const { preloadItem } = route.params;
            return [`item.${preloadItem?.posterUrl}.photo`];
          }
          // return [`${preloadItem?.posterUrl}`];
        }}
        initialParams={{ path: "/truyen-tranh/dai-vuong-tha-mang-26499" }}
      ></Screen>
      <Screen
        name="shared/find-result"
        options={{
          title: "Find Result Screen",
          header: renderHeader,
          headerRight: renderRight
        }}
        component={FindResultScreen}
      ></Screen>
    </Navigator>
  );
}
