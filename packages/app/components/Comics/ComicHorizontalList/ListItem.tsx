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
        // p={1}
        // bg={"$light.backgroundPrimary"}
        // _dark={{
        //   bg: "$dark.backgroundPrimary"
        // }}
        rounded={"sm"}
        w={120}
        h={200}
        p={1}
        // borderColor={bgDark}
        // borderWidth={1}
      >
        <ZStack w={110} h={190} rounded={"sm"}>
          <Image
            source={{
              uri: item.posterUrl
            }}
            alt="Alternate Text"
            // size="xl"
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
                  numberOfLines={2}
                  textAlign="center"
                  fontSize={13}
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
            ml={2}
            opacity={0.85}
          >
            <Text
              fontSize={10}
              fontWeight={600}
              color={"$light.textPrimary"}
              numberOfLines={1}
              mt={-0.5}
            >
              {item.lastedReadChapter}
            </Text>
          </Box>
        </ZStack>
      </Box>
    </NextLink>
  );
}
