import {
  View,
  Text,
  Box,
  Center,
  Image,
  ZStack,
  useToken,
  HStack,
  VStack,
  useColorMode
} from "native-base";
import { TouchableNativeFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { resComicItem_T } from "app/types";
import { HistoryComicT } from "app/store/historySlice";
import { NextLink } from "app/components/NextLink";
import { BlurView } from "expo-blur";

type Props = {
  item: Partial<resComicItem_T>;
};

export function ListItem2({ item }: Props) {
  const { colorMode } = useColorMode();

  return (
    <NextLink
      routeName="comic-detail"
      params={{
        preloadItem: item,
        path: item.path
      }}
    >
      <Box rounded={"sm"} w={140} h={230} p={1}>
        <VStack w={130} h={220} rounded={"sm"}>
          <Image
            source={{
              uri: item.posterUrl
            }}
            alt="Alternate Text"
            w={130}
            h={220 - 66}
            rounded="sm"
          />
          <Box
            position={"absolute"}
            bottom={0}
            left={0}
            right={0}
            height={66}
            roundedBottom="sm"
            overflow={"hidden"}
          >
            <Box
              // _dark={{ bg: "#321" }}
              // bg={"white"}
              style={{ flex: 1 }}
            >
              <VStack justifyContent={"center"} flex={1}>
                <Text
                  color={"$light.textPrimary"}
                  _dark={{ color: "$dark.textPrimary" }}
                  fontWeight="600"
                  numberOfLines={1}
                  // textAlign="center"
                  fontSize={12}
                >
                  {item.name}
                </Text>
                <Text
                  color={"$light.textSecondary"}
                  _dark={{ color: "$dark.textPrimary" }}
                  numberOfLines={1}
                  fontSize={9}
                  mt={1}
                  fontWeight={500}
                >
                  by {item?.author}
                </Text>
              </VStack>
            </Box>
          </Box>

          <Box
            position={"absolute"}
            top={1}
            right={1}
            bg={"$light.backgroundPrimary"}
            _dark={{ bg: "#dcd" }}
            px={2}
            rounded={"full"}
            shadow={1}
            ml={2}
            // opacity={0.85}
          >
            <Text
              fontSize={10}
              fontWeight={600}
              color={"$light.textPrimary"}
              numberOfLines={1}
              mt={-0.5}
            >
              {item.lastedChapters && item.lastedChapters[0].chapterName}
            </Text>
          </Box>
        </VStack>
      </Box>
    </NextLink>
  );
}
