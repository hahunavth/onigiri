import { Box, Center, View, Text, Factory } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableNativeFeedback,
  ViewStyle
} from "react-native";
import React from "react";
import { goBack } from "app/navigators/index";
import { Shadow } from "react-native-shadow-2";

export type NavigationHeaderProps = {
  onRightPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  onLeftPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  rightLabel?: string | null;
  leftLabel?: string | null;
  title?: string;
  headerRight?: (props: any) => React.ReactNode;
  headerLeft?: (props: any) => React.ReactNode;
  style?: ViewStyle;
  topEdge?: boolean;
};

const FSafeAreaView = Factory(SafeAreaView);
export const NavigationHeader = React.memo(function ({
  leftLabel,
  onLeftPress,
  onRightPress,
  rightLabel,
  title,
  headerLeft,
  headerRight,
  style,
  topEdge = true
}: NavigationHeaderProps) {
  const HeaderRight = headerRight && headerRight(null);
  const HeaderLeft = React.useMemo(() => headerLeft && headerLeft(null), []);

  return (
    <FSafeAreaView
      _light={{ backgroundColor: "$light.backgroundSecondary" }}
      _dark={{ backgroundColor: "$dark.backgroundYellowPrimary" }}
      justifyContent={"center"}
      pl={2}
      pr={2}
      mb={0.75}
      shadow={1}
      style={style}
      height={topEdge ? 74 : 16}
      edges={topEdge ? undefined : []}
    >
      <View>
        {/* Left */}
        <TouchableNativeFeedback onPress={goBack}>
          <View position={"absolute"} left={0} padding={1} top={-6}>
            <Text _light={{ color: "$light.textYellowPrimary" }}>
              {leftLabel || HeaderLeft}
            </Text>
          </View>
        </TouchableNativeFeedback>
        {/* Left */}

        {/* Right */}
        {/* <TouchableNativeFeedback onPress={onRightPress}> */}
        <View
          // style={[styles.Right, styles.buttonContainer]}
          style={{ position: "absolute", right: 0 }}
          padding={1}
          top={-3}
        >
          <Text _light={{ color: "$light.textSecondary" }}>
            {rightLabel || HeaderRight}
          </Text>
        </View>
        {/* </TouchableNativeFeedback> */}
        {/* Right */}

        <Center>
          <Text
            _light={{ color: "$light.textPrimary" }}
            fontWeight="bold"
            fontSize={15}
          >
            {title}
          </Text>
        </Center>
      </View>
    </FSafeAreaView>
  );
});
