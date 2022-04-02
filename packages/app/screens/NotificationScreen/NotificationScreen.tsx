import { TouchableOpacity } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import {
  mergeNewChapterNotificationThunk,
  notificationAction,
  selectAlleNewChapterNotification
} from "app/store/notificationSlice";
import {
  Box,
  FlatList,
  HStack,
  Image,
  VStack,
  View,
  Text,
  Button
} from "native-base";
import useInteraction from "app/hooks/useInteraction";
import { Loading } from "app/components/EmptyPage/Loading";
import { navigate } from "app/navigators";
import { NotFound } from "app/components/EmptyPage/NotFound";
import { NoNotification } from "app/components/EmptyPage";
import { fetchBackgroundTask } from "app/utils/backgroundFetchServices";
// import { ANbHStack, ANbView } from 'app/components/Typo/View'
import {
  Layout,
  LightSpeedInLeft,
  LightSpeedInRight
} from "react-native-reanimated";

const NotificationScreen = () => {
  const dispatch = useAppDispatch();
  const allNewChapterNotification = useAppSelector((state) =>
    selectAlleNewChapterNotification(state)
  );

  const renderItem = React.useCallback(
    ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{ marginVertical: 4, marginHorizontal: 8 }}
          onPress={() => {
            if (item?.comicDetail?.path) {
              navigate("comic-detail", {
                path: item.comicDetail?.path,
                preloadItem: {
                  posterUrl: item.comicDetail.posterUrl,
                  name: item.comicDetail?.title
                }
              });
              // dispatch(
              //   notificationAction.removeNewChapterNotification(
              //     item.comicDetail?.path
              //   )
              // )
            }
          }}
        >
          <HStack
            // entering={LightSpeedInLeft.delay(index * 100)}
            // exiting={LightSpeedInRight}
            alignItems={"center"}
            space={3}
            bg={"white"}
            p={1}
            rounded={6}
          >
            <Image
              source={{ uri: item.comicDetail?.posterUrl || "" }}
              alt={item.comicDetail?.path || ""}
              w={60}
              h={60}
              rounded={6}
            />
            <VStack space={1}>
              <Text numberOfLines={1}>{item.comicDetail?.title}</Text>
              <Text numberOfLines={1}>
                Lasted: {item.notification?.chapterName}
              </Text>
            </VStack>
          </HStack>
        </TouchableOpacity>
      );
    },
    [dispatch]
  );

  const { loading } = useInteraction();
  if (loading) return <Loading />;

  return (
    <View bg={"gray.50"} flex={1}>
      {allNewChapterNotification?.length ? (
        <FlatList
          data={allNewChapterNotification}
          renderItem={renderItem}
          keyExtractor={(item, id) => {
            // console.log(item.notification.chapterPath || id.toString())
            return item.comicDetail?.path || id.toString();
          }}
        />
      ) : (
        <NoNotification />
      )}
      {__DEV__ && (
        <>
          <Button
            onPress={() =>
              fetchBackgroundTask().then(() => {
                // dispatch(mergeNewChapterNotificationThunk())
              })
            }
          >
            Test
          </Button>
          <Button
            onPress={
              () =>
                // fetchBackgroundTask().then(() => {
                dispatch(mergeNewChapterNotificationThunk())
              // })
            }
          >
            Dispatch
          </Button>
        </>
      )}
    </View>
  );
};

export default NotificationScreen;
