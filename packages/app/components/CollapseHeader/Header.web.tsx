import React, { FC, memo, useMemo, useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  ViewProps,
  useWindowDimensions,
  Platform
} from "react-native";
import Image from "next/image";
import { View, Factory, Text, HStack, Button } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import useInteraction from "app/hooks/useInteraction";
import { MotiView, MotiText } from "moti";

export const PHOTO_SIZE = 120;

// NOTE: Animation config
export type HeaderConfig = {
  heightExpanded: number;
  heightCollapsed: number;
};

export enum Visibility {
  Hidden = 0,
  Visible = 1
}

type Props2 = Pick<ViewProps, "style"> & {
  photo: string;
  name: string;
  bio: string;
};

const FLG = Factory(LinearGradient);
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);
const AnimatedLinearGradient = Animated.createAnimatedComponent(FLG);

const { height } = Dimensions.get("screen");

const Header: FC<Props2> = ({ style, name, photo, bio }) => {
  // REVIEW: Save Style
  const containerStyle = useMemo(() => [styles.container, style], []);

  // REVIEW: Save Image source for next render
  // const photoSource = useMemo<ImageProps['source']>(() => ({ uri: photo }), [])
  // const photoSource = { uri: photo };
  const offset = useSharedValue(0);
  const transY = useDerivedValue(() => {
    return -10 * offset.value + 10;
  });
  // const imageBackgroundHeight = useSharedValue(height)
  // const imageBackgroundHeight = useDerivedValue(() => {
  //   return offset.value * height
  // })

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(offset.value, {})
    };
  });

  const opacityStyle2 = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        100,
        withTiming(offset.value, {
          // duration: 500
        })
      )
    };
  });

  const transStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(200, withTiming(offset.value)),
      transform: [{ translateY: withDelay(200, withTiming(transY.value)) }]
    };
  });

  const transStyle2 = useAnimatedStyle(() => {
    return {
      opacity: withDelay(300, withTiming(offset.value)),
      transform: [{ translateY: withDelay(300, withTiming(transY.value)) }]
    };
  });

  useEffect(() => {
    offset.value = 0;
  });

  return (
    <View
      // className="test"
      style={[
        containerStyle,
        {
          // @ts-ignore
          // backgroundImage: `url("${photo}")`,
          // 'background-position': 'center',
          // 'background-repeat': 'no-repeat',
          // 'background-size': 'cover',
          // filter: 'blur(8px)'
          // '-webkit-filter': 'blur(8px)'
          // zIndex: -1
        }
      ]}
    >
      {/* <View
        style={{
          // @ts-ignore
          backgroundImage: `url("${photo}")`,
          'background-position': 'center',
          'background-repeat': 'no-repeat',
          'background-size': 'cover',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          filter: 'blur(8px)'
          // '-webkit-filter': 'blur(8px)'
          // zIndex: -1
        }}
      ></View> */}
      <Animated.View
        // from={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // delay={200}
        // transition={{
        //   type: 'timing',
        //   duration: 350
        // }}
        style={[
          {
            // @ts-ignore
            backgroundImage: `url("${photo}")`,
            "background-position": "center",
            "background-repeat": "no-repeat",
            "background-size": "cover",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            filter: "blur(8px)"
            // '-webkit-filter': 'blur(8px)'
            // zIndex: -1
          },
          opacityStyle2
        ]}
      />
      {/* {photo ? (
        <ImageBackground
          style={[
            // styles.photo,
            StyleSheet.absoluteFill,
            // {
            // opacity: 1
            // }
            opacityStyle2
          ]}
          blurRadius={4}
          source={photoSource}
          // fadeDuration={500}
        />
      ) : null} */}
      <LinearGradient
        colors={["#000000d8", "#00000042", "#77777747"]}
        start={{ x: 0, y: 1.1 }}
        end={{ x: 0, y: 0 }}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          padding: 12,
          // opacity: 0.4
          zIndex: 10
        }}
      >
        <View flexDirection={["column", "row"]} w={["full", "2/3"]} mx={"auto"}>
          <View style={styles.textContainer}>
            <Text fontSize={[20, 24, 28, 32]} style={styles.name}>
              {name}
            </Text>
            <HStack space={4} mt={4}>
              <Animated.View style={transStyle}>
                <Button colorScheme="success">Read from first</Button>
              </Animated.View>
              <Animated.View style={transStyle2}>
                <Button colorScheme="success">Read from last</Button>
              </Animated.View>
            </HStack>
            {/* <Text
              style={styles.bio}
              fontSize={[13, 14, 15, 17]}
              fontWeight={'bold'}
              fontFamily={'Quicksand'}
            >
              {bio}
            </Text> */}
          </View>
          <SharedElement id={`item.${photo}.photo`} style={{ zIndex: 1000 }}>
            <View
              style={[
                {
                  width: 180,
                  height: 240,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "#33333376",
                  opacity: 1,
                  zIndex: 1000
                },
                opacityStyle
              ]}
              shadow={9}
            >
              {photo ? (
                <Image
                  onLoadingComplete={() => {
                    // console.log("end");
                    offset.value = 1;
                  }}
                  // source={photoSource}

                  src={photo || ""}
                  width={240}
                  height={320}
                />
              ) : null}
            </View>
          </SharedElement>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: { marginLeft: 8, justifyContent: "flex-end", flex: 1 },
  name: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
    color: "white"
  },
  bio: {
    // web
    // fontSize: 15,
    marginTop: 4,
    color: "#ccc"
  },
  photo: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  container: {
    flexDirection: "row",
    height: 320
  }
});

export default memo(Header);
