// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// export const ProfileScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Profile</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#a29bfe",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Card, Layout, List, Text } from "@ui-kitten/components";

const data = new Array(8).fill({
  title: "Item",
});
// ListCustomItemShowcase
export const ProfileScreen = () => {
  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category="h6">
        {info.item.title} {info.index + 1}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps) => (
    <Text {...footerProps}>By Wikipedia</Text>
  );

  const renderItem = (info) => (
    <Card
      style={styles.item}
      status="basic"
      // header={(headerProps) => renderItemHeader(headerProps, info)}
      // footer={renderItemFooter}
    >
      <Layout style={styles.layoutContainer}>
        <Layout style={{ paddingRight: 15 }}>
          <Image
            style={styles.poster}
            source={{
              uri: "http://st.imageinstant.net/data/comics/32/vo-luyen-dinh-phong.jpg",
            }}
          />
        </Layout>
        <Layout
        // style={styles.layout}
        >
          <Text
            category={"h6"}
            // status={info}
            // style={{ textDecorationColor: "#fff" }}
          >
            Haha
          </Text>
          <Text>Haha</Text>
          <Text>Haha</Text>
        </Layout>
      </Layout>
    </Card>
  );

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // maxHeight: 320,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
  layoutContainer: {
    flex: 1,
    flexDirection: "row",
  },
  layout: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 8,
  },
  poster: {
    width: 72,
    height: 108,
  },
});
