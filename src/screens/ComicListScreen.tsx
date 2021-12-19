//import liraries
import { ComicList } from "@/components/ComicListView/ComicList";
import CustomList from "@/components/Refresh/CustomList";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import ContentLoader from "react-native-easy-content-loader";
import { useQuery } from "react-query";
import { useApiRecently } from "../app/api";
import { ComicListScreenProps } from "../navigators/StackNavigator";

const ComicListScreen = ({ navigation, route }: ComicListScreenProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // const { data, isLoading, isError, refetch } = useQuery(
  //   "recently",
  //   () => fetch(route.params.path || "").then((res) => res.json()),
  //   {
  //     refetchOnWindowFocus: false,
  //     enabled: false,
  //   }
  // );

  const { data, isLoading, isError, refetch } = useApiRecently("1");

  // console.log(isLoading);

  useEffect(() => {
    refetch();
    // console.log(isLoading + "2");
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

  // return (
  //   <View style={styles.container}>
  //     <CustomList />
  //   </View>
  // );

  return (
    <View
      // style={styles.container}
      style={{ height: Dimensions.get("window").height }}
    >
      <View
        style={{
          position: "absolute",
          width: Dimensions.get("window").width,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>aaaaaa aaaaaa aaaaaa</Text>
      </View>
      <FlatList
        data={[1]}
        renderItem={() => <ComicList list={data?.data} name="" />}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        onLayout={(e) => console.log(e.nativeEvent)}
        style={{ backgroundColor: "transparent" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            // progressBackgroundColor="#ff0000"
            // enabled={false}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
    backgroundColor: "#ecf0f1",
    padding: 0,
  },
});

export default ComicListScreen;
