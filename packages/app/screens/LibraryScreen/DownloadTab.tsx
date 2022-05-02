import { View, Text, FlatList } from "native-base";
import React from "react";

import {
  HistoryComicT,
  historySelector,
  selectDownloadedComics
} from "app/store/historySlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { NextLink } from "app/components/NextLink";
import LibraryList from "./LibraryList";
import { navigate } from "app/navigators";
import { LibraryContext } from "./LibraryContext";
import { Download, Loading } from "app/components/EmptyPage";
import { useIsFocused } from "../../hooks/useIsFocused";

interface Props {}

export const DownloadTab = (props: Props) => {
  const dispatch = useAppDispatch();
  const { isFocused } = useIsFocused();
  const data = useAppSelector((state) =>
    selectDownloadedComics(state, isFocused)
  );
  const { showModal } = React.useContext(LibraryContext);

  return (
    <View style={{ flex: 1 }} bg={"warmGray.50"} _dark={{ bg: "warmGray.900" }}>
      {/* <Text>{downloadComics.length}</Text>
      <FlatList
        data={downloadComics.map((str) => comics[str])}
        renderItem={({ item, index, separators }) => {
          return (
            <NextLink
              routeName="offline-comic-screen"
              params={{ path: item.path }}
            >
              <Text>{item.title}</Text>
            </NextLink>
          )
        }}
        keyExtractor={(item) => item.title}
      /> */}

      {isFocused ? (
        <LibraryList
          customLoadingComponent={Download}
          data={data}
          addonFieldName={"Downloaded:"}
          addonFieldExtractor={
            (comic) =>
              // FIXME: CHANGE EXTRACTOR TO FIT WITH NEW STRUCTURE
              "Fixme"
            // comic.chapters
            //   .map((cpt) => downloadCpt[cpt.path])
            //   .filter((p) => p)
            //   .length.toString()
          }
          onPress={(comic) =>
            navigate("offline-comic-screen", {
              path: comic.path || ""
            })
          }
          onLongPress={(comic) => {
            showModal &&
              showModal(true, comic.path, () => (path) => {
                console.log("test remove downloaded chapter " + path);
              });
          }}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};
