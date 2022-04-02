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
    return readComics.map((path) => comics[path]).filter((comic) => !!comic);
  }, [comics]) as HistoryComicT[];

  return (
    <>
      <FlatList
        data={renderedList}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item?.path + ""}
        horizontal={true}
      />
    </>
  );
}
