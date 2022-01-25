import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { comicListProps } from "../ComicListView/ComicList";
import QuicksandText from "./QuicksandText";
import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";
import { ColorSchemeE } from "@/styles/colorScheme";

const SessionHeader = ({
  name,
  onPressMore,
}: Partial<comicListProps>): JSX.Element => {
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.container}>
      <QuicksandText style={styles.title}>{name}</QuicksandText>
      {onPressMore && (
        <>
          <Pressable
            onPress={() => {
              onPressMore();
            }}
            style={styles.btn}
          >
            <QuicksandText style={styles.btnText}>More</QuicksandText>
            <Icon name="angle-right" style={styles.btnIcon} />
          </Pressable>{" "}
        </>
      )}
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: "Quicksand_600SemiBold",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    fontSize: 14,
    color: ColorSchemeE["text-hint-color"],
  },
  btnIcon: {
    fontSize: 20,
    color: ColorSchemeE["text-hint-color"],
    marginLeft: 4,
    marginRight: 16,
  },
});

export default SessionHeader;
