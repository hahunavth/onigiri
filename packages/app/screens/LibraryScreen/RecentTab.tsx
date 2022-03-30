import { historyAction, historySelector } from "app/store/historySlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { RecentTabProps } from "app/navigators/LibraryTopNavigator";
import { resComicDetail_T } from "app/types";
import React from "react";
import { View } from "native-base";

import LibraryList from "./LibraryList";
import ConfirmModal from "../../components/ConfirmModal";
import { LibraryContext } from "./LibraryContext";

export const RecentTab: React.FunctionComponent<RecentTabProps> = (props) => {
  const history = useAppSelector(historySelector);
  const dispatch = useAppDispatch();

  const { showModal } = React.useContext(LibraryContext);

  return (
    <View
      style={{ flex: 1 }}
      // bg={"$light.backgroundPrimary"}
      // _dark={{ bg: "$dark.backgroundSecondary" }}
      bg={"warmGray.50"}
      _dark={{ bg: "warmGray.900" }}
    >
      <LibraryList
        data={
          (history.readComics
            .map((path) => history.comics[path])
            .filter((n) => n) as resComicDetail_T[]) || []
        }
        addonFieldName={"Lasted read: "}
        addonFieldExtractor={(item) => {
          return item.lastedReadChapter || "";
        }}
        onLongPress={(comic) => {
          // setPressedComicPath(comic.path)
          // setModalVisible((v) => !v)
          showModal &&
            showModal(true, comic.path, () => (path) => {
              dispatch(
                historyAction.removeReadComic({
                  path: path
                })
              );
            });
        }}
      />
    </View>
  );
};
