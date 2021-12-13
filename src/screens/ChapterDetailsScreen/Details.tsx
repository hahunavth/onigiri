import QuicksandText from "@/components/Common/QuicksandText";
import {
  detailcomicDetailsProps,
  detailComicDetailsTopBarProps,
} from "@/navigator/Main/ComicDetailsTopTabNavigator";
import React from "react";
import { View } from "react-native";
import { useApiComicDetail } from "../../app/api";
import DetailsBar from "./DetailsBar";

interface DetailsProps {
  path: string;
}

const Details: React.FunctionComponent<detailcomicDetailsProps> = (props) => {
  const { data, isSuccess } = useApiComicDetail(props?.route?.params?.path);

  return (
    <View>
      <DetailsBar />
      <QuicksandText>{data?.detail}</QuicksandText>
    </View>
  );
};

export default Details;
