import { Layout } from "@ui-kitten/components";
import React from "react";
import {
  View,
  StyleSheet,
  ListRenderItemInfo,
  FlatList,
  Text,
} from "react-native";

import { useApiRecently } from "@/app/api";
import { navigationRef as navigation } from "@/navigators";

import { ComicGrid } from "./ComicListView/ComicGrid";
import { ComicGrid2 } from "./ComicListView/ComicGrid2";
import Categories from "./Common/Categories";
import { FlatlistBanner } from "./ComicListView";
import { BannerLoader, ComicGrid1Loader, ComicGrid2Loader } from "./Loader";

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
      <FlatList
        data={[0, 1, 2, 3]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: ListRenderItemInfo<number>) => {
          switch (item) {
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
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
