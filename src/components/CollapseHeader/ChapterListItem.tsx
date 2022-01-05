import { navigate } from "@/navigators";
import { resComicDetailChapterItem_T } from "@/types";
import React, { FC, memo, useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const PHOTO_SIZE = 40;

//
type Props = Pick<TouchableOpacityProps, "style"> & {
  chapter: resComicDetailChapterItem_T;
  id: number;
};

const ConnectionItem: FC<Props> = ({ style, chapter: connection, id }) => {
  const { path, updatedDistance, name } = connection;

  const mergedStyle = useMemo(() => [styles.container, style], [style]);

  return (
    <TouchableOpacity
      style={mergedStyle}
      onPress={() => navigate("Chapter", { path: connection.path, id })}
    >
      {/* <Image style={styles.image} source={{ uri: photo }} /> */}
      <Text style={styles.name}>{name}</Text>
      <Text>{updatedDistance}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", flexDirection: "row", padding: 16 },
  image: {
    height: PHOTO_SIZE,
    width: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
  },
  name: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
  },
});

export default memo(ConnectionItem);
