import { resComicItem_T } from "app/types/api";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  TouchableNativeFeedback
} from "react-native";
import { Text, View } from "native-base";
import SwiperFlatList from "react-native-swiper-flatlist";

import { useApiRecently } from "app/store/api";
import { MaterialIcons } from "@expo/vector-icons";

import { CustomPagination } from "./CustomPagination";

import Item from "./Item";
import {
  HEIGHT,
  ITEM_HEIGHT,
  ITEM_PADDING,
  ITEM_WIDTH,
  NUM_ITEM
} from "./size";
import { Box, Pressable, Skeleton } from "native-base";

export const FlatlistBanner = () => {
  const [list, setList] = useState<resComicItem_T[]>([]);
  const flatListRef = React.useRef<SwiperFlatList>(null);

  React.useEffect(() => {
    const handleWindowSizeChange = () => {
      flatListRef.current?.goToFirstIndex();
    };
    Dimensions.addEventListener("change", handleWindowSizeChange);
    return () => {
      Dimensions.removeEventListener("change", handleWindowSizeChange);
    };
  }, []);

  const { data, isError, isFetching, isSuccess, error } = useApiRecently("1", {
    selectFromResult: (result) => result
  });

  useEffect(() => {
    if (isSuccess)
      setList((list) => data?.data.filter((item, id) => id < NUM_ITEM) || list);
  }, [isFetching]);

  return (
    <View w="full" h={215} p={1}>
      {isSuccess ? (
        <View>
          <SwiperFlatList
            ref={flatListRef}
            autoplay
            autoplayDelay={25}
            autoplayLoop
            data={isSuccess ? list : []}
            renderItem={(props) => <Item {...props} />}
            showPagination
            initialNumToRender={1}
            PaginationComponent={CustomPagination}
          />
        </View>
      ) : (
        <Box bg={"$light.backgroundPrimary"}>
          <Skeleton m="auto" h={200} />
        </Box>
      )}
    </View>
  );

  //

  
};
