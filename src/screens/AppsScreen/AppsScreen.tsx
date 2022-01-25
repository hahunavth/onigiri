import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ScaledSize,
  SafeAreaView,
} from "react-native";
import { useQueries, useQuery } from "react-query";
import { ComicList } from "@/components/ComicListView";
import { Session } from "@/components/Session";

import { HomeBottomNavigation } from "@/navigators/Main/BottomMenu";

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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {HomeSessionList.map((session) => (
        <Session
          name={session.name}
          url={session.url || ""}
          key={session.name}
        />
      ))}
    </SafeAreaView>
  );
};
