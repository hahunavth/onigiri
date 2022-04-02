import React from "react";

import { Button, Image, FlatList, VStack, HStack } from "native-base";
import { ImageProps, Dimensions } from "react-native";
import useInteraction from "app/hooks/useInteraction";

/**
 * Child component
 */
const w = Dimensions.get("window").width;

const LocalImage = React.memo(function (
  props: ImageProps & {
    setImgs?: React.Dispatch<React.SetStateAction<any[]>>;
    h?: number;
    id?: number;
  }
) {
  // console.log('rerender', props.id)
  // React.useEffect(() => {
  //   let isMounted = true
  //   if (!props.h) {
  //     console.log('getSize', props.id)
  //     // @ts-ignore
  //     Image.getSize(props.source?.uri || '', (width, height) => {
  //       const screenWidth = w
  //       const scaleFactor = width / screenWidth
  //       const imageHeight = height / scaleFactor
  //
  //       if (isMounted) {
  //         props.setImgs &&
  //           props.setImgs((arr) =>
  //             arr.map((item, id) => {
  //               if (id !== props.id) return item
  //               return { ...item, h: imageHeight }
  //             })
  //           )
  //       }
  //     })
  //   }
  //   return () => {
  //     isMounted = false
  //   }
  // }, [])

  const { loading } = useInteraction({
    callback: () => {
      if (!props.h) {
        console.log("getSize", props.id);
        // @ts-ignore
        Image.getSize(props.source?.uri || "", (width, height) => {
          const screenWidth = w;
          const scaleFactor = width / screenWidth;
          const imageHeight = height / scaleFactor;

          // if (isMounted) {
          props.setImgs &&
            props.setImgs((arr) =>
              arr.map((item, id) => {
                if (id !== props.id) return item;
                return { ...item, h: imageHeight };
              })
            );
          // }
        });
      }
    }
  });

  return (
    <>
      {loading ? null : (
        <Image {...props} w={w} h={props.h} alt={"ComicImage"} />
      )}
    </>
  );
});

export default LocalImage;
