//import liraries
import React, { Component, useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScaledSize,
} from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

// create a component
const ScaledImage = ({ src }: { src: string }) => {
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [dimensions, setDimensions] = useState({ window, screen });

  useEffect(() => {
    let isMounted = true;
    Image.getSize(src, (width, height) => {
      if (isMounted) setSize(() => ({ width, height }));
    });
    return () => {
      isMounted = false;
    };
  }, [src]);

  useEffect(() => {
    const onChange = ({
      window,
      screen,
    }: {
      window: ScaledSize;
      screen: ScaledSize;
    }) => {
      setDimensions(() => ({
        window,
        screen,
      }));
      Dimensions.addEventListener("change", onChange);
      return () => Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  console.log(size);

  return (
    <Image
      source={{ uri: src }}
      style={{
        width: dimensions.window.width,
        height: (size.height / size.width) * dimensions.window.width,
      }}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default ScaledImage;
