import { Image } from "native-base";
import React from "react";
import { FlatList } from "react-native";
import Gallery from "react-native-awesome-gallery";
import { ChapterViewListProps } from "./type";

export const ChapterViewHorizontalList = React.forwardRef<
  FlatList,
  ChapterViewListProps
>((props, ref) => {
  const { imgs, handleScroll, onEndReach, imgList, toggleFloatingVisible } =
    props;
  console.log("object");
  console.log(imgs?.length);

  return imgs?.length > 0 ? (
    <Gallery
      data={
        imgs
        // .map((img) => img.uri)
      }
      // onIndexChange={(newIndex) => {
      //   console.log(newIndex)
      // }}
      disableVerticalSwipe={false}
      style={{ backgroundColor: "#eee" }}
      onTap={toggleFloatingVisible}
      renderItem={({ item, index, setImageDimensions }) => {
        return (
          <Image
            progressiveRenderingEnabled={true}
            accessibilityLabel={"ChapterViewHorizontalList.Gallery.Image"}
            alt="a"
            source={{
              uri: item,
              headers: { referer: "https://www.nettruyenpro.com" }
            }}
            w={"full"}
            resizeMode={"contain"}
            h={"full"}
          />
        );
      }}
    />
  ) : null;
});
