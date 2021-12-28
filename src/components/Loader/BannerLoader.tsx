import React from "react";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const PADDING = 14;

export const BannerLoader = () => (
  <ContentLoader
    speed={2}
    // fillRule={"evenodd"}
    width={400}
    height={160}
    viewBox={`0 0 ${width} 160`}
    backgroundColor="#dbb8b8"
    foregroundColor="#ecebeb"
    animate

    // {...props}
  >
    {/* <Circle cx="616" cy="235" r="46" /> */}
    <Rect
      x={PADDING}
      y="0"
      rx={PADDING}
      ry={PADDING}
      width={width - 2 * PADDING}
      height={160}
    />
  </ContentLoader>
);
