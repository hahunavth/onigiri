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
import { useIsFocused } from "../../hooks/useIsFocused";
import { Loading } from "../../components/EmptyPage";
import { createTwoButtonAlert } from "../../utils/alert";

export const RecentTab: React.FunctionComponent<RecentTabProps> = (props) => {
  // const history = useAppSelector(historySelector);

  // const { isFocused } = useIsFocused();
  // console.log(isFocused);
  const data = useAppSelector((state) => selectReadComics(state, true));
  const dispatch = useAppDispatch();

  // const renderData = React.useMemo(() => {
  //   if(isFocused === true) return data;
  //   else return [];
  // }, [isFocused]);

  // const { showModal } = React.useContext(LibraryContext);

  const onLongPress = React.useCallback((comic) => {
    // setPressedComicPath(comic.path)
    // setModalVisible((v) => !v)
    console.log("long press");
    // showModal &&
    //   showModal(true, comic.path, () => (path) => {
    //     dispatch(
    //       historyAction.removeReadComic({
    //         path: path
    //       })
    //     );
    //   });
    createTwoButtonAlert({
      title: "Delete history?",
      message: "Are you sure you want to delete this comic?",
      onCancel: () => {},
      onOk: () => {
        dispatch(
          historyAction.removeReadComic({
            path: comic.path
          })
        );
      }
    });
  }, []);

  const fieldExtractor = React.useCallback((item) => {
    return item.lastedReadChapter || "";
  }, []);

  return (
    <View style={{ flex: 1 }} bg={"warmGray.50"} _dark={{ bg: "warmGray.900" }}>
      {/* {isFocused ? ( */}
      <LibraryList
        data={data}
        addonFieldName={"Lasted read: "}
        addonFieldExtractor={fieldExtractor}
        onLongPress={onLongPress}
      />
      {/* ) : (
        <Loading />
      )} */}
    </View>
  );
};
