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
import { resComicItem_T } from "../../../types";
import { HistoryComicT } from "../../../store/historySlice";
import { NextLink } from "../../NextLink";
import { BlurView } from "expo-blur";

type Props = {
  item: Partial<resComicItem_T>;
};

export function ListItem2({ item }: Props) {
  const [bgLight, bgDark] = useToken("colors", [
    "$light.backgroundPrimary",
    "$light.backgroundSecondary"
  ]);

  const { colorMode } = useColorMode();

  return (
    <NextLink
      routeName="comic-detail"
      params={{
        preloadItem: item,
        path: item.path
      }}
    >
      <Box rounded={"sm"} w={120} h={200} p={1}>
        <ZStack w={110} h={190} rounded={"sm"}>
          <Image
            source={{
              uri: item.posterUrl
            }}
            alt="Alternate Text"
            w={110}
            h={190}
            rounded="sm"
          />
          <Box
            position={"absolute"}
            bottom={0}
            left={0}
            right={0}
            height={44}
            roundedBottom="sm"
            overflow={"hidden"}
          >
            <Box
              // intensity={100}
              // tint={colorMode === "dark" ? "dark" : "light"}
              // bg={colorMode === "light" ? "white" : "dark.900"}
              _dark={{ bg: "#321" }}
              bg={"white"}
              style={{ flex: 1 }}
            >
              <VStack justifyContent={"center"} alignItems={"center"} flex={1}>
                <Text
                  color={"$light.textPrimary"}
                  _dark={{ color: "$dark.textPrimary" }}
                  fontWeight="600"
                  numberOfLines={2}
                  textAlign="center"
                  fontSize={13}
                >
                  {item.name}
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
              fontSize={12}
              fontWeight={600}
              color={"$light.textPrimary"}
              numberOfLines={1}
            >
              {item.lastedChapters && item.lastedChapters[0].chapterName}
            </Text>
          </Box>
        </ZStack>
      </Box>
    </NextLink>
  );
}
