/**
 * Deprecated performance
 */

import { selectReadChapters } from "app/store/historySlice";
import { useAppSelector } from "app/store/hooks";
import { navigate } from "app/navigators";
import { resComicDetailChapterItem_T } from "app/types";
import React, { FC, memo, useMemo } from "react";
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacityProps,
  View
} from "react-native";
import { Checkbox, HStack } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { dateString2Distance } from "app/utils/dateFormat";
// import QuicksandText, { QFontFamily } from "../Common/QuicksandText";

export const PHOTO_SIZE = 40;

//
type Props = Pick<TouchableOpacityProps, "style"> & {
  chapter: resComicDetailChapterItem_T;
  id: number;
  // visited?: boolean;
  readCptObj?: {
    [path: string]: number;
  };
  offline?: boolean;
  comicPath?: string;
  customOnPress?: () => any;
  //
  selectable?: boolean;
  selected?: boolean;
  // customOnPress is onSelect
  disable?: boolean;
};

const ConnectionItem: FC<Props> = ({
  style,
  chapter: connection,
  id,
  // visited,
  readCptObj,
  offline,
  comicPath,
  customOnPress,
  selectable,
  selected,
  disable
}) => {
  const { path, updatedDistance, name, updatedAt } = connection;
  // const visited = !!useAppSelector(historySelector).readCpt[path]
  // @ts-ignore
  const visited = !!useAppSelector(selectReadChapters)[path];

  const mergedStyle = useMemo(() => [styles.container, style], [style]);
  const chapterTextStyle = useMemo(() => {
    return [styles.name, visited ? { color: "purple" } : null];
  }, [visited]);
  // const visited = useMemo(() => readCptObj && readCptObj[path], [path]);
  console.log(path);

  return (
    <TouchableNativeFeedback
      style={mergedStyle}
      onPress={
        customOnPress
          ? customOnPress
          : () => {
              if (offline) {
                if (comicPath)
                  navigate("offline-chapter-screen", {
                    comicPath: comicPath,
                    chapterPath: connection.path
                  });
              } else {
                console.log({
                  id: id,
                  path: connection.path,
                  name: connection.name
                });
                navigate("chapter", {
                  id: id,
                  path: connection.path,
                  name: connection.name
                });
              }
            }
      }
    >
      <View style={mergedStyle}>
        {/* <Image style={styles.image} source={{ uri: photo }} /> */}
        {selectable ? (
          <HStack alignItems={"center"}>
            <Checkbox
              value="a"
              accessibilityLabel="a"
              isChecked={selected}
              isDisabled={disable}
            />
            <Text style={chapterTextStyle}>{name}</Text>
          </HStack>
        ) : (
          <Text style={chapterTextStyle}>{name}</Text>
        )}

        <Text style={{ color: "#ccc" }}>
          {/* FIXME: REJECT PROMISE */}
          {dateString2Distance(updatedAt) || updatedDistance}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between"
  },
  image: {
    height: PHOTO_SIZE,
    width: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2
  },
  name: {
    marginLeft: 8,
    fontSize: 15
    // fontFamily: QFontFamily.Quicksand_600SemiBold,
  }
});

export default memo(
  ConnectionItem
  // , (prev, next) => {
  // return prev.chapter === next.chapter;
  // }
);
