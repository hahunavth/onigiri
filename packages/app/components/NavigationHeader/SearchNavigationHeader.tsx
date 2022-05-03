import React from "react";
import { NavigationHeader as WebNavigationHeader } from "./NavigationHeader.web";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { goBack, navigate } from "app/navigators/index";
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Factory,
  Heading,
  HStack,
  Icon,
  IInputProps,
  Input,
  Text,
  useColorModeValue,
  useToken,
  View,
  VStack
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorModeStyle } from "app/hooks/useColorModeStyle";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  useWindowDimensions,
  KeyboardAvoidingView,
  ToastAndroid,
  Keyboard,
  TextInput,
  Alert
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  withDelay
} from "react-native-reanimated";
import { useAppSafeAreaInsets } from "app/provider/safe-area/use-safe-area";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import recentSlice, {
  recentAction,
  recentSelector
} from "app/store/recentSlice";
import usePrevious from "react-use/esm/usePrevious";
import i18n from "i18n-js";

const FSafeAreaView = Factory(SafeAreaView);
const AnimatedInput = Animated.createAnimatedComponent(Input);
const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedIonIcons = Animated.createAnimatedComponent(Ionicons);
const AnimatedFSafeAreaView = Animated.createAnimatedComponent(FSafeAreaView);
const AnimatedButton = Animated.createAnimatedComponent(Button);

export const MainNavigationHeader: React.FC<NativeStackHeaderProps> = (
  props: NativeStackHeaderProps
) => {
  /**
   * NOTE: AVOID SEARCH BAR CHILD RERENDER WHEN NAVIGATION CLICK
   */
  return <SearchNavigationHeaderChild></SearchNavigationHeaderChild>;
};

const SearchNavigationHeaderChild = React.memo(() => {
  const { findNames } = useAppSelector(recentSelector);

  // Animation
  const insets = useAppSafeAreaInsets();
  const { boxStyle: bs1, textStyle: ts1 } = useColorModeStyle("", "Primary");
  const { boxStyle: bs2, textStyle: ts2 } = useColorModeStyle("", "Secondary");
  const { boxStyle: bs3, textStyle: ts3 } = useColorModeStyle(
    "Yellow",
    "Secondary"
  );
  const inputRef = React.useRef<any>();
  // const { height, width } = useWindowDimensions()
  const offset = useSharedValue(0);

  const cancelBtnAnimatedStyles = useAnimatedStyle(() => {
    return {
      // opacity: withTiming(offset.value / 78 + 0.5, {
      //   duration: 500,
      //   easing: Easing.out(Easing.exp)
      // }),
      position: "absolute",
      right: -60,
      transform: [
        {
          translateX: withTiming(-offset.value * 2, {
            duration: 500,
            easing: Easing.out(Easing.exp)
          })
        },
        {
          translateY: 12
        }
      ]
    };
  });

  const floatingResultAnimatedStyles = useAnimatedStyle(() => {
    return {
      // opacity: offset.value / 34
      opacity: withTiming(offset.value / 34, {
        duration: 500,
        easing: Easing.out(Easing.exp)
      }),
      flex: 1,
      marginTop: 4,
      paddingTop: 4,
      paddingLeft: 12
    };
  });

  const floatingOverlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      // height: withTiming(100 * (34 - offset.value)),
      bottom: -1000,
      left: 0,
      right: 0,
      backgroundColor: "white",
      opacity: withTiming(offset.value / 34, {
        duration: 500,
        easing: Easing.out(Easing.exp)
      })
    };
  });

  const explainHeightAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: withDelay(100, withTiming(offset.value * 10 + 40))
      // backgroundColor: 'white'
    };
  }, []);

  const notificationIconAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(-offset.value)
        }
      ]
    };
  });

  const personIconAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value)
        }
      ]
    };
  });
  // ToastAndroid.show('render header', 100)

  // const prev = usePrevious(personIconAnimatedStyles)
  // console.log('renderrrr child', personIconAnimatedStyles === prev)

  const dispatch = useAppDispatch();

  /**
   * ANCHOR: Nested SafeAreaView sometime cause rerender -> lag
   */
  return (
    <SafeAreaView
      style={{
        backgroundColor: useColorModeValue("#fbecdf", "#643318"),
        zIndex: 10
      }}
    >
      <Animated.View
        // backgroundColor={bs2.backgroundColor}
        style={explainHeightAnimatedStyles}
      >
        {/* Only 16 px */}
        <View maxH={32} pl={2} pr={2} mt={1} pb={1} justifyContent={"center"}>
          {/*  Right icon */}
          <View
            style={{
              position: "absolute",
              right: 0
              // marginVertical: 'auto'
            }}
            height={16}
            justifyContent={"center"}
            alignItems={"center"}
            mr={2}
          >
            <Animated.View
              style={[
                {
                  marginTop: 24
                },
                personIconAnimatedStyles
              ]}
            >
              <TouchableOpacity onPress={() => navigate("login")}>
                <AnimatedIonIcons
                  name="md-person-circle-outline"
                  size={28}
                  color={ts1.color}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/*  Left icon */}
          <View
            style={{
              position: "absolute",
              left: 0
              // marginVertical: 'auto'
            }}
            height={16}
            justifyContent={"center"}
            alignItems={"center"}
            ml={2}
            pt={6}
            // mt={12}
          >
            <Animated.View style={notificationIconAnimatedStyles}>
              <TouchableOpacity onPress={() => navigate("notification")}>
                <AnimatedIonIcons
                  name="notifications-outline"
                  size={28}
                  color={ts1.color}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/*  Cancel btn */}
          <AnimatedBox style={cancelBtnAnimatedStyles}>
            <AnimatedButton
              size={"md"}
              variant={"link"}
              colorScheme={"danger"}
              // fontSize={16}
              fontWeight="bold"
              p={1}
              onPress={() => {
                // console.log(inputRef.current.getNode())
                if (inputRef.current) inputRef.current.blur();
                // console.log('inputRef.current')
              }}
            >
              Cancel
            </AnimatedButton>
          </AnimatedBox>
        </View>
        {/* <HeaderLeft /> */}
        <RefAnimatedInput
          bs1={bs1}
          offset={offset}
          // animatedStyle={animatedStyles}
          ref={inputRef}
          // ref={(input) => (inputRef ? (inputRef.current = input) : null)}
        />

        {/* Floating */}
        <Animated.View
          // position={'absolute'}
          // top={16}
          // left={0}
          // right={0}
          // w={'100'}
          // h={1000}
          // bg={'red.100'}
          // zIndex={100000}
          style={[
            {
              // position: 'absolute',
              // bottom: 0,
              // left: 0,
              // right: 0,
              // height: 0,
              // backgroundColor: 'white',
            },
            floatingResultAnimatedStyles
          ]}
        >
          {/* <Animated.View style={floatingOverlayAnimatedStyle}></Animated.View> */}

          <HStack justifyContent={"space-between"}>
            <Text
              fontSize={15}
              fontWeight={"bold"}
              color={bs2._text.color}
              pb={1}
              // opacity={0.8}
            >
              {i18n.t("button.find-history")}
            </Text>
            <TouchableOpacity
              onPress={() => dispatch(recentAction.removeAllFindNames())}
            >
              <Text
                fontSize={13}
                fontWeight={"500"}
                // color={bs2._text.color}
                mb={1}
                mr={4}
                px={2}
                pb={0.5}
                rounded={12}
                bg={"$light.backgroundButton"}
                color={"$light.textButton"}
              >
                ClearAll
              </Text>
            </TouchableOpacity>
          </HStack>
          <HStack flex={1} flexWrap={"wrap"}>
            {findNames.slice(0, 10).map((v, id) => (
              <Button
                key={id}
                size={"md"}
                variant={"subtle"}
                py={0}
                px={3}
                rounded={"full"}
                colorScheme={"warning"}
                mb={1}
                mr={1}
                onPress={() => {
                  if (inputRef.current) {
                    inputRef.current.setNativeProps({
                      text: v
                    });
                    // inputRef.current.
                  }
                }}
                onLongPress={() => {
                  Alert.alert(
                    "Remove history",
                    "Do you want remove history?",
                    [
                      { text: i18n.t("button.cancel"), style: "cancel" },
                      {
                        text: "OK",
                        style: "default",
                        onPress: () => dispatch(recentAction.removeFindName(v))
                      }
                    ],
                    {}
                  );
                }}
              >
                {v}
              </Button>
            ))}
          </HStack>
        </Animated.View>
        {/* Floating */}
      </Animated.View>
    </SafeAreaView>
  );
});

