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
import { Image, IImageProps } from "native-base";
import React from "react";
// @ts-ignore
const TFastImage = (props: IImageProps) =>
  // @ts-ignore
  (<Image alt={"TImage"} {...props} />) as React.Component<FastImageProps> &
    FastImageStaticProperties;

// export * from "react-native-fast-image";
export default TFastImage;
