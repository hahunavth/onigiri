import { MyBlurView } from "@/components/Common/MyBlurView";
import QuicksandText from "@/components/Common/QuicksandText";
import { Icon } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ViewProps,
  ViewStyle,
  InteractionManager,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useAppSelector } from "@/app/hooks";
import { selectHome } from "@/app/homeSlice";
import { useNavigation } from "@react-navigation/native";
import { MainNavigationProps } from "@/navigators";
import { usePrefetch } from "@/app/api";
import Animated from "react-native-reanimated";

interface Props {
  style?: ViewStyle;
}

const ChapterBar = (props: Props) => {
  const home = useAppSelector(selectHome);

  const navigation = useNavigation<MainNavigationProps>();
  const { width, height } = useWindowDimensions();
  const chapterCallback = usePrefetch("getChapterByPath", {});

  // const PADDING = 32;

  const [nextChapter, setNextChapter] = useState("");
  const [prevChapter, setPrevChapter] = useState("");

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      const length = home.currentComic?.chapters.length;
      const id = home.currentChapter?.id;
      const list = home.currentComic?.chapters;
      if (id && length && list) {
        if (id < length - 1) {
          setNextChapter(() => list[id + 1].path);
          if (list[id + 1].path) chapterCallback(list[id + 1].path);
        }
        if (id > 0) {
          setPrevChapter(() => list[id - 1].path);
          if (list[id - 1].path) chapterCallback(list[id - 1].path);
        }
      }
    });
    return () => {
      interaction.cancel();
    };
  }, [home.currentChapter?.chapterName]);

  return (
    <>
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 64,
            marginBottom: 0,
            // marginHorizontal: PADDING / 2,
            // width: width - PADDING,
            // backgroundColor: "transparent",
          },
          props.style,
        ]}
      >
        <MyBlurView
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 0,
              backgroundColor: "#1e282b83",
              // justifyContent: "center",
              // padding: 20,
              // backgroundColor: "red",
              // borderBottomLeftRadius: 20,
            },
            StyleSheet.absoluteFill,
          ]}
          // blurType="light"
          blurAmount={20}
          blurRadius={15}
          downsampleFactor={4}
          overlayColor="transparent"
        />
        <View
          style={{
            position: "relative",
            flex: 1,
            backgroundColor: "transparent",
            // borderBottomLeftRadius: 20,
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: -4,
            marginTop: 2,
          }}
        >
          <TouchableOpacity
            disabled={!nextChapter}
            onPress={() => {
              if (nextChapter && home.currentChapter?.id) {
                navigation.navigate("Chapter", {
                  path: nextChapter,
                  id: home.currentChapter?.id + 1,
                  name: nextChapter,
                });
              }
            }}
          >
            <AntDesign
              name={"arrowleft"}
              size={32}
              style={{ color: "white" }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name={"like2"} size={32} style={{ color: "white" }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name={"message1"} size={28} style={{ color: "white" }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name={"reload1"} size={28} style={{ color: "white" }} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!prevChapter}
            onPress={() => {
              if (prevChapter && home.currentChapter?.id) {
                navigation.navigate("Chapter", {
                  path: prevChapter,
                  id: home.currentChapter?.id - 1,
                  name: prevChapter,
                });
              }
            }}
          >
            <AntDesign
              name={"arrowright"}
              size={32}
              style={{ color: "white" }}
            />
          </TouchableOpacity>
        </View>
        <QuicksandText
          style={{ alignSelf: "center", color: "white" }}
          numberOfLines={1}
        >
          {home.currentChapter?.chapterName}
        </QuicksandText>
      </Animated.View>
    </>
  );
};

export default ChapterBar;
