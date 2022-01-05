import React from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";
// import { BlurViewProperties } from "@react-native-community/blur";
// import { BlurView } from "expo-blur";

export interface BlurViewProperties {
  blurType?:
    | "xlight"
    | "light"
    | "dark"
    // iOS 13+ only
    | "chromeMaterial"
    | "material"
    | "thickMaterial"
    | "thinMaterial"
    | "ultraThinMaterial"
    | "chromeMaterialDark"
    | "materialDark"
    | "thickMaterialDark"
    | "thinMaterialDark"
    | "ultraThinMaterialDark"
    | "chromeMaterialLight"
    | "materialLight"
    | "thickMaterialLight"
    | "thinMaterialLight"
    | "ultraThinMaterialLight"
    // tvOS and iOS 10+ only
    | "regular"
    | "prominent"
    // tvOS only
    | "extraDark";
  blurAmount?: number; // 0 - 100
  reducedTransparencyFallbackColor?: string;
  style?: StyleProp<ViewStyle>;
  blurRadius?: number;
  downsampleFactor?: number;
  overlayColor?: string;
}

// NOTE: Specific platform
// Use expo-blur in web
//    rnc/blur in mobile
export function MyBlurView(props: BlurViewProperties) {
  return <View></View>;
}

// export function MyBlurView() {
//   console.log(Platform.OS);
//   return <View></View>;
// }
