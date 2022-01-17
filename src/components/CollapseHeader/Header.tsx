import { resComicDetail_T } from "@/types";
import React, { FC, memo, useMemo } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import QuicksandText, { QFontFamily } from "../Common/QuicksandText";
import { SharedElement } from "react-navigation-shared-element";

export const PHOTO_SIZE = 120;

// NOTE: Animation config
export type HeaderConfig = {
  heightExpanded: number;
  heightCollapsed: number;
};
export enum Visibility {
  Hidden = 0,
  Visible = 1,
}

type Props2 = Pick<ViewProps, "style"> & {
  photo: string;
  name: string;
  bio: string;
};

const Header: FC<Props2> = ({ style, name, photo, bio }) => {
  // REVIEW: Save Style
  const containerStyle = useMemo(() => [styles.container, style], []);

  // REVIEW: Save Image source for next render
  const photoSource = useMemo<ImageProps["source"]>(() => ({ uri: photo }), []);
  // const photoSource = { uri: photo };

  return (
    <View style={containerStyle}>
      <ImageBackground
        style={styles.photo}
        blurRadius={4}
        source={photoSource}
      />
      <LinearGradient
        colors={["#000000d8", "#00000042", "#77777747"]}
        start={{ x: 0, y: 1.1 }}
        end={{ x: 0, y: 0 }}
        style={{
          flex: 1,
          // justifyContent: "flex-end",
          // alignItems: "flex-start",
          flexDirection: "row",
          // backgroundColor: "white",
          alignItems: "flex-end",
          padding: 12,
        }}
      >
        <View style={styles.textContainer}>
          <QuicksandText style={styles.name}>{name}</QuicksandText>
          <Text style={styles.bio}>{bio}</Text>
        </View>
        <SharedElement id={`${photo}`}>
          <Image
            source={photoSource}
            width={100}
            height={100}
            style={{
              width: 130,
              height: 180,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: "#333",
            }}
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
    fontFamily: QFontFamily.Quicksand_700Bold,
    color: "white",
  },
  bio: { fontSize: 15, marginTop: 4, color: "#ccc" },
  photo: {
    // height: PHOTO_SIZE,
    // width: width,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // borderRadius: PHOTO_SIZE / 2,
  },
  container: {
    flexDirection: "row",
    // backgroundColor: "white",
    // alignItems: "flex-end",
    // padding: 24,
    height: 280,
  },
});

export default memo(Header);

// FIXME: Fix type of sharedElement config
// @ts-ignore
Header.sharedElements = (navigation: any) => {
  // const item = navigation.getParam("ComicDetails");
  console.log(navigation.route.params.comic.posterUrl);
  return [`${navigation.route.params.comic.posterUrl}`];
};
