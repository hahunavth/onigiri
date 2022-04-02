import { View, Text, Toast } from "native-base";
import React from "react";
import { GenresScreenProps } from "app/navigators/StackNav";
import { useApiFindByGenres } from "app/store/api";
import useInteraction from "app/hooks/useInteraction";
import { Loading } from "app/components/EmptyPage/Loading";
import { ComicVerticalList } from "app/components/Comics/ComicVerticalList";
import { GENRES_LIST } from "app/utils/findOption";

export const Genres = (props: GenresScreenProps) => {
  const { genresName } = props.route.params;

  const id = GENRES_LIST.find((item) => item.item === genresName);

  const { isLoading, data } = useApiFindByGenres({
    genres: id?.id || 0,
    page: 1
  });

  if (!id) {
    Toast.show({
      title: "Not found this genres!"
    });
  }

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
