import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useColorModeStyle } from "app/hooks/useColorModeStyle";
import { goBack, navigate } from "app/navigators";
import { useAppSafeAreaInsets } from "app/provider/safe-area/use-safe-area";
import { Text, View } from "native-base";
import React from "react";
import { Platform, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChapterContext } from "./ChapterContext";

interface Props {
  style?: ViewStyle;
  name?: string;
}

// NOTE: CHANGESS
const AnimatedSafeAreaView = Animated.createAnimatedComponent(
  Platform.select({
    web: require("native-base").View,
    native: require("react-native-safe-area-context").SafeAreaView
  })
);

const ChapterHeader = (props: Props) => {
  const { top } = useAppSafeAreaInsets();
  const { boxStyle, textStyle } = useColorModeStyle("", "Secondary");
  const { setViewStatus, viewStatus } = React.useContext(ChapterContext);

  const containerStyle = React.useMemo(() => {
    return [
      {
        position: "absolute",
        top: 0,
        // width: '100%',
        left: 0,
        right: 0,
        height: 48 + top,
        marginBottom: 0,
        zIndex: 100,
        backgroundColor: boxStyle.backgroundColor
        // marginHorizontal: PADDING / 2,
        // width: width - PADDING,
        // backgroundColor: "transparent",
      },
      props.style
    ];
  }, [props.style, top]);

  // const onMenuPress = React.useCallback(() => {
  //   Alert.alert("", "", [
  //     {
  //       text: "vertical",
  //       onPress: () => setViewStatus && setViewStatus("horizontal")
  //     },
  //     {
  //       text: "horizontal",
  //       onPress: () => setViewStatus && setViewStatus("vertical")
  //     }
  //   ]);
  // }, []);

  return (
    <>
      <AnimatedSafeAreaView style={containerStyle}>
        {/* Floading */}
        <SafeAreaView
          style={[
            {
              position: "absolute",
              right: 4,
              top: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center"
            },
            textStyle
          ]}
        >
          <TouchableOpacity
            // onPress={props.rightPress ? props.rightPress : onMenuPress}
            onPress={() => navigate("chapter-setting")}
          >
            <MaterialIcons
              name="settings-applications"
              size={32}
              color={textStyle.color}
            />
          </TouchableOpacity>
        </SafeAreaView>

        <SafeAreaView
          style={[
            {
              position: "absolute",
              left: 4,
              top: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center"
            },
            textStyle
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}
          >
            <AntDesign name="arrowleft" size={34} color={textStyle.color} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* <View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 0
              // backgroundColor: '#1e282b83'
              // justifyContent: "center",
              // padding: 20,
              // backgroundColor: "red",
              // borderBottomLeftRadius: 20,
            },
            StyleSheet.absoluteFill
          ]}
          // intensity={60}
          // tint={'dark'}
          // blurType="light"
          // blurAmount={20}
          // blurRadius={15}
          // downsampleFactor={4}
          // overlayColor="transparent"
        /> */}
        <View
          style={{
            position: "relative",
            flex: 1,
            backgroundColor: "transparent",
            // borderBottomLeftRadius: 20,
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            // marginBottom: ,
            marginTop: 2
          }}
        >
          <Text
            style={textStyle}
            mx={12}
            numberOfLines={2}
            textAlign={"center"}
          >
            {props.name}
          </Text>
        </View>
      </AnimatedSafeAreaView>
    </>
  );
};

export default ChapterHeader;
