import { View, Text } from "native-base";
import React from "react";
import { InteractionManager } from "react-native";
import { FindByNameResultScreenProps } from "app/navigators/StackNav";
import { useApiFindComic, useApiFindComicByName } from "app/store/api";
import { ComicVerticalList } from "app/components/Comics/ComicVerticalList";
import { Loading } from "app/components/EmptyPage/Loading";
import useInteraction from "app/hooks/useInteraction";
import { NotFound } from "app/components/EmptyPage";
import { ComicListHeaderWrapper } from "app/components/NavigationHeader";

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
