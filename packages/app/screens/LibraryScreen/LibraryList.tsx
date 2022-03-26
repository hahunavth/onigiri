import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageStyle,
  StyleSheet
} from "react-native";
import React from "react";
import { HistoryComicT, historySelector } from "app/store/historySlice";
import { useAppSelector } from "app/store/hooks";
import { navigate } from "app/navigators";
import { resComicDetail_T } from "app/types";
import ListItemWithExtractor from "./ListItemWithExtractor";
import { Empty } from "../../components/EmptyPage";

type Props = {
  data: HistoryComicT[];
  addonFieldName?: string;
  addonFieldExtractor?: (comic: HistoryComicT) => string;
  onPress?: (comic: HistoryComicT) => any;
  onLongPress?: (comic: HistoryComicT) => any;
  customLoadingComponent?: React.FC;
};

const LibraryList = ({
  addonFieldExtractor,
  addonFieldName,
  data,
  onPress,
  onLongPress,
  customLoadingComponent
}: Props) => {
  // const styles = useStyleSheet(themedStyle);

  const renderItem = React.useCallback(
    ListItemWithExtractor({
      addonFieldExtractor,
      addonFieldName,
      onPress,
      onLongPress
    }),
    [addonFieldExtractor, addonFieldName]
  );

  const CustomLoading = customLoadingComponent;

  return (
    <>
      {data.length ? (
        <FlatList
          style={{ flex: 1 }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : CustomLoading ? (
        <CustomLoading />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default React.memo(LibraryList);
