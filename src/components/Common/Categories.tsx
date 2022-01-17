import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ListRenderItemInfo,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryBtn, { CategoryBtnProps } from "./CategoryBtn";
import SessionHeader from "./SessionHeader";

interface Props {}

const CategoryList: CategoryBtnProps[] = [
  { name: "Bang xep Hang", iconName: "map-outline", onPress: () => null },
  { name: "Phan loai", iconName: "pantone-outline", onPress: () => null },
  { name: "Tim kiem", iconName: "search-outline", onPress: () => null },
  { name: "More", iconName: "more-horizontal-outline", onPress: () => null },
];

const Categories = (props: Props) => {
  return (
    <SafeAreaView>
      <SessionHeader name="Categories" list={[]} />
      <View style={styles.btnContainer}>
        <FlatList
          numColumns={4}
          data={CategoryList}
          renderItem={(item: ListRenderItemInfo<CategoryBtnProps>) => (
            <CategoryBtn {...item.item} />
          )}
          keyExtractor={(item, index) => item.name + index.toString()}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          style={{ height: 100 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
