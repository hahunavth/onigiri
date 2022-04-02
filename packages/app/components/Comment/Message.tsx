import { View, Text, Box, Image, HStack, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import React from "react";
import { MessageProps } from "./types";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export const Message = (props: MessageProps) => {
  const {
    abbr,
    avatarUrl,
    chapterName,
    content,
    datednf,
    id,
    reply,
    username
  } = props.message;
  const { like, comment, style } = props;

  return (
    <HStack p={2} style={style}>
      <View
        shadow={"1"}
        rounded={"md"}
        p={1.2}
        overflow={"hidden"}
        w={41}
        h={41}
        m={1}
      >
        <Image
          source={{
            uri: avatarUrl,
            headers: { referer: "https://www.nettruyenpro.com" }
          }}
          alt={"avatar"}
          w={39}
          h={39}
          rounded={"md"}
        />
      </View>
      <VStack flex={1} mx={1} mt={0.5}>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"}>{username}</Text>
          <Text
            color={"#aaa"}
            _dark={{ color: "#999" }}
            fontSize={12}
            fontWeight={"500"}
            textDecorationLine={"underline"}
            mt={0.5}
          >
            {chapterName}
          </Text>
        </HStack>
        <Text
          color={"#aaa"}
          _dark={{ color: "#999" }}
          fontSize={12}
          fontWeight={"500"}
        >
          {datednf}
        </Text>
        <Text fontSize={15} color={"#555"}>
          {content}
        </Text>
        <HStack space={3}>
          <TouchableOpacity>
            <HStack alignItems={"center"} space={1}>
              <AntDesign
                name="dislike2"
                size={18}
                color="black"
                style={{ transform: [{ rotateZ: "180deg" }] }}
              />
              <Text mt={0.5} color={"$light.textBluePrimary"}>
                Like
              </Text>
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity>
            <HStack alignItems={"center"} space={1}>
              <FontAwesome
                name="commenting-o"
                size={18}
                color="black"
                // style={{ transform: [{ rotateZ: '180deg' }] }}
              />
              <Text color={"$light.textBluePrimary"} mt={0.5}>
                Reply
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </HStack>
  );
};
