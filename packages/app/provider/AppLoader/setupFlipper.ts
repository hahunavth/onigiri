// @ts-ignore
import { connectToDevTools } from "react-devtools-core";
import { Platform } from "react-native";

export default function setupFlipper() {
  // FLIPPER CONNECT
  if (__DEV__ && Platform.OS !== "web") {
    connectToDevTools({
      host: "localhost",
      port: 8097
    });
    require("react-native-performance-flipper-reporter").setupDefaultFlipperReporter();
  }

  /**
   * TODO: USE MMKV INSTEAD OF ASYNC STORAGE
   */
  if (__DEV__ && process.env.MMKV === "true") {
    console.log("USING MMKV DEBUGGER");
    const initializeMMKVFlipper =
      require("react-native-mmkv-flipper-plugin").initializeMMKVFlipper;
    const MMKV = require("react-native-mmkv").MMKV;
    const storage = new MMKV();
    initializeMMKVFlipper({ default: storage });
  }
}
