import { getEnv } from "app/utils/env";

const isUseFastImage = getEnv("FAST_IMAGE");

const TFastImage =
  isUseFastImage === "true"
    ? require("react-native-fast-image")
    : require("native-base").Image;

console.info(
  `USING ${isUseFastImage === "true" ? "FAST IMAGE" : "IMAGE"} STORAGE`
);

export default TFastImage;
