import React from "react";
import { View, Text, Button, Image, ScrollView, HStack } from "native-base";
import {
  useWindowDimensions,
  Dimensions,
  LayoutAnimation,
  Platform,
  StyleSheet
} from "react-native";

type Props = {};

const { width } = Dimensions.get("screen");

const DynamicColumnGrid = (props: Props) => {
  // const { width } = useWindowDimensions();

  const [cols, setCols] = React.useState(5);

  const setColsCount = (v: number) => {
    LayoutAnimation.easeInEaseOut();
    setCols(v);
  };

  // React.useEffect(() => {
  //   setColsCount(Math.round(width / 100));
  // }, [width]);

  React.useEffect(() => {
    const e = Dimensions.addEventListener("change", ({ screen }) => {
      // setColsCount(Math.round(screen.width / Math.sqrt(screen.width)));
      // setColsCount(Math.sqrt(screen.width));
      if (screen.width < 300) setColsCount(screen.width / 2);
      else if (screen.width < 400) setColsCount(screen.width / 3);
      else if (screen.width < 600) setColsCount(screen.width / 4);
      else if (screen.width < 900) setColsCount(screen.width / 5);
    });

    // return () => e;
  }, []);

  return (
    <View flex={1}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around"
        }}
      >
        {new Array(10).fill(1).map((_, id) => {
          return (
            <View h={cols} w={cols} key={id}>
              <Image
                src="https://st.nettruyenmoi.com/data/comics/37/anh-hung-onepunch.jpg"
                alt="I"
                w={"full"}
                h={"full"}
              />
            </View>
          );
        })}
      </ScrollView>
      <HStack h={50}>
        <Button onPress={() => setColsCount(cols + 1)}>add</Button>
        <Button onPress={() => setColsCount(cols - 1)}>reduce</Button>
      </HStack>
    </View>
  );
};

export default DynamicColumnGrid;
