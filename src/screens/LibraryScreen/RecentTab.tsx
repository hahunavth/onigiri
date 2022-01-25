import { historySelector } from "@/app/historySlice";
import { useAppSelector } from "@/app/hooks";
import { Layout } from "@ui-kitten/components";
import React from "react";
import { Text } from "react-native";

interface Props {}

export const RecentTab = (props: Props) => {
  const history = useAppSelector(historySelector);
  // console.log(Object.keys(history.comics).length);
  return (
    <Layout style={{ flex: 1 }}>
      <Text>Recent tab</Text>
    </Layout>
  );
};
