import React from "react";
import {
  useApiInfinityFindComicByGenresName,
  useApiInfinityHot,
  useApiInfinityRecently,
  useApiInfinityTopWeek
} from "app/hooks/useApiInfinityItem";
import useInteraction from "app/hooks/useInteraction";
import { useApiLazyFindByGenresName } from "app/store/api";
import { ComicVerticalList } from "./Comics/ComicVerticalList";
import { Loading } from "./EmptyPage";

type Props = {};
export const HomeSessionDetailListRecently = (props: Props) => {
  const { loading } = useInteraction();

  const { fetchNextPage, results } = useApiInfinityRecently();
  // return <Loading />;
  return (
    <>
      {loading ? (
        <Loading text="Loading" />
      ) : (
        <ComicVerticalList
          list={results}
          onEndReach={
            // () => {
            // if (results.length && !loading) {
            fetchNextPage
            // ();
            // }
            // }
          }
        />
      )}
    </>
  );
};

export const HomeSessionDetailListHot = (props: Props) => {
  const { loading } = useInteraction();

  const { fetchNextPage, results, maxPage } = useApiInfinityHot();

  return (
    <>
      {loading ? (
        <Loading text="Loading" />
      ) : (
        <ComicVerticalList list={results} onEndReach={fetchNextPage} />
      )}
    </>
  );
};

export const HomeSessionDetailListWeek = (props: Props) => {
  const { loading } = useInteraction();

  const { fetchNextPage, results } = useApiInfinityTopWeek();

  return (
    <>
      {loading ? (
        <Loading text="Loading" />
      ) : (
        <ComicVerticalList list={results} onEndReach={fetchNextPage} />
      )}
    </>
  );
};

export const HomeSessionFindComicByGenresName = (props: {
  genresName: string;
}) => {
  const { genresName } = props;
  // @ts-ignore
  const { fetchNextPage, results } = useApiInfinityFindComicByGenresName({
    genresName
  });

  const { loading } = useInteraction();
  return (
    <>
      {loading ? null : (
        <ComicVerticalList list={results} onEndReach={fetchNextPage} />
      )}
    </>
  );
};

/**
 *
 */
export type HomeSessionDetailList = {
  type: "recently" | "hot" | "week" | "find-comic-by-genres-name";
  genresName?: string;
};
const HomeSessionDetailList = ({ type, genresName }: HomeSessionDetailList) => {
  if (type === "recently") return <HomeSessionDetailListRecently />;
  if (type === "hot") return <HomeSessionDetailListHot />;
  if (type === "find-comic-by-genres-name")
    return (
      <HomeSessionFindComicByGenresName
        genresName={genresName || "manga-112"}
      />
    );
  return <HomeSessionDetailListWeek />;
};

export default HomeSessionDetailList;
