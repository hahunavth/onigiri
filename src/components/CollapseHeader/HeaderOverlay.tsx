import React, { FC, memo, useMemo } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import QuicksandText, { QFontFamily } from "../Common/QuicksandText";

type Props = Pick<ViewProps, "style"> & { name: string; numChapter: number };

const HeaderOverlay: FC<Props> = ({ style, name, numChapter }) => {
  const containerStyle = useMemo(() => [styles.container, style], [style]);

  return (
    <View style={containerStyle}>
      <QuicksandText style={styles.title} numberOfLines={1}>
        {name}
      </QuicksandText>
      <QuicksandText
        category={"s1"}
        status={"warning"}
        style={{ opacity: 0.6 }}
      >
        {numChapter} chapters
      </QuicksandText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // margin: 20,
    marginHorizontal: 60,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontFamily: QFontFamily.Quicksand_600SemiBold,
  },
});

export default memo(HeaderOverlay);
