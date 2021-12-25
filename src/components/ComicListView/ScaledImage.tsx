//import liraries
import React, { Component, useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  Image as ImageElement,
  StyleSheet,
  Dimensions,
  ScaledSize,
  ActivityIndicator,
} from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

// create a component
const ScaledImage = ({ src }: { src: string }) => {
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [dimensions, setDimensions] = useState({ window, screen });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    let isMounted = true;
    ImageElement.getSize(src, (width, height) => {
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
  useEffect(() => {
    fetch(
      src.replace(
        "https://hahunavth-express-api.herokuapp.com/api/v1/cors/",
        ""
      ),
      {
        headers: {
          referer: "https://www.nettruyenpro.com",
        },
      }
    )
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((callback) => {
            let reader = new FileReader();
            reader.onload = function () {
              callback(this.result);
              // var image = new Image();

              // image.src = reader.result;

              // image.onload = function () {
              //   alert(image.width);
              // };
            };
            reader.readAsDataURL(blob);
          })
      )
      .then((data) => setData(typeof data === "string" ? data : ""));
    // let isMounted = true;

    // ImageElement.getSizeWithHeaders(
    //   src.replace(
    //     "https://hahunavth-express-api.herokuapp.com/api/v1/cors/",
    //     ""
    //   ),
    //   {
    //     referer: "https://www.nettruyenpro.com",
    //   },
    //   (width, height) => {
    //     if (isMounted) setSize(() => ({ width, height }));
    //   }
    // );

    // return () => {
    //   isMounted = false;
    // };
  }, []);

  // console.log(size);

  return (
    <>
      {data ? (
        <ImageElement
          // source={{ uri: src }}
          source={{ uri: data, width: dimensions.window.width }}
          // defaultSource={}
          style={{
            width: dimensions.window.width,
            height: (size.height / size.width) * dimensions.window.width,
            // flex: 1,
          }}
          resizeMode={"cover"}
          onLoadEnd={() => setLoading(false)}
          fadeDuration={0}
        />
      ) : null}
      {loading ? (
        <ActivityIndicator
          // style={{ width: dimensions.window.width, height: 20 }}
          animating={loading}
          size="small"
          color="#0000ff"
        />
      ) : null}
    </>
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
export default React.memo(ScaledImage);
