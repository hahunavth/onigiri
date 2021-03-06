import React from "react";
import { View, Text, Image, Box, Badge, HStack, VStack } from "native-base";
import { TouchableOpacity, ImageStyle, StyleSheet } from "react-native";
import { resComicItem_T } from "app/types";
import { navigate, navPush } from "app/navigators";
import { useColorModeStyle } from "app/hooks/useColorModeStyle";
import { SharedElement } from "react-navigation-shared-element";
// import usePrevious from 'react-use/esm/usePrevious'
import { useNavigation, useRoute } from "@react-navigation/core";
import TFastImage from "app/components/Typo/TFastImage";

type Props = {
  item: resComicItem_T;
  // for memo compare
  id?: number;
  // handlePress?: () => any
};

export const ComicListItem = React.memo(
  function ComicListItem({
    item
  }: // handlePress
  Props) {
    const { name } = useRoute();
    const { boxStyle: bs1, textStyle: ts1 } = useColorModeStyle("", "Primary");
    const { boxStyle: bs2, textStyle: ts2 } = useColorModeStyle(
      "",
      "Secondary"
    );

    const handlePress = React.useCallback(
      () =>
        // STUB: SHARED ELEMENT ONLY WORK WITH NAVIGATE
        item.path && name === "shared/find-result"
          ? navigate("shared", {
              screen: "shared/comic-detail",
              params: { preloadItem: item, path: item.path }
            })
          : navPush("shared", {
              screen: "shared/comic-detail",
              params: { preloadItem: item, path: item.path }
            }),
      [item, item.path]
    );

    if (!item) return null;

    return (
      <TouchableOpacity onPress={handlePress} style={{ margin: 6 }}>
        <View
          style={styles.itemContainer}
          {...bs1}
          borderColor={bs2.backgroundColor}
        >
          <SharedElement id={`item.${item.posterUrl}.photo`}>
            {/* <Image
              source={{ uri: item.posterUrl }}
              style={styles.poster as ImageStyle}
              alt={item.posterUrl}
            /> */}
            <TFastImage
              source={{
                uri: item.posterUrl,
                priority: TFastImage?.priority?.low
              }}
              resizeMode={TFastImage?.resizeMode?.cover}
              style={styles.poster as ImageStyle}
            />
          </SharedElement>
          <View style={styles.infoContainer}>
            <Box justifyContent={"space-between"} flex={1}>
              <VStack>
                <Text
                  style={[styles.titleText]}
                  fontWeight={"600"}
                  color={ts1.color}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                {/* <Text style={styles.detailText} color={ts2.color} opacity={0.8}>
                Author: {item.author}
              </Text>
              <Text style={styles.detailText} color={ts2.color} opacity={0.8}>
              Status: {item.status}
            </Text> */}
                <HStack flexWrap={"wrap"} space={1}>
                  {item.kind?.map((name) => (
                    // <Badge
                    //   key={name}
                    //   colorScheme="orange"
                    //   opacity={0.4}
                    //   rounded={2}
                    //   mt={1}
                    // >
                    //   {name}
                    // </Badge>
                    <Text
                      key={name}
                      fontSize={11}
                      bg={"gray.100"}
                      mt={1}
                      px={1}
                      borderRadius={10}
                    >
                      {name}
                    </Text>
                  ))}
                </HStack>
              </VStack>
              <Text
                mt={"auto"}
                style={styles.detailText}
                color={ts2.color}
                opacity={0.8}
                fontWeight={"500"}
                fontSize={9}
              >
                Lasted:{" "}
                {item?.lastedChapters && item?.lastedChapters[0]?.chapterName}
              </Text>
            </Box>

            {/* <View>
            {!!addonFieldExtractor && (
              <View style={styles.bottomContainer}>
                <Text style={styles.detailText}>{addonFieldName}</Text>
                <Text style={styles.bottomText}>
                  {addonFieldExtractor(item)}
                </Text>
              </View>
            )}
            <View style={styles.bottomContainer}>
              <Text style={styles.detailText}>Lasted chapter:</Text>
              <Text style={styles.bottomText}>
                {item.chapters[0].name}
              </Text>
            </View>
          </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  /**
   * NOTE: Default compare fn not work, it cause rerender and touch wont response
   */
  // (prev, next) => prev.item.path === next.item.path
  // (prev, next) => {
  //   console.log(prev.id === next.id);
  //   return prev.id === next.id;
  // }
  () => true
);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderRadius: 10
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
    fontSize: 13
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
