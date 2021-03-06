import {
  historyAction,
  HistoryComicT,
  historySelector,
  selectSubscribeComics
} from "app/store/historySlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
// import { Layout } from "@ui-kitten/components";
import React from "react";
import { Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View } from "native-base";
import LibraryList from "./LibraryList";
import { LibraryContext } from "./LibraryContext";
import { useIsFocused } from "../../hooks/useIsFocused";
import { Loading } from "../../components/EmptyPage";
import { createTwoButtonAlert } from "../../utils/alert";
interface Props {}

export const SubscribeTab = (props: Props) => {
  // const history = useAppSelector(historySelector);
  // const { isFocused } = useIsFocused();
  const data = useAppSelector((state) => selectSubscribeComics(state, true));
  const dispatch = useAppDispatch();
  const { showModal } = React.useContext(LibraryContext);

  // console.log(history.comics);
  return (
    <View style={{ flex: 1 }} bg={"warmGray.50"} _dark={{ bg: "warmGray.900" }}>
      {/* <Text>Recent tab</Text> */}
      {/* <FlatList
        style={{ flex: 1 }}
        data={history.subscribeComics.map((path) => history.comics[path])}
        renderItem={({ item, index }) => {
          if (!item) return null
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image
                source={{ uri: item.posterUrl }}
                style={{ width: 100, height: 160 }}
              />
              <View>
                <Text>{item.title}</Text>
                <Text>{item.lastedReadChapter}</Text>
                <Text>{item.author}</Text>
                <Text>{item.status}</Text>
              </View>
            </View>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      {/* {isFocused ? ( */}
      <LibraryList
        data={data}
        onLongPress={(comic) => {
          // showModal &&
          //   showModal(true, comic.path, () => (path) => {
          //     dispatch(historyAction.unSubscribeComic(comic.path));
          //   });
          createTwoButtonAlert({
            title: "Delete subscribed?",
            message: "Are you sure you want to delete this comic?",
            onCancel: () => {},
            onOk: () => {
              dispatch(
                historyAction.unSubscribeComic({
                  path: comic.path
                })
              );
            }
          });
        }}
      />
      {/* ) : (
        <Loading />
      )} */}
    </View>
  );
};
