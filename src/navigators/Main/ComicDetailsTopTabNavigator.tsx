import React from "react";
import {
  CompositeNavigationProp,
  NavigationContainer,
} from "@react-navigation/native";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
} from "@react-navigation/material-top-tabs";
import { TabBar, Tab, Layout, Text } from "@ui-kitten/components";
import { resComicDetailChapterItem_T } from "@/types/api";
import { MainNavigationProps } from "../StackNavigator";
import ChapterList from "@/screens/ChapterDetailsScreen/ChapterList";

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
  detail: undefined;
  chapterList: {
    chapterList: resComicDetailChapterItem_T[];
  };
};

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

const TabNavigator = (props: resComicDetailChapterItem_T[]) => (
  <Navigator
  //  tabBar={(props) => <TopTabBar {...props} />}
  >
    <Screen name="detail" component={UsersScreen} />
    <Screen
      name="chapterList"
      component={ChapterList}
      initialParams={{ chapterList: props }}
    />
  </Navigator>
);

export const TopTabNavioator = (props: resComicDetailChapterItem_T[]) => (
  <TabNavigator {...props} />
);
