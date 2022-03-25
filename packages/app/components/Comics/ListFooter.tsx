import { View, Text } from "native-base";
import React from "react";
import { Loading } from "../EmptyPage";

type Props = {
  // loading?: boolean;
  end?: boolean;
};

const ListFooter = (props: Props) => {
  return <View h={120}>{props.end ? <Text>End</Text> : <Loading />}</View>;
};

export default ListFooter;
