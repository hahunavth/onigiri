import { resComicItem_T } from "@/types/api";
import React from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { useApiRecently } from "../../app/api";

// Decrepted

interface Props {
  data: resComicItem_T;
}

const FlatlistBannerItem = ({ data }: Props) => {
  const { width, height } = useWindowDimensions();
  // console.log(data.posterUrl);

  return (
    <View
      style={{ flex: 1, width: width - 16, height: height / 3, padding: 8 }}
    >
      {/* <Image source={require("../../assets/logo.jpg")} /> */}
      {/* // <Image
    //   source={{ uri: data?.posterUrl || "" }}
    //   style={{ alignSelf: "stretch", width: width, height: 200 }}
    // /> */}
    </View>
  );
};

export default FlatlistBannerItem;
