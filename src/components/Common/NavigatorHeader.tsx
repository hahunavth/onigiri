import { View, Text, TextStyle, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { Layout } from "@ui-kitten/components";
import QuicksandText, { QFontFamily } from "./QuicksandText";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyBlurView } from "./MyBlurView";
import Animated from "react-native-reanimated";
import { BlurView } from "expo-blur";

type Props = {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  title?: string;
  titleStyle?: TextStyle;
  headerContainerStyle?: ViewStyle;
};

const AnimatedSaveAreaView = Animated.createAnimatedComponent(SafeAreaView);

const NavigatorHeader = ({
  headerLeft,
  headerRight,
  title,
  titleStyle,
  headerContainerStyle,
}: Props) => {
  return (
    <>
      <AnimatedSaveAreaView
        style={[
          {
            // backgroundColor: "transparent",
            position: "absolute",
            top: 0,
            width: "100%",
            height: 44,
            // overflow: "hidden",
          },
          headerContainerStyle,
        ]}
      >
        {/* <BlurView
          style={[
            {
              position: "absolute",
              top: 42,
              left: 0,
              // bottom: 5,
              right: 0,
              height: 72,

              // justifyContent: "center",
              backgroundColor: "#1e282b83",
              // padding: 20,
              // backgroundColor: "red",
              // borderBottomLeftRadius: 20,
            },
            StyleSheet.absoluteFill,
          ]}
          
          // blurType="light"
          // blurAmount={10}
          // blurRadius={10}
          // downsampleFactor={1}
          // overlayColor="transparent"
        /> */}
        <View
          // level={"1"}
          style={{
            position: "relative",
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#3030305e",

            // backgroundColor: "transparent",
          }}
        >
          <View
            style={{ position: "absolute", left: 0, marginHorizontal: "auto" }}
          >
            {headerLeft}
          </View>
          <QuicksandText
            style={[
              {
                fontSize: 15,
                fontFamily: QFontFamily.Quicksand_700Bold,
              },
              titleStyle,
            ]}
          >
            {title}
          </QuicksandText>
          <View>{headerRight}</View>
        </View>
      </AnimatedSaveAreaView>
    </>
  );
};

export default NavigatorHeader;
