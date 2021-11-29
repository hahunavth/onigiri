import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { BottomMenu } from "./BottomMenu";
import { ComicProps } from "../components/ComicListView/ComicList";
import { ComicDetailsScreen } from "../screens/ComicDetailsScreen";
import ChapterScreen from "../screens/ChapterScreen";

//  Screen Props Type
export type ComicListScreenProps = NativeStackScreenProps<
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

//  Stack Navigation Type
type RootStackParamList = {
  Main: undefined;
  ComicList: undefined;
  ComicDetails: {
    path: string;
    comic: ComicProps;
  };
  Chapter: {
    path: string;
  };
  Find: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
    </Stack.Navigator>
  );
}
