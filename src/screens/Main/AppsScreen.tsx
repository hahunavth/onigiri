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
import { ComicList } from "@/components/ComicListView/ComicList";
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
import FlatlistBanner from "@/components/ComicListView/FlatlistBanner";
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
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [dimensions, setDimensions] = useState({ window, screen });

  const { isLoading, data, isError } = useApiRecently("1");

  // const result = useQueries(
  //   HomeSessionList.map((session) => ({
  //     queryKey: session.name,
  //     queryFn: () => fetch(session.url || "").then((res) => res.json()),
  //   }))
  // );

  // const recentlyList = result[0].data as ApiRespone_T<Array<resComicItem_T>>;
  // const isLoading = result[0].isLoading;
  // const error = result[0].error;
  // const isError = result[0].isError;

  // useEffect(() => {
  //   const onChange = ({
  //     window,
  //     screen,
  //   }: {
  //     window: ScaledSize;
  //     screen: ScaledSize;
  //   }) => {
  //     setDimensions(() => ({
  //       window,
  //       screen,
  //     }));
  //     Dimensions.addEventListener("change", onChange);
  //     return () => Dimensions.removeEventListener("change", onChange);
  //   };
  // }, []);

  // return (
  //   <View>
  //     <FlatlistBanner />
  //   </View>
  // );

  if (isLoading) {
    return (
      <View>
        <ContentLoader
          active
          title={false}
          // avatar
          pRows={2}
          pHeight={[window?.height / 4, 28, 200]}
          pWidth={[window?.width - 24, window?.width - 24, 100]}
          loading={true}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: window?.width / 3,
              height: 32,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <ContentLoader
              active
              title={false}
              pRows={2}
              pHeight={[window?.height / 5, 16]}
              pWidth={[window?.width / 3 - 24, window?.width / 3 - 24]}
              reverse
            />
          </View>
          <View
            style={{
              width: window?.width / 3,
              height: 32,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <ContentLoader
              active
              title={false}
              pRows={2}
              pHeight={[window?.height / 5, 16]}
              pWidth={[window?.width / 3 - 24, window?.width / 3 - 24]}
              reverse
            />
          </View>
          <View
            style={{
              width: window?.width / 3,
              height: 32,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <ContentLoader
              active
              title={false}
              pRows={2}
              pHeight={[window?.height / 5, 16]}
              pWidth={[window?.width / 3 - 24, window?.width / 3 - 24]}
              reverse
            />
          </View>
        </View>
      </View>
    );
  }

  if (isError)
    return (
      <View>
        <Text>error</Text>
      </View>
    );

  // return <View></View>;

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
