import { Icon } from "@ui-kitten/components";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ListRenderItemInfo,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DetailsBtnProps {
  name: string;
  iconName: string;
  onPress: () => any;
}

const DetailsList: DetailsBtnProps[] = [
  { name: "Rate", iconName: "home", onPress: () => null },
  { name: "Comments", iconName: "home", onPress: () => null },
  { name: "Subcribes", iconName: "home", onPress: () => null },
  { name: "More", iconName: "home", onPress: () => null },
];

const DetailsBar = () => {
  return (
    <SafeAreaView>
      <View style={styles.btnContainer}>
        <FlatList
          numColumns={4}
          data={DetailsList}
          renderItem={(item: ListRenderItemInfo<DetailsBtnProps>) => (
            <View style={{ backgroundColor: "#000000" }}>
              <Icon name={item.item.iconName} />
              <Text style={{ color: "black" }}>aaaaaa</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          style={{ height: 100 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailsBar;

const styles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
