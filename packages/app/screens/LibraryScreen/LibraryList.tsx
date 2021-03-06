import { FlatList, Image } from "react-native";
import React from "react";
import { HistoryComicT } from "app/store/historySlice";
import { useAppSelector } from "app/store/hooks";
import ListItemWithExtractor from "./ListItemWithExtractor";
import { Center } from "native-base";
import { TextMdP } from "app/components/Typo";
import { notificationSelector } from "../../store/notificationSlice";
import useInteraction from "../../hooks/useInteraction";
import { Loading } from "../../components/EmptyPage";
import { FooterSpace } from "../../components/Typo/FooterSpace";

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
  const __n = useAppSelector(notificationSelector);

  const renderItem = React.useCallback(
    ListItemWithExtractor({
      addonFieldExtractor,
      addonFieldName,
      onPress,
      onLongPress,
      getNewNotification: (s) => {
        return !!__n.newChapter[s];
      }
    }),
    [addonFieldExtractor, addonFieldName]
  );

  const CustomLoading = customLoadingComponent;

  const { loading } = useInteraction();

  const keyExtractor = React.useCallback((item, index) => item.path, []);

  return (
    <>
      {data && !loading ? (
        <FlatList
          style={{ flex: 1 }}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          ListFooterComponent={FooterSpace}
          // initialNumToRender={1}
          // updateCellsBatchingPeriod={1000}
          // maxToRenderPerBatch={1}
        />
      ) : CustomLoading ? (
        <>
          <CustomLoading />
        </>
      ) : loading ? (
        <Loading />
      ) : (
        <>
          {/* <Empty /> */}
          <Center flex={1} justifyContent={"center"}>
            <Image
              progressiveRenderingEnabled={true}
              source={require("@onigiri/expo/assets/icons8-likee-ap-500.png")}
              style={{ width: 240, height: 240 }}
              resizeMode={"contain"}
              resizeMethod={"resize"}
            />
            <TextMdP>Subscribed comics</TextMdP>
          </Center>
        </>
      )}
    </>
  );
};

export default React.memo(LibraryList);
