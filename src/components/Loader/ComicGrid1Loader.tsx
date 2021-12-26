import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

export const ComicGrid1Loader = () => (
  <ContentLoader
    speed={2}
    width={340}
    height={84}
    viewBox="0 0 340 84"
    backgroundColor="#dacbcb"
    foregroundColor="#ecebeb"
  >
    <Rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
    <Rect x="172" y="64" rx="3" ry="3" width="159" height="14" />
    <Rect x="20" y="64" rx="3" ry="3" width="138" height="15" />
    <Rect x="18" y="23" rx="3" ry="3" width="140" height="37" />
    <Rect x="166" y="23" rx="3" ry="3" width="173" height="33" />
  </ContentLoader>
);
