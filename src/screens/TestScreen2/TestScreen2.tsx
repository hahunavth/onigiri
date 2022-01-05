import { useApiComicDetail } from "@/app/api";
import { CollapseHeader } from "@/components/CollapseHeader";
import React from "react";
import { View, Text } from "react-native";

interface Props {}

export const TestScreen2 = (props: Props) => {
  const { data, isLoading } = useApiComicDetail(
    "/truyen-tranh/tu-la-vo-than-35627"
  );

  if (isLoading) {
    return <View></View>;
  }

  // console.log(data);

  return (
    <View style={{ flex: 1 }}>
      <CollapseHeader comic={data} />
    </View>
  );
};
