import { Text, Center } from "native-base";
import React from "react";

type Props = {
  page?: number;
  max?: number;
  loading?: boolean;
};

export const ListFooter = (props: Props) => {
  const { loading, max, page } = props;
  return (
    <Center>
      <Text>{loading ? "loading" : `Page ${page} of ${max}`}</Text>
    </Center>
  );
};
