import {
  historyAction,
  HistoryComicT,
  historySelector,
  selectReadComics
} from "app/store/historySlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { RecentTabProps } from "app/navigators/LibraryTopNavigator";
import { resComicDetail_T } from "app/types";
import React from "react";
import { View } from "native-base";

import LibraryList from "./LibraryList";
import ConfirmModal from "app/components/ConfirmModal";
import { LibraryContext } from "./LibraryContext";

export const RecentTab: React.FunctionComponent<RecentTabProps> = (props) => {
  // const history = useAppSelector(historySelector);
  const data = useAppSelector(selectReadComics);
  const dispatch = useAppDispatch();

  const { showModal } = React.useContext(LibraryContext);

  const onLongPress = React.useCallback(
    (comic) => {
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
    },
    [showModal]
  );

  const fieldExtractor = React.useCallback((item) => {
    return item.lastedReadChapter || "";
  }, []);

  return (
    <View style={{ flex: 1 }} bg={"warmGray.50"} _dark={{ bg: "warmGray.900" }}>
      <LibraryList
        data={data}
        addonFieldName={"Lasted read: "}
        addonFieldExtractor={fieldExtractor}
        onLongPress={onLongPress}
      />
    </View>
  );
};
