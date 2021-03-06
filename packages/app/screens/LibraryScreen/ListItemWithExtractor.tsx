import {
  Image,
  ImageStyle,
  StyleSheet,
  ListRenderItemInfo
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, HStack } from "native-base";
import React from "react";
import { HistoryComicT } from "app/store/historySlice";
import { navigate } from "app/navigators";
import { resComicDetail_T } from "app/types";
import { useColorModeStyle } from "app/hooks/useColorModeStyle";
import { Box } from "native-base";
import { TextSmS, TextXsS } from "app/components/Typo";

type Param = {
  onPress?: (comic: HistoryComicT) => any;
  onLongPress?: (comic: HistoryComicT) => any;
  addonFieldName?: string;
  addonFieldExtractor?: (comic: HistoryComicT) => string;
  getNewNotification?: (s: string) => boolean;
};
/**
 * NOTE: Function return renderItem component for listView
 * u can customize addonField
 */
const ListWithExtractor = (param: Param) => {
  const {
    addonFieldExtractor,
    addonFieldName,
    onPress,
    onLongPress,
    getNewNotification
  } = param;

  const ListItem = React.memo(
    ({ item, index }: ListRenderItemInfo<resComicDetail_T>) => {
      console.log(item.path);
      const { boxStyle: bs1, textStyle: ts1 } = useColorModeStyle(
        "",
        "Primary"
      );
      const { boxStyle: bs2, textStyle: ts2 } = useColorModeStyle(
        "",
        "Secondary"
      );

      if (!item) return null;
      return (
        <TouchableOpacity
          // hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          // pressRetentionOffset={{ top: 10, bottom: 10, left: 10, right: 10 }}
          // delayPressIn={10}
          onLongPress={() => onLongPress && onLongPress(item as HistoryComicT)}
          onPress={() =>
            onPress
              ? onPress(item as HistoryComicT)
              : navigate("comic-detail", { preloadItem: item, path: item.path })
          }
        >
          <View
            style={styles.itemContainer}
            {...bs1}
            borderColor={bs2.backgroundColor}
          >
            {getNewNotification && getNewNotification(item.path) && (
              <View
                // w={3}
                // h={3}
                bg={"#8d6868"}
                rounded="full"
                // pl={4}
                px={1}
                py={0}
                position="absolute"
                right={3}
                top={3}
                justifyContent="center"
                alignItems={"center"}
                shadow={"2"}
              >
                <Text
                  fontSize={10}
                  mt={-0.3}
                  color={"white"}
                  _dark={{ color: "dark.900" }}
                  fontWeight={"600"}
                >
                  New
                </Text>
              </View>
            )}

            <Image
              progressiveRenderingEnabled={true}
              source={{ uri: item.posterUrl }}
              style={styles.poster as ImageStyle}
            />

            <View style={styles.infoContainer}>
              <Box _text={ts1}>
                <HStack justifyContent={"space-between"} w={"full"}>
                  <Text
                    style={[
                      styles.titleText,
                      { color: ts1.color, fontWeight: "bold" }
                    ]}
                    pr={8}
                  >
                    {item.title}
                  </Text>
                </HStack>
                <TextSmS
                  // style={styles.detailText}
                  numberOfLines={1}
                >
                  Author: {item.author}
                </TextSmS>
                <TextSmS style={styles.detailText} numberOfLines={1}>
                  Status: {item.status}
                </TextSmS>
              </Box>

              <View>
                {!!addonFieldExtractor && (
                  <View style={styles.bottomContainer}>
                    <TextSmS style={styles.detailText}>
                      {addonFieldName}
                    </TextSmS>
                    <TextSmS style={styles.bottomText} numberOfLines={1}>
                      {addonFieldExtractor(item as HistoryComicT)}
                    </TextSmS>
                  </View>
                )}
                <View style={styles.bottomContainer}>
                  <TextSmS style={styles.detailText}>Lasted chapter:</TextSmS>
                  <TextSmS style={styles.bottomText} numberOfLines={1}>
                    {item.chapters[0].name}
                  </TextSmS>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  );

  // Return render item function
  return (props: ListRenderItemInfo<resComicDetail_T>) => {
    // Return Function component
    return <ListItem {...props} />;
  };
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderRadius: 10,
    marginHorizontal: 8,
    marginTop: 8
  },
  poster: {
    width: 100,
    height: 142,
    borderRadius: 4,
    marginLeft: 10
  },
  infoContainer: {
    justifyContent: "space-between",
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 16
  },
  titleText: {
    fontSize: 15
  },
  detailText: {
    fontSize: 13,
    paddingRight: 8
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 12
  },
  bottomText: {
    fontSize: 13,
    opacity: 0.7
  }
});

export default ListWithExtractor;
