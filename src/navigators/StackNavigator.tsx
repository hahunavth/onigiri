import React from "react";

// Use shared element
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { NavigatorScreenParams } from "@react-navigation/native";

// Linear Gradient
import { LinearGradient } from "expo-linear-gradient";

// @
import BlurHeader from "@/components/Header/BlurHeader";
import QuicksandText, { QFontFamily } from "@/components/Common/QuicksandText";
import {
  BottomMenu,
  BottomTabNavigatorParamList,
} from "@/navigators/Main/BottomMenu";
import {
  ComicDetailsScreen,
  ChapterScreen,
  ComicListScreen,
  FindComicProps,
  FindComicResultScreen,
} from "@/screens";
import { resComicItem_T } from "@/types/api";
import { StyleSheet, Text, View } from "react-native";
// import { BlurView } from "expo-blur";
import { BlurView } from "@react-native-community/blur";

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

// FIXME: Nested type deprecated
type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] };
}[keyof ParamList];

// Stack Navigation Type
export type RootStackParamList = {
  // NOTE: Nested
  Main: NavigatorScreenParams<BottomTabNavigatorParamList>;
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
        options={{
          headerStatusBarHeight: -12,
          headerTitleStyle: {
            fontSize: 16,
            fontFamily: QFontFamily.Quicksand_600SemiBold,
          },
          headerStyle: {
            opacity: 0.5,
            backgroundColor: "transparent",
            right: 0,
            left: 0,
            top: 0,
            position: "absolute",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <QuicksandText style={{ color: "black" }}>a</QuicksandText>
          ),
          headerBackground: () => (
            <LinearGradient
              colors={["#cedae7", "#d6c8c8"]}
              style={{ flex: 1 }}
            ></LinearGradient>
          ),
        }}
      />
      <Stack.Screen
        name="Chapter"
        options={{
          // header: () => <BlurHeader />,
          // headerTransparent: true,
          headerTransparent: true,
          headerStatusBarHeight: -12,
          headerBackground: (props) => (
            // <BlurView
            //   tint="dark"
            //   intensity={80}
            //   style={StyleSheet.absoluteFill}
            // >
            //   <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
            // </BlurView>
            <View style={{ flex: 1 }}>
              <BlurView
                style={{
                  //   position: "absolute",
                  //   top: 0,
                  //   left: 0,
                  //   bottom: 0,
                  //   right: 0,
                  flex: 1,
                  // height: 30,
                }}
                // viewRef={this.state.viewRef}
                blurType="light"
                blurAmount={100}
                reducedTransparencyFallbackColor="white"
              ></BlurView>
            </View>
          ),
          // headerStyle: {
          // backgroundColor: "transparent",
          // right: 0,
          // left: 0,
          // top: 0,
          // position: "absolute",
          // borderBottomWidth: 0,
          // },
        }}
        component={ChapterScreen}
      />
      <Stack.Screen name="ComicListScreen" component={ComicListScreen} />
      <Stack.Screen name="FindComicResult" component={FindComicResultScreen} />
    </Stack.Navigator>
  );
}
