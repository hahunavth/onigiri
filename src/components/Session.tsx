import { Layout } from "@ui-kitten/components";
import React from "react";
import {
  View,
  StyleSheet,
  SectionList,
  SectionListRenderItemInfo,
  ListRenderItemInfo,
  FlatList,
  Text,
} from "react-native";
import { useQuery } from "react-query";
import { ComicList, ComicProps } from "./ComicListView/ComicList";
import { resComicItem_T } from "../types/api";
import { ComicGrid } from "./ComicListView/ComicGrid";
import { ScrollView } from "react-native-gesture-handler";
import { ComicGrid2 } from "./ComicListView/ComicGrid2";
import Banner from "./ComicListView/Banner";
import { useNavigation } from "@react-navigation/native";
import {
  HomeBottomNavigation,
  HomeNavigationProps,
} from "src/navigators/Main/BottomMenu";
import ErrorView from "./Common/ErrorView";
import Categories from "./Common/Categories";

type SessionProps_T = {
  name: string;
  url: string;
};

export const Session = ({ name, url }: SessionProps_T) => {
  const navigation = useNavigation<HomeNavigationProps>();

  const { data, error, isLoading, isError } = useQuery<resComicItem_T[]>(
    name,
    () => fetch(url).then((res) => res.json())
  );

  if (isLoading) return <View></View>;

  console.log(error);
  if (isError)
    return (
      <View>
        <Text>Error</Text>
      </View>
    );

  const list: ComicProps[] =
    (data &&
      data.map((item, index) => {
        return {
          name: item.name,
          posterPath: item.posterPath,
          lastedChapter:
            item.lastedChapters && item.lastedChapters[0]?.chapterName,
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

  // return (
  //   <Layout style={styles.container}>
  //     <SectionList
  //       sections={[
  //         {
  //           type: "ComicGrid",
  //           data: list,
  //         },
  //         {
  //           type: "ComicGrid2",
  //           data: list,
  //         },
  //         // {
  //         //   type: "ComicList",
  //         //   data: [{}],
  //         // },
  //       ]}
  //       renderItem={({
  //         item,
  //         section,
  //       }: SectionListRenderItemInfo<ComicProps>) => {
  //         switch (section.type) {
  //           case "ComicGrid":
  //             return <ComicGridRenderItem item={item} />;
  //           case "ComicGrid2":
  //             return <ComicGridRenderItem2 item={item} />;
  //           // case "ComicList":
  //           // return <ComicList />;
  //           default:
  //             return null;
  //         }
  //       }}
  //       keyExtractor={(item, index) => index.toString()}
  //     />
  //   </Layout>
  // );

  return (
    <Layout style={styles.container}>
      <FlatList
        data={[0, 1, 2, 3, 4]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: ListRenderItemInfo<number>) => {
          switch (item) {
            case 0:
              return <Banner data={BannerData} />;
            case 1:
              return <Categories />;
            case 2:
              return (
                <ComicGrid
                  list={list}
                  name="Recently"
                  limit={6}
                  onPressMore={() =>
                    navigation.navigate("ComicListScreen", {
                      path: "https://hahunavth-express-api.herokuapp.com/api/v1/recently",
                    })
                  }
                />
              );
            case 3:
              return (
                <ComicGrid2
                  list={list}
                  name="recently"
                  limit={4}
                  onPressMore={
                    () =>
                      navigation.navigate("ComicListScreen", {
                        path: "https://hahunavth-express-api.herokuapp.com/api/v1/recently",
                      })
                    // console.log("a")
                  }
                />
              );
            default:
              return null;
          }
        }}
      />
      {/* <ComicList list={list} name={"Recently"} /> */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const BannerData = [
  {
    title: "Title Slide1",
    url: "https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    id: 1,
  },
  {
    title: "Title slide 2",
    url: "https://images.unsplash.com/photo-1534349735944-2b3a6f7a268f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    id: 2,
  },
  {
    title: "Title Slide 3",
    url: "https://images.unsplash.com/photo-1513451732213-5775a1c40335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    id: 3,
  },
];
