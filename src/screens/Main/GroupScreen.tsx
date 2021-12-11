import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useQuery } from "react-query";

import { ComicList, ComicProps } from "@/components/ComicListView/ComicList";

type resComicItem_T = {
  kind?: string;
  author?: string;
  status?: string;
  views?: string;
  follows?: string;
  updateAt?: string;
  name?: string;
  posterPath?: string;
  path?: string;
  id?: string;
  lastedChapters?: [
    {
      chapterName: string;
      chapterUrl: string;
      updateAt: string;
    }
  ];
};

export const GroupScreen = () => {
  const {
    data: { data },
    error,
    isLoading,
    isError,
  } = useQuery<{ data: resComicItem_T[] }>("recently", () =>
    fetch("https://hahunavth-express-api.herokuapp.com/api/v1/recently").then(
      (res) => res.json()
    )
  );

  if (isLoading) return <View></View>;

  if (isError) return <View></View>;

  const list: ComicProps[] =
    data?.map((item, id) => {
      return {
        name: item.name,
        posterPath: item.posterPath,
        lastedChapter:
          (item.lastedChapters && item.lastedChapters[0]?.chapterName) || "",
        author: item.author,
        updateAt: item.updateAt,
        views: item.views,
        follows: item.views,
        index: id,
        path: item.path || "",
      };
    }) || [];

  return (
    <Layout style={styles.container}>
      <ComicList list={list} name={"Recently"} />
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
