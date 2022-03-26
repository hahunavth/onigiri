import React from "react";
import { View, Text, Image, Box } from "native-base";
import { TouchableOpacity, ImageStyle, StyleSheet } from "react-native";
import { resComicItem_T } from "../../../types";
import { navigate, navPush } from "../../../navigators";
import { useColorModeStyle } from "../../../hooks/useColorModeStyle";
import { SharedElement } from "react-navigation-shared-element";
// import usePrevious from 'react-use/esm/usePrevious'
import { useNavigation, useRoute } from "@react-navigation/core";

type Props = {
  item: resComicItem_T;
  // handlePress?: () => any
};

export const ComicListItem = React.memo(
  function ComicListItem({
    item
  }: // handlePress
  Props) {
    // const prev = usePrevious(item)
    // console.log(item.path, item === prev)
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
      <TouchableOpacity onPress={handlePress}>
        <View
          style={styles.itemContainer}
          {...bs1}
          borderColor={bs2.backgroundColor}
        >
          <SharedElement id={`item.${item.posterUrl}.photo`}>
            <Image
              source={{ uri: item.posterUrl }}
              style={styles.poster as ImageStyle}
              alt={"avatar"}
            />
          </SharedElement>
          <View style={styles.infoContainer}>
            <Box>
              <Text
                style={[styles.titleText]}
                color={ts1.color}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text style={styles.detailText} color={ts2.color} opacity={0.8}>
                Author: {item.author}
              </Text>
              <Text style={styles.detailText} color={ts2.color} opacity={0.8}>
                Status: {item.status}
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
  (prev, next) => prev.item.path === next.item.path
);

const styles = StyleSheet.create({
  itemContainer: {
    // borderColor: ColorSchemeE["border-basic-color-3"],
    flex: 1,
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1
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
