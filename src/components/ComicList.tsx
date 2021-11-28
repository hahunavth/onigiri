import React from "react";
import { StyleSheet, View, Image, ListRenderItemInfo } from "react-native";
import { Card, Layout, List, Text } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";

const data = new Array(8).fill({
  title: "Item",
});
//
export type ComicProps = {
  name?: string;
  posterPath?: string;
  lastedChapter?: number | string;
  author?: string;
  updateAt?: string;
  views?: string;
  follows?: string;
};

export type comicListProps = {
  list: ComicProps[];
  name: string;
};

export const ComicList = ({ list, name }: comicListProps) => {
  const renderItemHeader = () => (
    <Layout style={styles.headerWrapper}>
      <Text
        category="h5"
        style={{
          fontWeight: "500",
          color: "#ccc",
          paddingVertical: 2,
        }}
      >
        {name || "Hello"}
      </Text>
    </Layout>
  );

  const renderItemFooter = (footerProps) => (
    <Text {...footerProps}>By Wikipedia</Text>
  );

  const renderItem = (info: ListRenderItemInfo<ComicProps>) => (
    <TouchableOpacity onPress={() => {}}>
      <Layout style={styles.container}>
        {/* // <Card
    //   style={styles.item}
    //   status="basic"
    //   // header={(headerProps) => renderItemHeader(headerProps, info)}
    //   // footer={renderItemFooter}
    // > */}
        <Layout style={styles.layoutContainer}>
          <Layout style={{ paddingRight: 15 }}>
            <Image
              style={styles.poster}
              source={{
                uri:
                  info.item.posterPath ||
                  "http://st.imageinstant.net/data/comics/32/vo-luyen-dinh-phong.jpg",
              }}
            />
          </Layout>
          <Layout style={styles.infoWrapper}>
            <Text
              category={"s1"}
              // status={info}
              // style={{ textDecorationColor: "#fff" }}
            >
              {info.item.name || "Haha"}
            </Text>
            <Layout style={styles.detailWrapper}>
              <Text category={"p1"}>Author: {info.item.author || "Haha"}</Text>
              <Text category={"p1"}>
                Lasted Chapter: {info.item.lastedChapter || "Haha"}
              </Text>
              <Text category={"p1"}>
                Updated At: {info.item.updateAt || "Haha"}
              </Text>
            </Layout>
          </Layout>
        </Layout>
        {/* </Card> */}
      </Layout>
    </TouchableOpacity>
  );

  return (
    <>
      <List
        style={styles.listContainer}
        contentContainerStyle={styles.contentContainer}
        data={list}
        renderItem={renderItem}
        ListHeaderComponent={renderItemHeader}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {},
  container: {
    padding: 6,
    borderColor: "white",
    borderTopColor: "#eee",
    borderWidth: 1,

    // maxHeight: 320,
  },
  contentContainer: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  item: {
    // marginVertical: 2,
  },
  layoutContainer: {
    flex: 1,
    flexDirection: "row",
  },
  layout: {
    // flex: 1,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    // marginLeft: 8,
  },
  poster: {
    width: 72,
    height: 108,
  },
  detailWrapper: {
    marginLeft: 5,
    opacity: 0.8,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: "space-around",
  },
  headerWrapper: {
    backgroundColor: "#333333",
    paddingLeft: 10,
  },
});
