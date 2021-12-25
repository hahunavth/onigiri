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
import ContentLoader from "react-native-easy-content-loader";
import { useQuery } from "react-query";
import { useApiRecently } from "../app/api";
import { ComicListScreenProps } from "../navigators/StackNavigator";

const ComicListScreen = ({ navigation, route }: ComicListScreenProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // Only increase when scroll end
  const [page, setPage] = useState(1);
  // const [initBatchStatus, setInitBatchStatus] = useState('pending')
  const [nextBatchStatus, setNextBatchStatus] = useState<
    "pending" | "fulfilled"
  >("pending");
  const [comicList, setComicList] = useState<resComicItem_T[]>([]);

  const { data, isLoading, isError, refetch } = useApiRecently(page.toString());

  useEffect(() => {
    if (data?.data && !isLoading) {
      // console.log(`${data.data.length} ${comicList.length}`);
      setComicList((comicList) => comicList.concat(data.data));
      setNextBatchStatus("fulfilled");
    }
  }, [data]);

  const endReached = useCallback(() => {
    if (!isLoading && data?.data && nextBatchStatus === "fulfilled") {
      setNextBatchStatus("pending");
      setPage((page) => page + 1);
    }
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

  if (isLoading || isError)
    return (
      <ContentLoader
        active
        title={true}
        // avatar
        // pRows={2}
        // pHeight={[window?.height / 4, 28, 200]}
        // pWidth={[window?.width - 24, window?.width - 24, 100]}
        loading={true}
      />
    );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[1]}
        renderItem={() => <ComicList list={comicList} name="" />}
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
    </SafeAreaView>
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

export default ComicListScreen;
