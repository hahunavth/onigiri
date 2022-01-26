import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ListRenderItemInfo,
  SafeAreaView,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ViewProps,
} from "react-native";
import {
  ComicDetailsNavigationProps,
  ComicDetailsScreenProps,
} from "@/navigators/StackNavigator";
import { Layout, Button, List, IconProps } from "@ui-kitten/components";
import { Icon } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useApiComicDetail } from "@/app/api";

import { SharedElement } from "react-navigation-shared-element";
import { LinearGradient } from "expo-linear-gradient";

import FloatingButton from "@/components/Common/FloatingButton";
import { resComicDetailChapterItem_T } from "@/types/api";
import QuicksandText from "@/components/Common/QuicksandText";
import { TopTabNavioator } from "@/navigators/Main/ComicDetailsTopTabNavigator";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { downloadAction, downloadSelector } from "@/app/downloadSlice";
import { homeActions, selectHome } from "@/app/homeSlice";
import { CollapseHeader } from "@/components/CollapseHeader";
import { SqlQuery } from "@/app/sqlite/query";
import { CREATE_TABLE, db } from "@/app/sqlite/createTable";

// import Animated, {
//   interpolate,
//   useAnimatedStyle,
//   useDerivedValue,
//   useSharedValue,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// const StarIcon = (props: IconProps) => (
//   <Icon {...props} name="arrow-ios-back" />
// );

// export let endAncestor: any;
// export let endNode: any;

// const { width, height } = Dimensions.get("window");

// export enum Visibility {
//   Hidden = 0,
//   Visible = 1,
// }

// type HeaderConfig = {
//   heightExpanded: number;
//   heightCollapsed: number;
// };

// const TAB_BAR_HEIGHT = 48;
// const HEADER_HEIGHT = 48;

// const OVERLAY_VISIBILITY_OFFSET = 32;

// const Tab = createMaterialTopTabNavigator();

// export function ComicDetailsScreen({
//   navigation,
//   route: { params },
// }: ComicDetailsScreenProps) {
//   // NOTE: Animated

//   const { top, bottom } = useSafeAreaInsets();

//   const [tabIndex, setTabIndex] = useState(0);
//   const [headerHeight, setHeaderHeight] = useState(0);

//   const friendsScrollValue = useSharedValue(0);
//   const suggestionsScrollValue = useSharedValue(0);

//   const сurrentScrollValue = useDerivedValue(
//     () =>
//       tabIndex === 0 ? friendsScrollValue.value : suggestionsScrollValue.value,
//     [tabIndex, friendsScrollValue, suggestionsScrollValue]
//   );

//   const defaultHeaderHeight = top + HEADER_HEIGHT;

//   const headerConfig = useMemo<HeaderConfig>(
//     () => ({
//       heightCollapsed: defaultHeaderHeight,
//       heightExpanded: headerHeight,
//     }),
//     [defaultHeaderHeight, headerHeight]
//   );

//   const { heightCollapsed, heightExpanded } = headerConfig;

//   const headerDiff = heightExpanded - heightCollapsed;

//   const rendered = headerHeight > 0;

//   const translateY = useDerivedValue(
//     () => -Math.min(сurrentScrollValue.value, headerDiff)
//   );

//   const headerAnimatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//     opacity: interpolate(
//       translateY.value,
//       [-headerDiff, 0],
//       [Visibility.Hidden, Visibility.Visible]
//     ),
//   }));

//   const headerContainerStyle = useMemo<StyleProp<ViewStyle>>(
//     () => [
//       rendered ? styles.headerContainer : undefined,
//       { paddingTop: top },
//       headerAnimatedStyle,
//     ],

//     [rendered, top, headerAnimatedStyle]
//   );

//   //  NOTE: Logic
//   const [sort, setSort] = useState<"newer" | "older">("newer");

//   const { data, isFetching, isLoading } = useApiComicDetail(params.path);

//   const download = useAppSelector(downloadSelector);
//   const dispatch = useAppDispatch();

//   const home = useAppSelector(selectHome);

//   useEffect(() => {
//     dispatch(homeActions.setCurrentComic(data));

//     return () => {
//       dispatch(homeActions.removeCurrentComic());
//     };
//   }, [data]);

