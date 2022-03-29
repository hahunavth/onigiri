// import FastImage from "react-native-fast-image"

const TFastImage =
  process.env.FAST_IMAGE === "true"
    ? require("react-native-fast-image")
    : require("native-base").Image;

console.log(
  `USING ${process.env.FAST_IMAGE === "true" ? "FAST IMAGE" : "IMAGE"} STORAGE`
);

export default TFastImage;
