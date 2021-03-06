import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from "@react-navigation/native-stack";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import {
  NavigationHeader,
  MainNavigationHeader
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
  HomeSessionDetailListScreen,
  GenresBadgeListScreen
} from "app/screens";

import BottomNav, { BottomNavParamsList } from "./BottomNav";
import type {
  resComicItem_T,
  resComicDetail_T,
  resChapterDetail_T
} from "../types";
import { SelectDownloadChapter } from "app/screens/SelectDownloadChapterScreen/SelectDownloadChapter";
import { HistoryComicT } from "app/store/historySlice";
import { FindOptionT } from "app/utils/findOption";
import Header from "app/components/CollapseHeader/Header";
import { Icon, Text, View } from "native-base";
import { TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MotiView } from "moti";
import { FindByNameResultScreen } from "app/screens/FindByNameResultScreen";

import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { SharedNav, SharedNavParamList } from "./SharedNav";
import NotificationScreen from "app/screens/NotificationScreen/NotificationScreen";
import { NotificationHeaderRefreshBtn } from "app/screens/NotificationScreen/NotificationHeaderRefreshBtn";
import i18n from "i18n-js";
import ChapterSetting from "app/screens/ChapterSettingScreen/ChapterSettingScreen";
import { CommentScreen } from "app/screens/CommentScreen";
import { ChapterListScreen } from "app/screens/ChapterListScreen";
import { DayAndNightProps } from "app/components/EmptyPage";
import { SwitchThemeScreen } from "app/screens/SwitchThemeScreen";
import { RatingScreen } from "app/screens/RatingScreen";
import { ComicRatingScreen } from "app/screens/ComicRatingScreen";

import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators
} from "@react-navigation/stack";

/**
 * Using common params
 * Routing expo with react navigation and next.js with same params
 * @param preloadItem: option in expo
 */
export type StackNavParamsList = {
  main: NavigatorScreenParams<BottomNavParamsList>;
  shared: NavigatorScreenParams<SharedNavParamList>;
  "comic-detail": {
    path: string;
    preloadItem?: Partial<resComicItem_T>;
  };
  "comic-list": undefined;
  chapter: {
    path: string;
    id: number;
    preloadItem?: Partial<resComicDetail_T>;
    name?: string;
  };
  "chapter-setting": undefined;
  "chapter-list": undefined;
  comment: {
    path: string;
  };
  "find-result": {
    path: string;
    findOption: FindOptionT;
  };
  "find-by-name-result": {
    name: string;
  };
  "top-comic": undefined;
  test: {
    name: string;
    id: string | number;
  };
  login: undefined;
  "sign-up": undefined;
  "select-download-chapter": {
    comic: resComicDetail_T;
  };
  "downloaded-chapter": {
    path: string;
    id: number;
    preloadItem?: Partial<resComicDetail_T>;
  };
  "offline-comic-screen": {
    path: string;
    // Load comic from source and pass navigate
    // comic: Partial<HistoryComicT>
  };
  "offline-chapter-screen": {
    comicPath: string;
    chapterPath: string;
  };
  "genres-comic-list": undefined;
  genres: {
    genresName: string;
  };
  "genres.badge-list": undefined;
  "home-session-detail-list": {
    type: "recently" | "hot" | "week" | "find-comic-by-genres-name";
    genresName?: string;
  };
  notification: undefined;
  "top-comic-screen": undefined;
  "day-and-night": DayAndNightProps;
  rating: undefined;
  "comic-rating": undefined;
  // {
  // comic: resComicDetail_T;
  // };
};

/**
 * Screen props
 */
export type ComicDetailScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  "comic-detail"
>;
export type ChapterScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  "chapter"
>;
export type SelectDownloadChapterProps = NativeStackScreenProps<
  StackNavParamsList,
  "select-download-chapter"
>;
export type DownloadedChapterScreen = NativeStackScreenProps<
  StackNavParamsList,
  "downloaded-chapter"
