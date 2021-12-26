import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ScaledSize,
} from "react-native";
import { useQueries, useQuery } from "react-query";
import { ComicList } from "@/components/ComicListView";
import { Session } from "@/components/Session";
import ContentLoader, { Facebook } from "react-native-easy-content-loader";

import { HomeBottomNavigation } from "../../navigators/Main/BottomMenu";
import { ApiRespone_T, resComicItem_T } from "@/types/api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchRecentlyAsync,
  homeActions,
  selectHome,
} from "../../app/homeSlice";
import { FlatlistBanner } from "@/components/ComicListView";
import { useApiRecently } from "../../app/api";

type SessionList_T = {
  name: string;
  url?: string;
  custom?: boolean;
};

const HomeSessionList: SessionList_T[] = [
  {
    name: "Recently",
    url: "https://hahunavth-express-api.herokuapp.com/api/v1/recently",
  },
  // {
  //   name: "Hot",
  //   url: "https://hahunavth-express-api.herokuapp.com/api/v1/hot",
  // },
];

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export const AppsScreen = ({ navigation, route }: HomeBottomNavigation) => {
  // const { isLoading, data, isError } = useApiRecently("1", {
  //   refetchOnMountOrArgChange: true,
  //   skip: false,
  // });

  // if (isLoading) {
  //   return (
  //     <View>
  //       <ContentLoader
  //         active
  //         title={false}
  //         // avatar
  //         pRows={2}
  //         pHeight={[window?.height / 4, 28, 200]}
  //         pWidth={[window?.width - 24, window?.width - 24, 100]}
  //         loading={true}
  //       />
  //       <View
  //         style={{
  //           flex: 1,
  //           flexDirection: "column",
  //           flexWrap: "wrap",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <View
  //           style={{
  //             width: window?.width / 3,
  //             height: 32,
  //             justifyContent: "center",
  //             flexDirection: "row",
  //           }}
  //         >
  //           <ContentLoader
  //             active
  //             title={false}
  //             pRows={2}
  //             pHeight={[window?.height / 5, 16]}
  //             pWidth={[window?.width / 3 - 24, window?.width / 3 - 24]}
  //             reverse
  //           />
  //         </View>
  //         <View
  //           style={{
  //             width: window?.width / 3,
  //             height: 32,
  //             justifyContent: "center",
  //             flexDirection: "row",
  //           }}
  //         >
  //           <ContentLoader
  //             active
  //             title={false}
  //             pRows={2}
  //             pHeight={[window?.height / 5, 16]}
  //             pWidth={[window?.width / 3 - 24, window?.width / 3 - 24]}
  //             reverse
  //           />
  //         </View>
  //         <View
  //           style={{
  //             width: window?.width / 3,
  //             height: 32,
  //             justifyContent: "center",
  //             flexDirection: "row",
  //           }}
  //         >
  //           <ContentLoader
  //             active
  //             title={false}
  //             pRows={2}
  //             pHeight={[window?.height / 5, 16]}
  //             pWidth={[window?.width / 3 - 24, window?.width / 3 - 24]}
  //             reverse
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  // if (isError)
  //   return (
  //     <View>
  //       <Text>error</Text>
  //     </View>
  //   );

  return (
    <>
      {HomeSessionList.map((session) => (
        <Session
          name={session.name}
          url={session.url || ""}
          key={session.name}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#55efc4",
    alignItems: "center",
    justifyContent: "center",
  },
});
