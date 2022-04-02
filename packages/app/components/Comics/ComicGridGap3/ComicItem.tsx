import {
  View,
  Text,
  Box,
  Center,
  HStack,
  VStack,
  Image,
  Skeleton,
  useBreakpointValue
} from "native-base";
import React from "react";
import { TouchableNativeFeedback } from "react-native";
import type { resComicItem_T } from "app/types";
import { NextLink } from "app/components/NextLink";
// import FastImage from "react-native-fast-image";
import TFastImage from "app/components/Typo/TFastImage";

export function ComicItem(props: { loading?: boolean; item?: resComicItem_T }) {
  const itemDim = useBreakpointValue({
    sm: 108,
    base: 112,
    md: 160,
    lg: 180,
    xl: 200
  });

  return (
    <NextLink
      routeName={props.loading ? "comic-detail" : "main"}
      params={{
        // item: props.item,
        id: 0,
        path: props.item?.path,
        preloadItem: props.item
      }}
    >
      <VStack
        flexDirection={"column-reverse"}
        // NOTE: REMOVE BACKGROUND
        // bg={"$light.backgroundPrimary"}
        // _dark={{
        // bg: "$dark.backgroundPrimary",
        // borderColor: "$dark.textSecondary"
        // }}
        // borderWidth={1}
        // borderColor1={"$light.textButton"}
        w={itemDim}
        height={itemDim * 1.6}
        rounded="sm"
        m={[1, 1, 2]}
      >
        <Center justifyContent={"center"} h={[43, 43, 57]}>
          {props.loading ? (
            <Text
              numberOfLines={2}
              textAlign="center"
              fontSize={[12, 12, 14, 16]}
              fontWeight={"600"}
              color={"$light.textPrimary"}
              _dark={{
                color: "$dark.textPrimary"
              }}
            >
              {props.item?.name}
              {/* <Skeleton ></Skeleton> */}
            </Text>
          ) : (
            <>
              <Skeleton.Text fontSize={12} px={2} mb={0} lines={2} />
              {/* <Skeleton.Text fontSize={12} /> */}
            </>
          )}
        </Center>
        {props.loading ? (
          <View flex={1} px={1} pt={1}>
            {/* <Image
              source={{
                uri: props.item?.posterUrl
              }}
              // source={{
              //   uri: 'https://wallpaperaccess.com/full/317501.jpg'
              // }}
              alt="Alternate Text"
              // size="xl"
              // w={114}
              w={'full'}
              h={'full'}
              // h={168}
              // mt={[1]}
              // ml={1}
              // mr={1}
              rounded={'sm'}
            />
             */}
            <TFastImage
              source={{
                uri: props.item?.posterUrl,
                priority: TFastImage?.priority?.low
              }}
              // w={'full'}
              // h={'full'}
              resizeMode={TFastImage?.resizeMode?.cover}
              style={{ flex: 2, borderRadius: 2 }}
              // rounded={'sm'}
            />
          </View>
        ) : (
          <Skeleton
            w={[120]}
            height={[168]}
            // mt={1}
            // ml={1}
            // mr={1}
            rounded={"sm"}
          />
        )}
      </VStack>
    </NextLink>
  );
}
