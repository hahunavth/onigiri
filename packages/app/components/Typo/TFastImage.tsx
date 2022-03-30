const TFastImage =
  process.env.FAST_IMAGE === "true"
    ? // STUB: COMMENT
      require("react-native-fast-image")
    : // STUB: COMMENT
      require("native-base").Image;

console.log(
  `USING ${process.env.FAST_IMAGE === "true" ? "FAST IMAGE" : "IMAGE"} STORAGE`
);

export default TFastImage;
