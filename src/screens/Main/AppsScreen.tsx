import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { ComicList } from "@/components/ComicListView/ComicList";
import { Session } from "@/components/Session";

import { HomeBottomNavigation } from "../../navigators/BottomMenu";

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

export const AppsScreen = ({ navigation, route }: HomeBottomNavigation) => {
  const { data, error, isLoading, isError } = useQuery("recentlyl", () =>
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      res.json()
    )
  );

  // console.log("🚀 ~ file: AppsScreen.tsx ~ line 16 ~ AppsScreen ~ data", data);

  if (isError) {
    console.log(
      "🚀 ~ file: AppsScreen.tsx ~ line 32 ~ AppsScreen ~ error",
      error
    );
    return (
      <View>
        <Text>Some thing error</Text>
      </View>
    );
  }

  if (isLoading)
    return (
      <View>
        <Text>loading</Text>
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
    backgroundColor: "#55efc4",
    alignItems: "center",
    justifyContent: "center",
  },
});
