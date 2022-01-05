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
      <View
        style={{
          position: "absolute",
          height: 30,
          left: 0,
          right: 0,
          top: 0,
          zIndex: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AntDesign
          name="arrowleft"
          size={30}
          color={"white"}
          style={{ margin: 2 }}
        />
        <View>
          <AntDesign
            name="menuunfold"
            size={30}
            color={"white"}
            style={{ margin: 2 }}
          />
        </View>
      </View>
      <ImageBackground
        style={styles.photo}
        blurRadius={4}
        source={photoSource}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
      <Image
        source={photoSource}
        width={100}
        height={100}
        style={{ width: 150, height: 200 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: { marginLeft: 8, justifyContent: "flex-end", flex: 1 },
  name: { fontSize: 24, fontWeight: "700", color: "white" },
  bio: { fontSize: 15, marginTop: 4, color: "white" },
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
    backgroundColor: "white",
    alignItems: "flex-end",
    padding: 24,
    height: 280,
  },
});

export default memo(Header);
