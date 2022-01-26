//import liraries
import { ComicList } from "@/components/ComicListView/ComicList";
import CustomList from "@/components/Refresh/CustomList";
import { resComicItem_T } from "@/types/api";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
// import ContentLoader from "react-native-easy-content-loader";

import { useApiRecently } from "@/app/api";
import { ComicListScreenProps } from "@/navigators/StackNavigator";
import { Layout, withStyles } from "@ui-kitten/components";

export const ComicListScreen = ({
  navigation,
  route,
}: ComicListScreenProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // Only increase when scroll end
  const [page, setPage] = useState(1);
  // const [initBatchStatus, setInitBatchStatus] = useState('pending')
  const [nextBatchStatus, setNextBatchStatus] = useState<
    "pending" | "fulfilled"
  >("pending");
  const [comicList, setComicList] = useState<resComicItem_T[][]>([]);

  const { data, isLoading, isError, refetch, isFetching, isSuccess } =
    useApiRecently(page.toString());

  useEffect(() => {
    console.log(
      " useEffect ",
      !!data?.data,
      isSuccess,
      !!(page === comicList.length + 1)
    );
    if (data?.data && isSuccess && page === comicList.length + 1) {
      // console.log(`${data.data.length} ${comicList.length}`);
      setNextBatchStatus(() => "fulfilled");
      setComicList((comicList) => {
        comicList.push(data.data);
        return comicList;
      });
      setPage(page + 1);
    }
  }, [isSuccess, page]);
  // console.log(comicList.length);
  // console.log(page);

  const endReached = useCallback(() => {
    console.log(
      "🚀 ~ file: ComicListScreen.tsx ~ line 50 ~ endReached ~ ",
      isSuccess,
      !!data?.data,
      // !!(nextBatchStatus === "fulfilled")
      page,
      comicList.length
    );
    if (isSuccess && data?.data && page === comicList.length) {
      setPage(page + 1);
      setNextBatchStatus("pending");
    }
    console.log(
      "🚀 ~ file: ComicListScreen.tsx ~ line 52 ~ endReached ~ endReached"
    );
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  // if (isFetching || isError) return null;

  return (
    <Layout level={"3"} style={styles.container}>
      <FlatList
        data={comicList}
        renderItem={({ item }) => <ComicList list={item} name="" />}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        // onLayout={(e) => console.log(e.nativeEvent)}
        // style={{ backgroundColor: "transparent" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            // progressBackgroundColor="#ff0000"
            // enabled={false}
          />
        }
        onEndReached={endReached}
        onEndReachedThreshold={0.5}
      />
      {nextBatchStatus === "pending" ? (
        <ActivityIndicator
          style={{
            // width: 10,
            // height: 20,
            marginBottom: 20,
            // zIndex: 10,
          }}
          size={"small"}
          // animating={true}
          color={"red"}
        />
      ) : null}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    // paddingTop: 20,
    backgroundColor: "#ecf0f1",
    // padding: 0,
  },
});
