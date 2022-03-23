import type {
  FastImageProps,
  FastImageStaticProperties,
  ImageStyle,
  OnLoadEvent,
  OnProgressEvent,
  Priority,
  ResizeMode,
  Source
} from "react-native-fast-image";
import { Image } from "native-base";
import React from "react";
// @ts-ignore
const TFastImage = Image as React.Component<FastImageProps> &
  FastImageStaticProperties;

export * from "react-native-fast-image";
export default TFastImage;
