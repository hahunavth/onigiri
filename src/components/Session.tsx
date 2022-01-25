import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";
import React from "react";
import { View, ListRenderItemInfo, FlatList, Text } from "react-native";

import { useApiHot, useApiRecently } from "@/app/api";
import { navigationRef as navigation } from "@/navigators";

import { ComicGrid } from "./ComicListView/ComicGrid";
import { ComicGrid2 } from "./ComicListView/ComicGrid2";
import Categories from "./Common/Categories";
import { FlatlistBanner } from "./ComicListView";
import { BannerLoader, ComicGrid1Loader, ComicGrid2Loader } from "./Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import QuicksandText, { QFontFamily } from "./Common/QuicksandText";
import { colorScheme, ColorSchemeE } from "@/styles/colorScheme";
import { resComicItem_T } from "@/types";

type SessionProps_T = {
  name: string;
  url: string;
  data?: any;
};

export const Session = ({ name, url }: SessionProps_T) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={styles.container} level={"2"}>
      <FlatList
        // List of component
        data={[
          <SafeAreaView style={styles.bannerHeader}>
            <QuicksandText style={styles.textPrimary}>
              New Release!
            </QuicksandText>
            <QuicksandText style={styles.textSecondary}>
              Read the lasted comic recommendations!
            </QuicksandText>
          </SafeAreaView>,
          <FlatlistBanner />,
          <Categories />,
          <SessionList1 />,
          <SessionList2 />,
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

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  bannerHeader: { paddingHorizontal: 8, paddingTop: 8 },
  textPrimary: {
    fontFamily: QFontFamily.Quicksand_600SemiBold,
    fontSize: 18,
    color: ColorSchemeE["text-basic-color"],
  },
  textSecondary: {
    fontSize: 13,
    fontFamily: QFontFamily.Quicksand_500Medium,
    color: ColorSchemeE["text-hint-color"],
  },
});

const SessionList1 = () => {
  const { data, isLoading } = useApiHot("1", {});

  return (
    <>
      {isLoading ? (
        <ComicGrid1Loader />
      ) : (
        <ComicGrid
          list={data?.data}
          name="Most popular comic"
          subtitle="Lots of interesting comic here"
          limit={6}
          onPressMore={() =>
            navigation.navigate("ComicListScreen", {
              path: "https://hahunavth-express-api.herokuapp.com/api/v1/hot",
            })
          }
        />
      )}
    </>
  );
};

const SessionList2 = () => {
  const { data, isSuccess } = useApiRecently("1", {});

  return (
    <>
      {isSuccess ? (
        <ComicGrid2
          list={data?.data || []}
          name="Update manga"
          subtitle="Don't miss this week update"
          limit={4}
          onPressMore={() =>
            navigation.navigate("ComicListScreen", {
              path: "https://hahunavth-express-api.herokuapp.com/api/v1/recently",
            })
          }
        />
      ) : (
        <ComicGrid2Loader />
      )}
    </>
  );
};
