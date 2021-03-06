import { View, Text, SectionList, FlatList } from "native-base";
import { FindResultScreenProps } from "app/navigators/StackNav";
import { API_URL, resComicItem_T } from "app/types";
import axios from "axios";
import { useApiFindComic, usePrefetch } from "app/store/api";
import { ComicVerticalList } from "app/components/Comics/ComicVerticalList/ComicVerticalList";
import { useColorModeStyle } from "app/hooks/useColorModeStyle";
import { Loading } from "app/components/EmptyPage/Loading";
import React from "react";
import {
  InteractionManager,
  ListRenderItem,
  SectionListRenderItemInfo
} from "react-native";
import { selectDownloadedChapters } from "app/store/historySlice";
import { ListFooter } from "app/components/Comics/ComicVerticalList/ListFooter";
import { NotFound } from "app/components/EmptyPage/NotFound";

/**
 * FIXME: INFINITY LIST UPDATE NEW PAGE SLOW
 */
export const FindResultScreen = (props: FindResultScreenProps) => {
  const { findOption, path } = props.route.params;
  const [page, setPage] = React.useState(1);
  const [seed, setSeed] = React.useState(0);
  const [max, setMax] = React.useState(1);
  const [list, setList] = React.useState<resComicItem_T[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const { isSuccess, isLoading, data, requestId, refetch } = useApiFindComic({
    ...findOption,
    page: page
  });

  const prefetchFindComic = usePrefetch("findComic", {});

  // Interaction
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      // console.log('object')
      setLoading(false);
    });
    return () => {
      interaction.cancel();
    };
  }, []);

  // Infinity list
  React.useEffect(() => {
    // console.log(Object.keys(data ||))
    if (max === 1)
      setMax((max) =>
        typeof data?.pagination?.max === "number" && data?.pagination?.max > 0
          ? data?.pagination?.max
          : max
      );
    if (
      isSuccess &&
      data?.data?.length &&
      page > seed &&
      data?.pagination?.page === page &&
      data?.pagination?.page <= max
    ) {
      setList((list) => [...list, ...data.data]);
      setSeed(page);
      setRefreshing(false);
      console.log(page, seed);
    }
  }, [isSuccess, data]);

  const onEndReach = React.useCallback(() => {
    console.log("reach", page, seed);
    if (page === seed) {
      // setImmediate(() => {
      console.log("reach active", page, seed);
      setRefreshing(true);
      setPage(page + 1);
      refetch();
      if (page <= max)
        prefetchFindComic({
          ...findOption,
          page: page + 2
        });
      // })
    }
  }, [setPage, seed, page]);

  const ListFooterComponent = React.useMemo(() => {
    return (
      <>
        {refreshing ? (
          <View h={10}>
            <Loading />
          </View>
        ) : undefined}
      </>
    );
  }, [refreshing]);

  const listEmptyComponent = React.useCallback(() => <NotFound />, []);

  console.log("out", page, seed, max);

  return (
    <View flex={1}>
      {isLoading || loading ? (
        <Loading text="Fetching" />
      ) : (
        <>
          <MemoComicListVertical
            list={list || []}
            onEndReach={onEndReach}
            listFooterComponent={ListFooterComponent}
            listEmptyComponent={listEmptyComponent}
          />
          {/* <ListFooter page={seed} max={max} /> */}
          {/* {ListFooterComponent} */}
        </>
      )}
    </View>
  );
};

const MemoComicListVertical = React.memo(ComicVerticalList);

/**
 * Refactor
 */

// type SessionResultListProps = {
//   sessList: {
//     data: resComicItem_T[]
//     page: number
//     status: 'fulfilled' | 'pending' | 'reject'
//   }[]
// }

// function SessionResultList({ sessList }: SessionResultListProps) {
//   return (
//     <FlatList
//       data={sessList || []}
//       renderItem={({ index, item, separators }) => {
//         return item.data ? <ComicListVertical list={item.data} /> : <Loading />
//       }}
//       keyExtractor={(item, index) => index.toString()}
//       // renderSectionHeader={() => null}
//     />
//   )
// }

// export const FindResultScreen = (props: FindResultScreenProps) => {
//   const { findOption, path } = props.route.params

//   const [page, setPage] = React.useState(1)
//   const [seed, setSeed] = React.useState(0)
//   const [max, setMax] = React.useState(1)
//   const [list, setList] = React.useState<SessionResultListProps['sessList']>([])
//   const [refreshing, setRefreshing] = React.useState(false)

//   const { isSuccess, isLoading, data, requestId, refetch } = useApiFindComic({
//     ...findOption,
//     page: page
//   })

//   const prefetchFindComic = usePrefetch('findComic', {})

//   // Interaction
//   const [loading, setLoading] = React.useState(true)

//   React.useEffect(() => {
//     const interaction = InteractionManager.runAfterInteractions(() => {
//       if (page <= max)
//         prefetchFindComic({
//           ...findOption,
//           page: page + 1
//         })
//     })
//     return () => {
//       interaction.cancel()
//     }
//   })

//   // Infinity list
//   React.useEffect(() => {
//     // console.log(Object.keys(data ||))
//     setMax((max) =>
//       typeof data?.pagination?.max === 'number' && data?.pagination?.max > 0
//         ? data?.pagination?.max
//         : max
//     )
//     if (
//       isSuccess &&
//       data?.data?.length &&
//       page > seed &&
//       data?.pagination?.page === page &&
//       data?.pagination?.page <= max
//     ) {
//       // setList((list) => [...list, ...data.data])
//       setList((list) => list.push({data: data.data, page: page, status: 'fulfilled'}))
//       setSeed(page)

//       console.log(page, seed)
//     }
//   }, [isSuccess, isLoading, data])

//   const onEndReach = React.useCallback(() => {
//     console.log('reach', page, seed)
//     if (page === seed) {
//       console.log('reach active', page, seed)
//       setPage(page + 1)
//       refetch()
//     }
//   }, [setPage, seed, page])

//   console.log('out', page, seed, max)

//   return (
//     <View flex={1}>
//       {isLoading || loading ? (
//         <Loading text="Fetching" />
//       ) : (
//         <>
//           <ComicListVertical list={list || []} onEndReach={onEndReach} />
//           {/* <ListFooter page={seed} max={max} /> */}
//         </>
//       )}
//     </View>
//   )
// }
