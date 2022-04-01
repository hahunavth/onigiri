import { View, Text } from "native-base";
import React from "react";
import { InteractionManager } from "react-native";
import { FindByNameResultScreenProps } from "../../navigators/StackNav";
import { useApiFindComic, useApiFindComicByName } from "../../store/api";
import { ComicVerticalList } from "app/components/Comics/ComicVerticalList";
import { Loading } from "../../components/EmptyPage/Loading";
import useInteraction from "../../hooks/useInteraction";
import { NotFound } from "../../components/EmptyPage";
import { ComicListHeaderWrapper } from "../../components/NavigationHeader";

export const FindByNameResultScreen = (props: FindByNameResultScreenProps) => {
  const { name } = props.route.params;

  // FIXME: RESPONSE DATA SHAPE IS UNKNOWN, CHANGE THE SERVER
  const { isLoading, data } = useApiFindComicByName(name);
  // console.log(data?.data ? data?.data[0][0] : null)

  const { loading } = useInteraction({});

  // return null;

  return (
    <ComicListHeaderWrapper data={data?.data || []}></ComicListHeaderWrapper>
  );

  return (
    <View flex={1}>
      {/* <Text>{name}</Text> */}
      {isLoading || loading ? (
        <Loading text="Fetching" />
      ) : data?.data?.length ? (
        <ComicVerticalList list={data?.data || []} />
      ) : (
        <NotFound />
      )}
    </View>
  );
};
