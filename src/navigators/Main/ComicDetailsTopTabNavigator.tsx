import React from "react";
import {
  CompositeNavigationProp,
  NavigationContainer,
} from "@react-navigation/native";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
  MaterialTopTabScreenProps,
} from "@react-navigation/material-top-tabs";
import { TabBar, Tab, Layout, Text } from "@ui-kitten/components";
import { resComicDetailChapterItem_T, resComicDetail_T } from "@/types/api";
import { MainNavigationProps } from "../StackNavigator";
import ChapterList from "@/screens/ChapterDetailsScreen/ChapterList";
import Details from "@/screens/ChapterDetailsScreen/Details";

const { Navigator, Screen } =
  createMaterialTopTabNavigator<ComicDetailsTopTabNavigatorParamList>();

const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">USERS</Text>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">ORDERS</Text>
  </Layout>
);

const TopTabBar = ({ navigation, state }: MaterialTopTabBarProps) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <Tab title="USERS" />
    <Tab title="ORDERS" />
  </TabBar>
);

export type ComicDetailsTopTabNavigatorParamList = {
  detail: {
    path: string;
  };
  chapterList: {
    // chapterList: resComicDetailChapterItem_T[];
    path: string;
  };
};

export type chapterListcomicDetailsProps = MaterialTopTabScreenProps<
  ComicDetailsTopTabNavigatorParamList,
  "chapterList"
>;

export type chapterListComicDetailsTopBarNavigation =
  MaterialTopTabNavigationProp<
    ComicDetailsTopTabNavigatorParamList,
    "chapterList"
  >;

export type chapterListComicDetailsTopBarProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<
    ComicDetailsTopTabNavigatorParamList,
    "chapterList"
  >,
  MainNavigationProps
>;

export type detailcomicDetailsProps = MaterialTopTabScreenProps<
  ComicDetailsTopTabNavigatorParamList,
  "detail"
>;

export type detailComicDetailsTopBarNavigation = MaterialTopTabNavigationProp<
  ComicDetailsTopTabNavigatorParamList,
  "detail"
>;

export type detailComicDetailsTopBarProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<ComicDetailsTopTabNavigatorParamList, "detail">,
  MainNavigationProps
>;

const TabNavigator = (props: { path: string }) => (
  <Navigator
  //  tabBar={(props) => <TopTabBar {...props} />}
  >
    <Screen
      name="detail"
      component={Details}
      initialParams={{ path: props.path }}
    />
    <Screen
      name="chapterList"
      component={ChapterList}
      initialParams={{ path: props.path }}
    />
  </Navigator>
);

export const TopTabNavioator = ({ path }: { path: string }) => (
  <TabNavigator path={path} />
);