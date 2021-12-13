import React from "react";
import { Button, StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import QuicksandText from "@/components/Common/QuicksandText";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { fetchRecentlyAsync, selectHome } from "../../app/homeSlice";
import { useApiRecently } from "../../app/api";
import ErrorView from "@/components/Common/ErrorView";

export const DashboardScreen = () => {
  // const dispatch = useAppDispatch();
  // const selector = useAppSelector(selectHome);

  // React.useEffect(() => {
  //   dispatch(fetchRecentlyAsync(1)).then(() => console.log(typeof selector));
  // }, [dispatch]);

  const { data, isError, isFetching, isSuccess, refetch, error } =
    useApiRecently("1");

  if (isError) return <ErrorView errMsg="=" />;

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <QuicksandText category="h1">HOME</QuicksandText>
      <Text>{String(isSuccess)}</Text>
      <Text>{/* {error?.status} {JSON.stringify(error.data)} */}</Text>
      {isSuccess ? <QuicksandText>{data?.data[0].author}</QuicksandText> : null}
      <Button
        onPress={() => refetch()}
        title={data?.data[0].status || "a"}
      ></Button>
    </Layout>
  );
};
