//import liraries
import { ComicList } from "@/components/ComicListView/ComicList";
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ContentLoader from "react-native-easy-content-loader";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { ComicListScreenProps } from "src/navigators/StackNavigator";

const ComicListScreen = ({ navigation, route }: ComicListScreenProps) => {
  const { data, isLoading, isError } = useQuery("recently", () =>
    fetch(route.params.path || "").then((res) => res.json())
  );

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
    <View style={styles.container}>
      <FlatList
        data={[1]}
        renderItem={() => <ComicList list={data} name="" />}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#2c3e50",
  },
});

export default ComicListScreen;
