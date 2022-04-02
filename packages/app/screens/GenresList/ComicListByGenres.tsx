import { View, Text } from "native-base";
import React from "react";
import { useApiFindByGenres } from "app/store/api";
import useInteraction from "app/hooks/useInteraction";
import { Loading } from "app/components/EmptyPage/Loading";
import { ComicVerticalList } from "app/components/Comics/ComicVerticalList";
import { ComicListByGenresProps } from "./type";
import { GTTScreenProps } from "./GenresTopTabNav";

const ComicListByGenres = (props: GTTScreenProps) => {
  const { genres } = props.route.params;
  // console.log(props)

  const { isLoading, data } = useApiFindByGenres({
    genres: genres,
    page: 1
  });

  const { loading } = useInteraction();

  return (
    <View flex={1}>
      {isLoading || loading ? (
        <Loading text="Fetching" />
      ) : (
        <ComicVerticalList list={data?.data || []} />
      )}
    </View>
  );
};

export default ComicListByGenres;
