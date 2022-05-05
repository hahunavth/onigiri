import React, { FC, memo, useMemo } from "react";
import {
  ImageBackground,
  ImageProps,
  StyleSheet,
  ViewProps
} from "react-native";
import { View, Factory, Text, HStack } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInDown
} from "react-native-reanimated";
import useInteraction from "app/hooks/useInteraction";
import { AirbnbRating } from "react-native-ratings";
import { TouchableOpacity } from "react-native-gesture-handler";
import { navigate } from "app/navigators";
import TFastImage from "app/components/Typo/TFastImage";

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
  rating?: number;
};
const FLG = Factory(LinearGradient);
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Header: FC<Props2> = ({ style, name, photo, bio, rating }) => {
  const containerStyle = useMemo(() => [styles.container, style], []);

  const photoSource = useMemo<ImageProps["source"]>(() => ({ uri: photo }), []);
  // const photoSource = { uri: photo };
  const offset = useSharedValue(0);
  // const imageBackgroundHeight = useSharedValue(height)
  // const imageBackgroundHeight = useDerivedValue(() => {
  //   return offset.value * height
  // })

  // const opacityStyle1 = useAnimatedStyle(() => {
  //   // // STUB: FIX: Type error, viewRef.current._component.setNativeProps is not a function in animated linear gradient
  //   // if (Platform.OS === 'web') {
  //   //   return {
  //   //     flex: 1,
  //   //     flexDirection: 'row',
  //   //     alignItems: 'flex-end',
  //   //     padding: 12,
  //   //     opacity: 0.5
  //   //   }
  //   // }

  //   return {
  //     opacity: withTiming(offset.value * 0.5 + 0.5)
  //   };
  // });
  const opacityStyle2 = useAnimatedStyle(() => {
    return {
      opacity: withTiming(offset.value)
      // width: withTiming(imageBackgroundHeight.value, {
      //   duration: 500,
      // })
    };
  });

  useInteraction({
    callback: () => {
      // imageBackgroundHeight.value = 280
      offset.value = 1;
    }
  });

  const lgProps = React.useMemo(
    () => ({
      colors: ["#000000d8", "#00000042", "#77777747"],
      start: { x: 0, y: 1.1 },
      end: { x: 0, y: 0 }
    }),
    []
  );

  // console.log("render Header: ", photo);

  return (
    <View style={containerStyle}>
      <AnimatedImageBackground
        style={[styles.photo, opacityStyle2]}
        blurRadius={4}
        source={photoSource}
        fadeDuration={500}
      />
      {/* 
      REVIEW
      NOTE: USING AnimatedLinearGradient cause slow rendering shared element transition
      */}
      <LinearGradient
        {...lgProps}
        style={
          // opacityStyle1,
          styles.lg
        }
        // entering={FadeInDown}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name} fontWeight={"600"}>
            {name}
          </Text>
          {rating ? (
            <HStack space={2}>
              <TouchableOpacity onPress={() => navigate("comic-rating")}>
                <View
                  rounded={10}
                  overflow={"hidden"}
                  bg={"white"}
                  w={112}
                  mt={2}
                >
                  <AirbnbRating
                    count={5}
                    showRating={false}
                    defaultRating={rating}
                    isDisabled
                    size={12}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.bio} fontWeight={700}>
                {rating}
              </Text>
            </HStack>
          ) : (
            <Text style={styles.bio}>{bio}</Text>
          )}
        </View>
        <SharedElement id={`item.${photo}.photo`}>
          {/* <Image
            source={photoSource}
            // @ts-ignore
            width={100}
            height={100}
            style={{
              width: 130,
              height: 180,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: "#333",
              opacity: 1
            }}
          /> */}
          <TFastImage
            source={{
              uri: photo,
              priority: TFastImage?.priority?.high
            }}
            resizeMode={TFastImage?.resizeMode?.cover}
            style={styles.image}
          />
        </SharedElement>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: { marginLeft: 8, justifyContent: "flex-end", flex: 1 },
  name: {
    fontSize: 20,
    color: "white"
  },
  bio: { fontSize: 15, marginTop: 4, color: "#ccc" },
  photo: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  container: {
    flexDirection: "row",
    height: 280
  },
  image: {
    width: 130,
    height: 180,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    opacity: 1
  },
  lg: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 12
  }
});

export default memo(Header);