/**
 * NOTE: TextInput in parent component will cause dismiss keyboard onChange
 * DONE: Dismiss keyboard will blur text input
 * DONE: Using native event instead of text state
 * @description Separate it to this component
 * @summary Handle navigate here!
 */
const RefAnimatedInput = React.forwardRef<TextInput, any>((props, ref) => {
  const dispatch = useAppDispatch();

  const inputRef = React.useRef<TextInput>();

  React.useEffect(() => {
    const _keyboardDidHide = () => inputRef?.current?.blur();
    const emitter = Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      emitter.remove();
    };
  }, []);

  // const [text, setText] = React.useState('')
  // const handleChange = (text: string) => setText(text)
  // ref = text
  const { width } = useWindowDimensions();
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(width - 90 + props.offset.value * 0.4, {
        duration: 500,
        easing: Easing.out(Easing.exp)
      }),
      transform: [
        {
          translateX: withTiming(-props.offset.value + 42, {
            duration: 500,
            easing: Easing.out(Easing.exp)
          })
        },
        {
          translateY: -3
        }
      ]
    };
  });

  return (
    <>
      <AnimatedInput
        // @ts-ignore
        ref={(myref: TextInput) => {
          // @ts-ignore
          ref ? (ref.current = myref) : null;
          inputRef ? (inputRef.current = myref) : null;
        }}
        placeholder={i18n.t("button.search")}
        variant="outline"
        // mx={35}
        size={"xs"}
        py={-12}
        // mt={-1}
        h={31}
        fontSize={14}
        color={props.bs1._text.color}
        bg={props.bs1.backgroundColor}
        onFocus={() => (props.offset.value = 34)}
        onBlur={() => (props.offset.value = 0)}
        style={animatedStyles}
        keyboardAppearance={"dark"}
        enablesReturnKeyAutomatically
        // value={text}
        // onChangeText={handleChange}
        // onTextInput={() => console.log('first')}
        // blurOnSubmit
        onSubmitEditing={(e) => {
          // console.log(e.nativeEvent.text)
          if (e.nativeEvent.text) {
            navigate("find-by-name-result", { name: e.nativeEvent.text });
            dispatch(recentAction.pushFindName(e.nativeEvent.text));
          }

          inputRef.current?.setNativeProps({
            text: ""
          });

          // setText('')
          Keyboard.dismiss();
        }}
      />
    </>
  );
});
