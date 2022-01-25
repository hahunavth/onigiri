import {
  resChapterDetail_T,
  resComicDetailChapterItem_T,
  resComicDetail_T,
} from "@/types";
import { Button, Icon, Layout } from "@ui-kitten/components";
import React, { forwardRef, memo, useCallback, useState } from "react";
import {
  Dimensions,
  FlatList,
  FlatListProps,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import QuicksandText, { QFontFamily } from "../Common/QuicksandText";
import ChapterListItem from "./ChapterListItem";

import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

// @ts-ignore
export const AnimatedFlatList: typeof FlatList =
  Animated.createAnimatedComponent(FlatList);

type Props = Omit<FlatListProps<resComicDetail_T>, "renderItem">;

const Details = forwardRef<FlatList, Props>((props, ref) => {
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const renderItem = useCallback<ListRenderItem<resComicDetail_T>>(
    ({ item }) => (
      <View style={{}}>
        <CollapseRoundView detail={item.detail}></CollapseRoundView>
        <RoundView>
          <QuicksandText
            style={{
              fontSize: 18,
              fontFamily: QFontFamily.Quicksand_700Bold,
              marginBottom: 8,
            }}
          >
            Genre
          </QuicksandText>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {item.kind.map((kind) => (
              <Button
                key={kind}
                style={{ margin: 4 }}
                size={"tiny"}
                status={"danger"}
                appearance={"outline"}
              >
                {kind}
              </Button>
            ))}
          </View>
          <QuicksandText
            style={{
              fontSize: 18,
              fontFamily: QFontFamily.Quicksand_700Bold,
              marginBottom: 8,
            }}
          >
            Complete info
          </QuicksandText>
          <View style={{ paddingLeft: 4 }}>
            <QuicksandText style={{ color: "#ccc", fontSize: 11 }}>
              Author:
            </QuicksandText>

            <QuicksandText
              style={{
                fontSize: 14,
                fontFamily: QFontFamily.Quicksand_600SemiBold,
              }}
            >
              {item.author}
            </QuicksandText>

            <QuicksandText style={{ color: "#ccc", fontSize: 11 }}>
              Status:
            </QuicksandText>
            <QuicksandText
              style={{
                fontSize: 14,
                fontFamily: QFontFamily.Quicksand_600SemiBold,
              }}
            >
              {item.status}
            </QuicksandText>
            <QuicksandText style={{ color: "#ccc", fontSize: 11 }}>
              Rating:
            </QuicksandText>
            <QuicksandText
              style={{
                fontSize: 14,
                fontFamily: QFontFamily.Quicksand_600SemiBold,
              }}
            >
              {item.rate}
            </QuicksandText>
            <QuicksandText style={{ color: "#ccc", fontSize: 11 }}>
              Followers:
            </QuicksandText>
            <QuicksandText
              style={{
                fontSize: 14,
                fontFamily: QFontFamily.Quicksand_600SemiBold,
              }}
            >
              {item.info}
            </QuicksandText>
          </View>
        </RoundView>
      </View>
    ),
    []
  );

  return (
    <Layout style={{ flex: 1 }} level={"3"}>
      <AnimatedFlatList
        ref={ref}
        style={styles.container}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...props}
      />
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    flex: 1,
  },
});

export default memo(Details);

const RoundView = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <Layout
      level={"1"}
      style={[
        {
          borderRadius: 10,
          // backgroundColor: "#555",
          padding: 12,
          margin: 12,
        },
        style,
      ]}
    >
      {children}
    </Layout>
  );
};

const AnimatedLayout = Animated.createAnimatedComponent(Layout);

const CollapseRoundView = ({
  children,
  detail,
}: {
  children?: React.ReactNode;
  detail?: string;
}) => {
  const [collapse, setCollapse] = useState(true);

  const offset = useSharedValue(100);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // transform: [{ translateX: offset.value * 255 }],
      height: withTiming(offset.value, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      }),
    };
  });

  return (
    <AnimatedLayout
      level={"1"}
      style={[
        {
          borderRadius: 10,
          // backgroundColor: "#555",
          margin: 12,
          // maxHeight: collapse ? 150 : undefined,
        },
        animatedStyles,
      ]}
    >
      <LinearGradient
        colors={["transparent", collapse ? "#b93f5e60" : "transparent"]}
        start={{ x: 0, y: 0.85 }}
        style={{
          padding: 12,
          borderRadius: 10,
          flex: 1,
        }}
      >
        <QuicksandText
          style={{
            fontSize: 18,
            fontFamily: QFontFamily.Quicksand_700Bold,
            marginBottom: 8,
          }}
        >
          Synopsis
        </QuicksandText>
        <ScrollView>
          <QuicksandText
            style={{
              fontSize: 14,
              fontFamily: QFontFamily.Quicksand_500Medium,
              // color: "#eee",

              zIndex: -1,
            }}
          >
            {detail}
          </QuicksandText>
        </ScrollView>
      </LinearGradient>
      <TouchableOpacity
        style={{
          // flex: 1,
          position: "absolute",
          bottom: -16,
          // right: 0,
          backgroundColor: "#dd7cad5c",
          borderRadius: 100,
          alignSelf: "center",
          width: 36,
          height: 36,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#a03d4e",

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
        <Icon
          name={
            collapse ? "arrow-ios-downward-outline" : "arrow-ios-upward-outline"
          }
          style={{ width: 24, height: 24 }}
          fill="#db1b7bb5"
        />
      </TouchableOpacity>
    </AnimatedLayout>
  );
};
