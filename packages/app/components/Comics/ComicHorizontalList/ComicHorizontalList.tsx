/**
 * Show read history list
 */

import { FlatList } from "native-base";
import React from "react";
import { HistoryComicT, historySelector } from "app/store/historySlice";
import { useAppSelector } from "app/store/hooks";
import { ListItem } from "./ListItem";

type Props = {};

export function ComicHorizontalList(props: Props) {
  const { comics, readComics } = useAppSelector(historySelector);
  const renderedList = React.useMemo(() => {
    return readComics
      .map((path) => comics[path])
      .filter((comic) => !!comic)
      .slice(0, 8);
  }, [comics]) as HistoryComicT[];

  const renderItem = React.useCallback(
    ({ item }) => <ListItem item={item} />,
    []
  );

  return (
    <>
      <FlatList
        data={renderedList}
        renderItem={renderItem}
        keyExtractor={(item) => item?.path + ""}
        horizontal={true}
      />
    </>
  );
}
