import { historySelector } from "@/app/historySlice";
import { useAppSelector } from "@/app/hooks";
import { Layout } from "@ui-kitten/components";
import React from "react";
import { View, Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface Props {}

export const SubscribeTab = (props: Props) => {
  const history = useAppSelector(historySelector);
  // console.log(history.comics);
  return (
    <Layout style={{ flex: 1 }}>
      {/* <Text>Recent tab</Text> */}
      <FlatList
        style={{ flex: 1 }}
        data={history.subscribeComics.map((path) => history.comics[path])}
        renderItem={({ item, index }) => {
          if (!item) return null;
          return (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Image
                source={{ uri: item.posterUrl }}
                style={{ width: 100, height: 160 }}
              />
              <View>
                <Text>{item.title}</Text>
                <Text>{item.lastedReadChapter}</Text>
                <Text>{item.author}</Text>
                <Text>{item.status}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </Layout>
  );
};
