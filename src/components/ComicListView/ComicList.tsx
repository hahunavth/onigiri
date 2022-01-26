import React, { useCallback } from "react";
import { StyleSheet, View, Image, ListRenderItemInfo } from "react-native";
import { Card, Layout, List, Text, TextProps } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { resComicItem_T } from "@/types/api";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigatorHeader from "../Common/NavigatorHeader";

//
// export type ComicProps = {
//   name?: string;
//   posterPath?: string;
//   lastedChapter?: string;
//   author?: string;
//   updateAt?: string;
//   views?: string;
//   follows?: string;
//   path: string;
//   index: number;
//   kind?: string[];
// };

export type comicListProps = {
  list: resComicItem_T[] | undefined;
  name: string;
  subtitle?: string;
  limit?: number;
  onPressMore?: () => any;
};

export const ComicList = ({ list, name, limit }: comicListProps) => {
  const navigation: any = useNavigation();

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

  const renderItem = useCallback(
    (info: ListRenderItemInfo<resComicItem_T>) => {
      // console.log("render ", info.item.name);
      return (
        <TouchableOpacity
          onPress={() => {
            // console.log(navigation.getState());
            navigation.navigate("ComicDetails", {
              path: info.item.path,
              comic: info.item,
            });
          }}
        >
          <Layout style={styles.container}>
            <Layout style={styles.layoutContainer}>
              <Layout style={{ paddingRight: 15 }}>
                <Image
                  style={styles.poster}
                  source={{
                    uri:
                      info.item.posterUrl ||
                      "http://st.imageinstant.net/data/comics/32/vo-luyen-dinh-phong.jpg",
                  }}
                />
              </Layout>
              <Layout style={styles.infoWrapper}>
                {info.item.name && (
                  <Text
                    category={"s1"}
                    // status={info}
                    // style={{ textDecorationColor: "#fff" }}
                  >
                    {info.item.name}
                  </Text>
                )}
                <Layout style={styles.detailWrapper}>
                  <Text category={"p1"}>
                    Author: {info.item.author || "Dang cap nhat"}
                  </Text>
                  <Text category={"p1"}>
                    Lasted Chapter:{" "}
                    {(info.item.lastedChapters &&
                      info.item.lastedChapters[0].chapterName) ||
                      "Haha"}
                  </Text>
                  <Text category={"p1"}>
                    Updated At: {info.item.updatedAt || "Not found"}
                  </Text>
                </Layout>
              </Layout>
            </Layout>
            {/* </Card> */}
          </Layout>
        </TouchableOpacity>
      );
    },
    [list]
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1, position: "relative" }}>
        {/* <NavigatorHeader
          title="Comic List"
          headerContainerStyle={{
            position: "absolute",
            zIndex: 1000,
            top: 0,
            width: "100%",
            // height: 30,
          }}
        /> */}
        <Layout>
          <List
            style={styles.listContainer}
            contentContainerStyle={styles.contentContainer}
            data={list}
            scrollEnabled={false}
            renderItem={renderItem}
            initialNumToRender={limit}
            // ListHeaderComponent={renderItemHeader}
            // ListHeaderComponentStyle={{
            //   position: "absolute",
            //   top: 100,
            //   left: 0,
            //   right: 0,
            //   zIndex: 100,
            // }}4
          />
        </Layout>
      </SafeAreaView>
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
