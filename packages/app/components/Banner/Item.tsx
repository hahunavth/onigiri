import React from "react";
import {
  Image,
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  ScaledSize
} from "react-native";
import { Text, View } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { NextLink } from "app/components/NextLink";
import {
  getBannerSize,
  HEIGHT,
  ITEM_PADDING,
  ITEM_WIDTH,
  NUM_COLUMN,
  NUM_ITEM,
  ITEM_HEIGHT
} from "./size";

import type { resComicItem_T } from "app/types/api";

const Item = React.memo(({ item }: ListRenderItemInfo<resComicItem_T>) => {
  const [size, setSize] = React.useState({
    NUM_COLUMN,
    NUM_ITEM,
    ITEM_HEIGHT,
    ITEM_PADDING,
    ITEM_WIDTH,
    HEIGHT
  });

  React.useEffect(() => {
    const handle = ({ window }: { window: ScaledSize; screen: ScaledSize }) => {
      const { width, height } = window;
      LayoutAnimation.easeInEaseOut();
      setSize(getBannerSize(width, height));
    };

    Dimensions.addEventListener("change", handle);
    return () => {
      Dimensions.removeEventListener("change", handle);
    };
  }, []);

  return (
    <NextLink
      routeName="comic-detail"
      params={{
        path: item.path,
        preloadItem: item
      }}
      style={{
        flex: 1,
        margin: size.ITEM_PADDING
      }}
    >
      <ImageBackground
        source={{ uri: item.posterUrl }}
        style={{}}
        blurRadius={8}
        borderRadius={4}
        progressiveRenderingEnabled
        fadeDuration={500}
      >
        <LinearGradient
          colors={["#0000009d", "#0000004c", "#ccccccb7"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: size.ITEM_WIDTH,
            height: size.HEIGHT / 4,
            borderRadius: 4
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                width: size.ITEM_WIDTH / 2,
                justifyContent: "space-between",
                margin: size.ITEM_PADDING * 3
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15
                }}
                fontFamily={"mono"}
                fontWeight={600}
                numberOfLines={2}
              >
                {item?.name}
              </Text>
              <View style={{ marginBottom: 4 * size.ITEM_PADDING }}>
                <Text
                  style={{ color: "white" }}
                  fontFamily={"mono"}
                  fontWeight={500}
                >
                  {item?.lastedChapters && item?.lastedChapters[0].chapterName}
                </Text>
                <Text
                  style={{ color: "#ddc" }}
                  fontSize={13}
                  fontFamily={"mono"}
                  fontWeight={500}
                >
                  {item?.lastedChapters &&
                    item?.lastedChapters[0].updatedDistance}
                </Text>
              </View>
            </View>
            <Image style={styles.image} source={{ uri: item.posterUrl }} />
          </View>
        </LinearGradient>
      </ImageBackground>
    </NextLink>
  );
});

const styles = StyleSheet.create({
  image: {
    height: HEIGHT / 4 - 4 * ITEM_PADDING,
    width: ITEM_WIDTH / 3,
    marginVertical: 2 * ITEM_PADDING,
    marginRight: 2 * ITEM_PADDING,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#a58989"
  }
});

export default Item;
