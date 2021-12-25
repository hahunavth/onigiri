import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { BottomMenu, BottomTabNavigatorParamList } from "./Main/BottomMenu";
import { ComicDetailsTopTabNavigatorParamList } from "./Main/ComicDetailsTopTabNavigator";
import { ComicDetailsScreen } from "../screens/ChapterDetailsScreen/index";
import ChapterScreen from "../screens/ChapterScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import ComicListScreen from "@/screens/ComicListScreen";
import { resComicItem_T } from "@/types/api";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { FindComicProps } from "@/screens/Main/FindComic/constants";
import FindComicResultScreen from "@/screens/FindComicResultScreen";

// Screen Props Type
export type ComicDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ComicDetails"
>;
export type MainScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Main"
>;
export type ChapterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Chapter"
>;
export type ComicListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ComicListScreen"
>;
export type FindComicResultScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "FindComicResult"
>;

// Navigator Props
export type ComicDetailsNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "ComicDetails"
>;
export type MainNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Main"
>;
export type ChapterNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Chapter"
>;
export type ComicListNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "ComicListScreen"
>;
export type FindComicResultNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "FindComicResult"
>;

type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] };
}[keyof ParamList];

//  Stack Navigation Type
export type RootStackParamList = {
  // Nested
  Main: NestedNavigatorParams<BottomTabNavigatorParamList>;
  ComicDetails: {
    path: string;
    comic: resComicItem_T;
  };
  ComicListScreen: {
    path: string;
  };
  Chapter: {
    path: string;
  };
  Find: undefined;
  FindComicResult: {
    query: FindComicProps;
  };
};

const Stack = createSharedElementStackNavigator<RootStackParamList>();

export function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomMenu}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ComicDetails"
        component={ComicDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Chapter" component={ChapterScreen} />
      <Stack.Screen name="ComicListScreen" component={ComicListScreen} />
      <Stack.Screen name="FindComicResult" component={FindComicResultScreen} />
    </Stack.Navigator>
  );
}
