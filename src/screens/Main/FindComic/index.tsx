import React, { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import { useQuery } from "react-query";

import { ComicList } from "@/components/ComicListView/ComicList";
import ComingSoon from "@/components/Common/CommingSoon";
import {
  FOR_USER,
  GENRES_LIST,
  NUM_CHAPTER,
  SORT_BY,
  STATUS,
} from "./constants";

export const FindComicScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  return (
    <View style={styles.container}>
      <Select
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index as IndexPath)}
      >
        {STATUS.map((status) => (
          <SelectItem title={status.value} key={status.key} />
        ))}
      </Select>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#74b9ff",
    minHeight: 128,
  },
});
