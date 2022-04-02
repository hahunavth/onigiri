import { resComicDetail_T } from "app/types";
// import { Button, Icon, Layout } from "@ui-kitten/components";
import React, { forwardRef, memo, useCallback, useState } from "react";
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text
} from "react-native";
import { Button, View, Box } from "native-base";
import Animated, {
  Easing,
  // FadeInDown,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import FadeInView from "../AnimationWrapper/FadeInView";
import useInteraction from "app/hooks/useInteraction";
import { navigate } from "app/navigators";
import { useThemedColor } from "../Typo";
import Icon from "native-base/src/theme/components/icon";

const CollapseRoundView = ({
  children,
  detail
}: {
  children?: React.ReactNode;
  detail?: string;
}) => {
  const { backgroundPrimary, backgroundSecondary, textPrimary, textSecondary } =
    useThemedColor();

  const [collapse, setCollapse] = useState(true);

  const offset = useSharedValue(100);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // transform: [{ translateX: offset.value * 255 }],
      height: withTiming(offset.value, {
        duration: 500,
        easing: Easing.out(Easing.exp)
      })
    };
  });

  return (
    <Animated.View
      // level={'1'}
      style={[
        {
          borderRadius: 10,
          // backgroundColor: "#555",
          margin: 12
          // maxHeight: collapse ? 150 : undefined,
        },
        animatedStyles
      ]}
    >
      <LinearGradient
        colors={["transparent", collapse ? textSecondary : "transparent"]}
        start={{ x: 0, y: 0.85 }}
        style={{
          padding: 12,
          borderRadius: 10,
          flex: 1
        }}
      >
        <Text
          style={{
            fontSize: 18,
            // fontFamily: QFontFamily.Quicksand_700Bold,
            marginBottom: 8
          }}
        >
          Synopsis
        </Text>
        <ScrollView>
          <Text
            style={{
              fontSize: 14,
              // fontFamily: QFontFamily.Quicksand_500Medium,
              // color: "#eee",

              zIndex: -1
            }}
          >
            {detail}
          </Text>
        </ScrollView>
      </LinearGradient>
      <TouchableOpacity
        style={{
          // flex: 1,
          position: "absolute",
          bottom: -16,
          // right: 0,
          backgroundColor: "#5f37227e",
          borderRadius: 100,
          alignSelf: "center",
          width: 36,
          height: 36,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#5f3722"

          // shadowColor: "#000000",
          // shadowOffset: {
          //   width: 0,
          //   height: 10,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,

          // elevation: 5,
        }}
        onPress={() => {
          setCollapse(!collapse);
          // offset.value = Math.random();
          offset.value = offset.value === 100 ? 200 : 100;
        }}
      >
        {/* <Icon
          name={
            collapse ? 'arrow-ios-downward-outline' : 'arrow-ios-upward-outline'
          }
          style={{ width: 24, height: 24 }}
          fill="#db1b7bb5"
        /> */}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CollapseRoundView;
