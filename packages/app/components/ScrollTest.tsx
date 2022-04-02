import React from "react";
import { MotiView, useDynamicAnimation } from "moti";
import { Center, Heading, ScrollView, useTheme, VStack } from "native-base";
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent
} from "react-native";
type Props = {};

export const ScrollTest = (props: Props) => {
  // const animation = useDynamicAnimation(() => {
  //   // optional function that returns your initial style
  //   return {
  //     height: 10,
  //   };
  // });

  // // const onLayout = (props: LayoutChangeEvent) => {
  // //   animation.animateTo({
  // //     ...animation.current,
  // //     height: props.nativeEvent.layout.height,
  // //   });
  // //   console.log(animation.current);
  // //   console.log(props.nativeEvent.layout.x);
  // // };

  // const onScroll = (props: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   console.log("kkk");
  // };

  const { colors } = useTheme();

  return (
    <>
      <Center>
        <ScrollView
          maxW="300"
          h="80"
          _contentContainerStyle={{
            px: "20px",
            mb: "4",
            minW: "72"
          }}
          // onScroll={onScroll}
        >
          <Center mt="3" mb="4">
            <Heading fontSize="xl">Cyan</Heading>
          </Center>
          <VStack flex="1">
            {Object.keys(colors.cyan).map((key, index) => {
              if (index >= 1 && index <= 5)
                return (
                  <Center py="4" bg={`cyan.${key}`}>
                    {key}
                  </Center>
                );
            })}
          </VStack>
          <Center mt="8" mb="4">
            <Heading fontSize="xl">Yellow</Heading>
          </Center>
          <VStack flex="1">
            {Object.keys(colors.cyan).map((key, index) => {
              if (index >= 1 && index <= 5)
                return (
                  <Center py="4" bg={`yellow.${key}`}>
                    {key}
                  </Center>
                );
            })}
          </VStack>
          <Center mt="8" mb="4">
            <Heading fontSize="xl"> Violet</Heading>
          </Center>
          <VStack flex="1">
            {Object.keys(colors.violet).map((key, index) => {
              if (index >= 1 && index <= 5)
                return (
                  <Center py="4" bg={`violet.${key}`}>
                    {key}
                  </Center>
                );
            })}
          </VStack>
        </ScrollView>
      </Center>
      <MotiView
        style={{ height: 10, backgroundColor: "red", width: 100 }}
        transition={{ duration: 10000, type: "timing" }}
        // state={animation}
      />
    </>
  );
};
