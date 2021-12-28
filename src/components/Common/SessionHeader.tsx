import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { comicListProps } from "../ComicListView/ComicList";
import QuicksandText from "./QuicksandText";
import { Layout } from "@ui-kitten/components";

const SessionHeader = ({
  name,
  onPressMore,
}: Partial<comicListProps>): JSX.Element => {
  const HeaderHeight = 40;

  return (
    <Layout
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: 10,
      }}
    >
      <QuicksandText
        style={{
          fontSize: 20,
          marginLeft: 10,
          fontFamily: "Quicksand_600SemiBold",
        }}
      >
        {name}
      </QuicksandText>
      {onPressMore && (
        <>
          <Pressable
            onPress={() => {
              onPressMore();
            }}
            style={{
              // width: HeaderHeight,
              // height: HeaderHeight,
              // flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <QuicksandText
              style={{
                // width: HeaderHeight, height: HeaderHeight,
                fontSize: 14,
                color: "#837d7d",
              }}
            >
              More
            </QuicksandText>
            <Icon
              name="angle-right"
              style={{
                fontSize: 20,
                color: "#837d7d",
                marginLeft: 4,
                marginRight: 16,
              }}
            />
          </Pressable>{" "}
        </>
      )}
    </Layout>
  );
};

export default SessionHeader;