//   const handleHeaderLayout = useCallback<NonNullable<ViewProps["onLayout"]>>(
//     (event) => setHeaderHeight(event.nativeEvent.layout.height),
//     []
//   );

//   let chapterList: any = [];
//   if (!isFetching) chapterList = data?.chapters;

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Animated.View onLayout={handleHeaderLayout} style={headerContainerStyle}>
//         <Layout style={{ alignItems: "flex-end", backgroundColor: "#000000" }}>
//           <SharedElement id={`${params.comic.posterUrl}`}>
//             <ImageBackground
//               source={{ uri: params.comic.posterUrl }}
//               resizeMode="cover"
//               style={{
//                 width: width / 1,
//                 height: height / 3.2,
//               }}
//             >
//               <LinearGradient
//                 colors={["#000000d8", "#00000042", "#77777747"]}
//                 start={{ x: 0, y: 1.1 }}
//                 end={{ x: 0, y: 0 }}
//                 style={{
//                   flex: 1,
//                   justifyContent: "flex-end",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <SharedElement id={`comicName.${params.comic.name}`}>
//                   <QuicksandText
//                     style={{
//                       fontFamily: "Quicksand_600SemiBold",
//                       fontSize: 20,
//                       color: "#ffffffa6",
//                       marginVertical: 10,
//                       marginHorizontal: 20,
//                     }}
//                     numberOfLines={2}
//                   >
//                     {params.comic.name}
//                   </QuicksandText>
//                 </SharedElement>
//               </LinearGradient>
//             </ImageBackground>
//           </SharedElement>
//         </Layout>
//       </Animated.View>
//       <TopTabNavioator path={params.path} />
//       {/* <ComicDetailT */}

//       {/* <ScrollView>
//         <View
//           style={{ width: 10, height: 4000, backgroundColor: "red" }}
//         ></View>
//       </ScrollView> */}
//     </SafeAreaView>
//   );
// }

// function ChapterList({ list }: { list: resComicDetailChapterItem_T[] }) {
//   const navigation = useNavigation<ComicDetailsNavigationProps>();
//   // navigation.navigate("Main", { screen: "home" });
//   const renderItem = (
//     props: ListRenderItemInfo<resComicDetailChapterItem_T>
//   ) => (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate("Chapter", {
//           // TODO: rEPLACE WITH GENERIC
//           path: props.item.url.replace("http://www.nettruyengo.com/", ""),
//           id: props.index,
//         })
//       }
//     >
//       <QuicksandText>{props.item.name}</QuicksandText>
//       <QuicksandText>{props.item.updatedVew}</QuicksandText>
//       <QuicksandText>{props.item.updatedAt}</QuicksandText>
//     </TouchableOpacity>
//   );

//   return (
//     <Layout>
//       <List data={list} renderItem={renderItem} />
//     </Layout>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   tabBarContainer: {
//     top: 0,
//     left: 0,
//     right: 0,
//     position: "absolute",
//     zIndex: 1,
//   },
//   overlayName: {
//     fontSize: 24,
//   },
//   collapsedOvarlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "white",
//     justifyContent: "center",
//     zIndex: 2,
//   },
//   headerContainer: {
//     top: 0,
//     left: 0,
//     right: 0,
//     position: "absolute",
//     zIndex: 1,
//   },
// });

// NOTE: Refactor

export const ComicDetailsScreen = (props: ComicDetailsScreenProps) => {
  const { data, isLoading } = useApiComicDetail(props.route.params.path);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(homeActions.setCurrentComic(data));
    return () => {
      dispatch(homeActions.removeCurrentComic());
    };
  }, [data]);

  return (
    <Layout level={"3"} style={{ flex: 1 }}>
      <CollapseHeader comic={data} routeParam={props.route.params.comic} />
    </Layout>
  );
};

// // FIXME: Fix type of sharedElement config
// // @ts-ignore
// ComicDetailsScreen.sharedElements = (navigation: any) => {
//   // const item = navigation.getParam("ComicDetails");
//   // console.log(navigation.route.params.comic.posterUrl);
//   return [`${navigation.route.params.comic.posterUrl}`];
// };
