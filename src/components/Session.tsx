import { Layout } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import { ComicList, ComicProps } from "./ComicListView/ComicList";
import { resComicItem_T } from "../types/api";
import { Grid } from "./ComicListView/ComicIconList";
import { ScrollView } from "react-native-gesture-handler";

type SessionProps_T = {
  name: string;
  url: string;
};

export const Session = ({ name, url }: SessionProps_T) => {
  const { data, error, isLoading, isError } = useQuery<resComicItem_T[]>(
    name,
    () => fetch(url).then((res) => res.json())
  );

  if (isLoading) return <View></View>;

  if (isError) return <View></View>;

  const list: ComicProps[] =
    (data &&
      data.map((item, index) => {
        return {
          name: item.name,
          posterPath: item.posterPath,
          lastedChapter:
            item.lastedChapters && item.lastedChapters[0].chapterName,
          author: item.author,
          updateAt: item.updateAt,
          views: item.views,
          follows: item.views,
          path: item.path || "",
          index,
          kind: item.kind,
        };
      })) ||
    [];

  return (
    <Layout style={styles.container}>
      {/* <ComicIconList list={list} name={"Icon test"} /> */}
      <Grid list={list} name="AA" limit={6} />
      {/* <ComicList list={list} name={"Recently"} /> */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#74b9ff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
