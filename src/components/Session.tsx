import { Layout } from "@ui-kitten/components";
import React from "react";
import {
  View,
  StyleSheet,
  ListRenderItemInfo,
  FlatList,
  Text,
  ScrollView,
} from "react-native";

import { useApiRecently } from "@/app/api";
import { navigationRef as navigation } from "@/navigators";

import { ComicGrid } from "./ComicListView/ComicGrid";
import { ComicGrid2 } from "./ComicListView/ComicGrid2";
import Categories from "./Common/Categories";
import { FlatlistBanner } from "./ComicListView";
import { BannerLoader, ComicGrid1Loader, ComicGrid2Loader } from "./Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import QuicksandText, { QFontFamily } from "./Common/QuicksandText";

type SessionProps_T = {
  name: string;
  url: string;
  data?: any;
};

export const Session = ({ name, url }: SessionProps_T) => {
  // const navigation = useNavigation<HomeNavigationProps>();

  const { isLoading, data, isError } = useApiRecently("1", {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  if (isLoading)
    return (
      <View style={{ flex: 1 }}>
        <BannerLoader />
        <ComicGrid1Loader />
        <ComicGrid2Loader />
      </View>
    );

  if (isError)
    return (
      <View>
        <Text>Error</Text>
      </View>
    );

  const list = data?.data || [];

  return (
    <Layout style={styles.container} level={"2"}>
      {/* <FlatList
        data={[-1, 0, 1, 2, 3]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: ListRenderItemInfo<number>) => {
          switch (item) {
            case -1:
              return (
                <SafeAreaView style={{ paddingHorizontal: 8, paddingTop: 8 }}>
                  <QuicksandText
                    style={{
                      fontFamily: QFontFamily.Quicksand_600SemiBold,
                      fontSize: 18,
                      color: "#eee",
                    }}
                  >
                    New Release!
                  </QuicksandText>
                  <QuicksandText
                    style={{
                      fontSize: 13,
                      fontFamily: QFontFamily.Quicksand_500Medium,
                      color: "#ccc",
                    }}
                  >
                    Read the lasted comic recommendations!
                  </QuicksandText>
                </SafeAreaView>
              );
            case 0:
              return <FlatlistBanner />;
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
                  onPressMore={() =>
                    navigation.navigate("ComicListScreen", {
                      path: "https://hahunavth-express-api.herokuapp.com/api/v1/recently",
                    })
                  }
                />
              );
            default:
              return null;
          }
        }}
      /> */}
      <FlatList
        // List of component
        data={[
          <SafeAreaView style={{ paddingHorizontal: 8, paddingTop: 8 }}>
            <QuicksandText
              style={{
                fontFamily: QFontFamily.Quicksand_600SemiBold,
                fontSize: 18,
                color: "#eee",
              }}
            >
              New Release!
            </QuicksandText>
            <QuicksandText
              style={{
                fontSize: 13,
                fontFamily: QFontFamily.Quicksand_500Medium,
                color: "#ccc",
              }}
            >
              Read the lasted comic recommendations!
            </QuicksandText>
          </SafeAreaView>,
          <FlatlistBanner />,
          <Categories />,
          <ComicGrid
            list={list}
            name="Most popular comic"
            subtitle="Lots of interesting comic here"
            limit={6}
            onPressMore={() =>
              navigation.navigate("ComicListScreen", {
                path: "https://hahunavth-express-api.herokuapp.com/api/v1/recently",
              })
            }
          />,
          <ComicGrid2
            list={list}
            name="Update manga"
            subtitle="Don't miss this week update"
            limit={4}
            onPressMore={() =>
              navigation.navigate("ComicListScreen", {
                path: "https://hahunavth-express-api.herokuapp.com/api/v1/recently",
              })
            }
          />,
          // () => <View />,
        ]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: ListRenderItemInfo<React.ReactElement>) => {
          const Item = item;
          return <>{Item}</>;
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
