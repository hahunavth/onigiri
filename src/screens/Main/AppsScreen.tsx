import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ScaledSize,
} from "react-native";
import { useQuery } from "react-query";
import { ComicList } from "@/components/ComicListView/ComicList";
import { Session } from "@/components/Session";
import ContentLoader, { Facebook } from "react-native-easy-content-loader";

import { HomeBottomNavigation } from "../../navigators/Main/BottomMenu";

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
];

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export const AppsScreen = ({ navigation, route }: HomeBottomNavigation) => {
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [dimensions, setDimensions] = useState({ window, screen });
  const { data, error, isLoading, isError } = useQuery("recentlyl", () =>
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      res.json()
    )
  );

  // TODO: Ignore fetch api from json placeholder, use HOC loading state
  // TODO: Refactor all request to this file

  useEffect(() => {
    const onChange = ({
      window,
      screen,
    }: {
      window: ScaledSize;
      screen: ScaledSize;
    }) => {
      setDimensions(() => ({
        window,
        screen,
      }));
      Dimensions.addEventListener("change", onChange);
      return () => Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  // console.log("🚀 ~ file: AppsScreen.tsx ~ line 16 ~ AppsScreen ~ data", data);

  if (isLoading) {
    console.log(
      "🚀 ~ file: AppsScreen.tsx ~ line 32 ~ AppsScreen ~ error",
      error
    );
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
