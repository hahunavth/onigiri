import { Layout } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import { ComicList, ComicProps } from "./ComicList";

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

  const list: ComicProps[] = data.map((item) => {
    return {
      name: item.name,
      posterPath: item.posterPath,
      lastedChapter: item.lastedChapters[0].chapterName,
      author: item.author,
      updateAt: item.updateAt,
      views: item.views,
      follows: item.views,
    };
  });

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
