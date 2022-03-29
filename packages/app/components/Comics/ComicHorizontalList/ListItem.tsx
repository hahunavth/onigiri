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
  item: Partial<HistoryComicT>;
};

export function ListItem({ item }: Props) {
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
      <Box
        p={1}
        // bg={"$light.backgroundPrimary"}
        // _dark={{
        //   bg: "$dark.backgroundPrimary"
        // }}
        rounded={"sm"}
        w={230}
        h={160}
        m={2}
        // borderColor={bgDark}
        // borderWidth={1}
      >
        <ZStack w={220} h={150} rounded={"sm"}>
          <Image
            source={{
              uri: item.posterUrl
            }}
            alt="Alternate Text"
            // size="xl"
            w={220}
            h={150}
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
            {/* <LinearGradient
              // Button Linear Gradient
              // colors={[bgDark, bgLight]}
              style={{ flex: 1 }}
            > */}
            <BlurView
              intensity={100}
              tint={colorMode === "dark" ? "dark" : "light"}
              // style={{ margin: 1, borderRadius: 2 }}
              style={{ flex: 1 }}
            >
              <VStack justifyContent={"center"} alignItems={"center"} flex={1}>
                <Text
                  color={"$light.textPrimary"}
                  _dark={{ color: "$dark.textPrimary" }}
                  fontWeight="600"
                  numberOfLines={1}
                  fontSize={15}
                >
                  {item.title}
                </Text>
                {/* <HStack justifyContent="space-between"> */}
                {/* <Text
                    fontWeight={500}
                    fontSize={12}
                    color={'$light.textSecondary'}
                    _dark={{ color: '$dark.textSecondary' }}
                  >
                    {item.lastedReadChapter}
                  </Text> */}
                {/* <Text
                    fontWeight={500}
                    fontSize={12}
                    color={'$light.textSecondary'}
                    _dark={{ color: '$dark.textSecondary' }}
                  >
                    {item.createdAt}
                  </Text> */}
                {/* </HStack> */}
              </VStack>
            </BlurView>
            {/* </LinearGradient> */}
          </Box>

          <Box
            position={"absolute"}
            top={1}
            right={1}
            bg={"$light.backgroundPrimary"}
            px={2}
            rounded={"full"}
            shadow={1}
            ml={10}
            opacity={0.85}
          >
            <Text
              fontSize={12}
              fontWeight={600}
              color={"$light.textPrimary"}
              numberOfLines={1}
            >
              {item.lastedReadChapter}
            </Text>
          </Box>
        </ZStack>
      </Box>
    </NextLink>
  );
}
