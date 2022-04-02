import React, { useMemo } from "react";

// import { CONTAINER_MAX_W_STYLE } from 'app/utils/constant'
import { StyleProp, ViewStyle } from "react-native";
// import { ThemedBox } from "./Layout/ThemedBox";
import { BlurView } from "./BlurView";
import { MotiView } from "moti";
import {
  Center,
  Container,
  Flex,
  Text,
  HStack,
  Link,
  Button,
  Switch,
  View
} from "native-base";

type Props = {};

export const NavBar = (props: Props) => {
  const NavBarContainerStyle = useMemo(() => {
    return {
      // FIXME: position relative not working
      style: {
        position: "fixed",
        top: 0,
        bg: "#0000005a"
      }
    };
  }, []);

  const BlurViewStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "#transparent"
    };
  }, []);

  return (
    <>
      <Center
        maxW={"container"}
        justifyContent={""}
        flexDirection={"row"}
        position={"absolute"}
        top={0}
        zIndex={100000}
        flex={1}
        left={0}
        right={0}
        borderBottomWidth={1}
        borderBottomColor={"gray.300"}
        // @ts-ignore
        _web={NavBarContainerStyle}
      >
        <BlurView intensity={90} tint="light" style={BlurViewStyle}>
          <Container
            flexDirection={"row"}
            justifyContent={""}
            flex={1}
            mx={"auto"}
            // w={CONTAINER_MAX_W_STYLE}
          >
            <Flex
              flex={1}
              alignItems={"center"}
              justifyContent={"space-between"}
              direction="row"
            >
              <HStack alignItems={"center"}>
                <Text
                  color={"cyan.700"}
                  fontSize={42}
                  fontFamily={"Quicksand"}
                  fontWeight={600}
                >
                  Logo
                </Text>
                <HStack pl={10}>
                  <Link
                    href="/"
                    pl={10}
                    isUnderlined={false}
                    fontSize={18}
                    // _dark={{ color: "black" }}
                    // _light={{ color: "black" }}
                  >
                    <Text color={"cyan.800"}>Home</Text>
                  </Link>
                  <Link
                    pl={10}
                    isUnderlined={false}
                    fontSize={18}
                    // _dark={{ color: "black" }}
                    // _light={{ color: "black" }}
                  >
                    <Text color={"cyan.800"}>Hot</Text>
                  </Link>
                  <Link
                    pl={10}
                    isUnderlined={false}
                    fontSize={18}
                    href={"comic-detail"}
                    // _dark={{ color: "black" }}
                    // _light={{ color: "black" }}
                  >
                    <Text color={"cyan.800"}>Find</Text>
                  </Link>
                  <Link
                    href="setting"
                    pl={10}
                    isUnderlined={false}
                    fontSize={18}
                    // _dark={{ color: "black" }}
                    // _light={{ color: "black" }}
                  >
                    <Text color={"cyan.800"}>Setting</Text>
                  </Link>
                </HStack>
              </HStack>
              <HStack space={2}>
                <Button>Login</Button>
                <Switch my={"auto"} />
              </HStack>
            </Flex>
          </Container>
        </BlurView>
      </Center>
      {/* <View mb={63} w={'full'}></View> */}
      {/* after */}
      {/* <ThemedBox level={3} h={20}></ThemedBox> */}
      {/* <MotiView
        from={{
          opacity: 0,
          scale: 0.5
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          type: 'timing',
          delay: 1000,
          duration: 10000
        }}
        style={{ width: 19, height: 20, backgroundColor: 'red' }}
      /> */}
    </>
  );
};