>;
export type OfflineComicScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  "offline-comic-screen"
>;
export type OfflineChapterScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  "offline-chapter-screen"
>;
export type FindResultScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  "find-result"
>;
export type FindByNameResultScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  "find-by-name-result"
>;
export type GenresScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  "genres"
>;
export type HomeSessionDetailListScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  "home-session-detail-list"
>;
export type CommentScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  "comment"
>;
export type DayAndNightScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  "day-and-night"
>;
export type ComicRatingScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  "comic-rating"
>;

/**
 * Export navigation
 */
// const createNavigator: typeof createNativeStackNavigator = Platform.select({
//   native: require("@react-navigation/native-stack").createNativeStackNavigator,
//   web: require("react-navigation-shared-element")
//     .createSharedElementStackNavigator
// });

const createNavigator: typeof createStackNavigator = Platform.select({
  native: require("@react-navigation/stack").createStackNavigator,
  web: require("react-navigation-shared-element")
    .createSharedElementStackNavigator
});

const { Navigator, Screen, Group } = createNavigator<StackNavParamsList>();

export function StackNav() {
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
        // NOTE: IN STACK, NOT IN NATIVE STACK
        // @ts-ignore
        animationEnabled: true,
        // NOTE: Configure for native stack
        // header: NavigationHeader
        //
        // animation: "slide_from_bottom",
        // animationTypeForReplace: "push",
        // statusBarAnimation: "slide",
        //
        // animation: "slide_from_right",
        // animationTypeForReplace: "pop",
        // statusBarAnimation: "slide",
        // NOTE: For shaered element stack
        // animationEnabled: true,
        // animationTypeForReplace: 'push',
        // gestureEnabled: false,
        // transitionSpec: {}
        // NOTE: stack navigation
        animationTypeForReplace: "push",
        gestureDirection: "horizontal",
        transitionSpec: {
          open: TransitionSpecs.RevealFromBottomAndroidSpec,
          close: TransitionSpecs.RevealFromBottomAndroidSpec
        },
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        // FIXME: NOT SUPPORTED FOR WEB
        header: Platform.OS === "web" ? undefined : renderHeader,
        headerRight: Platform.OS === "web" ? undefined : renderRight,
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: true
        // orientation: "portrait_up"
        // headerTransparent: true,
        // TODO: TEST
        // detachInactiveScreens: true
      }}
    >
      <Screen
        name="main"
        options={{
          headerShown: Platform.OS === "web" ? false : true,
          // FIXME: NOT SUPPORTED FOR WEB
          header:
            Platform.OS === "web"
              ? undefined
              : (props) => <MainNavigationHeader {...(props as any)} />
        }}
        component={BottomNav}
      ></Screen>

      <Screen
        name="shared"
        component={SharedNav}
        options={{
          headerShown: false
        }}
      ></Screen>

      <Screen
        name="comic-detail"
        options={{
          title: i18n.t("stackNavScreens.comic-detail"),
          headerShown: false
        }}
        component={ComicDetailScreen}
      ></Screen>

      <Group>
        <Screen
          name="chapter"
          options={{
            title: i18n.t("stackNavScreens.chapter"),
            headerShown: false
          }}
          component={ChapterScreen}
        ></Screen>
        <Screen
          name="chapter-setting"
          options={{
            animation: "fade",
            headerShown: false,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            headerTransparent: true,
            // REVIEW: TYPE MODAL, ........................
            presentation: "transparentModal",
            ...TransitionPresets.BottomSheetAndroid
          }}
          component={ChapterSetting}
        ></Screen>

        <Screen
          name="comment"
          options={{
            animation: "fade",
            headerShown: false,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            headerTransparent: true,
            // REVIEW: TYPE MODAL, ........................
            presentation: "transparentModal",
            ...TransitionPresets.BottomSheetAndroid
          }}
          component={CommentScreen}
        ></Screen>
        <Screen
          name="chapter-list"
          options={{
            animation: "fade",
            headerShown: false,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            headerTransparent: true,
            // REVIEW: TYPE MODAL, ........................
            presentation: "transparentModal",
            ...TransitionPresets.BottomSheetAndroid
          }}
          component={ChapterListScreen}
        />

        <Screen
          name="day-and-night"
          options={{
            animation: "fade",
            headerShown: false,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            headerTransparent: true,
            // REVIEW: TYPE MODAL, ........................
            presentation: "transparentModal",
            ...TransitionPresets.BottomSheetAndroid
          }}
          component={SwitchThemeScreen}
        />

        <Screen
          name="rating"
          options={{
            animation: "fade",
            headerShown: false,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            headerTransparent: true,
            // REVIEW: TYPE MODAL, ........................
            presentation: "transparentModal",
            ...TransitionPresets.BottomSheetAndroid
          }}
          component={RatingScreen}
        />

        <Screen
          name="comic-rating"
          options={{
            animation: "fade",
            headerShown: false,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            headerTransparent: true,
            // REVIEW: TYPE MODAL, ........................
            presentation: "transparentModal",
            ...TransitionPresets.BottomSheetAndroid
          }}
          component={ComicRatingScreen}
        />
      </Group>

      <Group>
        <Screen
          name="comic-list"
          options={{
            title: i18n.t("stackNavScreens.comic-list")
          }}
          component={ComicListScreen}
        ></Screen>

        <Screen
          name="find-result"
          options={{
            title: i18n.t("stackNavScreens.find-result"),
            header: renderHeader,
            headerRight: renderRight
          }}
          component={FindResultScreen}
        ></Screen>

        <Screen
          name="find-by-name-result"
          options={{
            // headerShown: false,
            title: i18n.t("stackNavScreens.find-by-name-result")
          }}
          component={FindByNameResultScreen}
        ></Screen>

        <Screen
          name="genres"
          options={(props) => ({
            title:
              i18n.t("stackNavScreens.genres") +
              `${props.route.params.genresName}`
          })}
          component={Genres}
        ></Screen>
      </Group>

      <Screen
        name="genres.badge-list"
        // options={(props) => ({
        //   title:  `${props.route.params.genresName}`
        // })}
        options={{
          title: i18n.t("stackNavScreens.genres-badge-list")
        }}
        component={GenresBadgeListScreen}
      ></Screen>

      <Screen
        name="genres-comic-list"
        options={{
          title: i18n.t("stackNavScreens.genres-comic-list")
        }}
        component={GenresList}
      ></Screen>

      <Screen
        name="home-session-detail-list"
        options={(props) => ({
          title: props.route.params.type.toUpperCase()
        })}
        component={HomeSessionDetailListScreen}
      ></Screen>

      <Screen
        name="login"
        options={{
          title: i18n.t("stackNavScreens.login")
        }}
        component={LoginScreen}
      ></Screen>

      <Screen
        name="notification"
        options={{
          gestureEnabled: true,
          title: i18n.t("stackNavScreens.notification"),
          headerRight: NotificationHeaderRefreshBtn
        }}
        component={NotificationScreen}
      ></Screen>

      <Screen
        name="sign-up"
        options={{
          title: i18n.t("stackNavScreens.sign-up")
        }}
        component={SignupScreen}
      ></Screen>

      <Screen
        name="test"
        options={{
          title: "Test Screen"
        }}
        component={TestScreen}
      ></Screen>

      <Screen
        name="top-comic"
        options={{
          title: i18n.t("stackNavScreens.top-comic")
        }}
        component={TopComicScreen}
      ></Screen>

      <Screen
        name="select-download-chapter"
        options={{
          title: i18n.t("stackNavScreens.select-download-chapter")
        }}
        component={SelectDownloadChapter}
      ></Screen>

      <Group>
        <Screen
          name="offline-comic-screen"
          options={{
            headerShown: false,
            title: i18n.t("stackNavScreen.offline-comic-screen")
          }}
          component={OfflineComicScreen}
        />

        <Screen
          name="offline-chapter-screen"
          options={{
            headerShown: true,
            title: i18n.t("stackNavScreen.offline-chapter-screen")
          }}
          component={OfflineChapterScreen}
        />
      </Group>
    </Navigator>
  );
}
