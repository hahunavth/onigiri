import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  VStack,
  HStack
} from "native-base";
import { ImageProps, Dimensions } from "react-native";
import React from "react";
import { deleteAllImgs, getSingleImg } from "app/utils/imgManager";
import { useApiComicDetail } from "app/store/api";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { historySelector } from "app/store/historySlice";

import { SelectableBadge } from "app/components/SelectableBadge";

type Props = {};

const comicPath =
  "/truyen-tranh/monster-ga-afureru-sekai-ni-natta-node-suki-ni-ikitai-to-omoimasu-25132";
const chpaterPath =
  "/truyen-tranh/monster-ga-afureru-sekai-ni-natta-node-suki-ni-ikitai-to-omoimasu/chap-2/503986";

export const DownloadedChapterScreen = (props: Props) => {
  const [imgs, setImgs] = React.useState<{ uri: string; h: number }[]>([]);

  // const { data } = useApiComicDetail(
  //   '/truyen-tranh/monster-ga-afureru-sekai-ni-natta-node-suki-ni-ikitai-to-omoimasu-25132'
  // )
  // const dispatch = useAppDispatch()
  const history = useAppSelector(historySelector);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const fileUrls = await Promise.all(
        history?.downloadCpt[chpaterPath]?.images.map((url) => {
          return getSingleImg(url, comicPath, chpaterPath);
        }) || []
      );
      // console.log(fileUrls)
      if (isMounted) setImgs(fileUrls.map((uri) => ({ uri: uri, h: 0 })));
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const renderItem = React.useCallback(({ item, index }) => {
    return (
      <ComicImage
        source={{ uri: item.uri }}
        h={item.h}
        id={index}
        setImgs={setImgs}
        // w={'full'}
        // flex={1}
        // h={'600'}
        // resizeMode={'contain'}
        // alt="img"
        // setImgs={setHList}
      />
    );
  }, []);

  return (
    <View>
      <Button>Download</Button>
      <FlatList
        // itemHeight={100}
        data={imgs}
        renderItem={renderItem}
        keyExtractor={(item) => item.uri}
        initialNumToRender={4}
        maxToRenderPerBatch={5}
        removeClippedSubviews={true}
        // minimumZoomScale={5}
      />
      {/* <ScrollView flex={1}>
        {imgs.map((url) => (
          <ComicImage
            source={{ uri: url }}
            // w={'full'}
            // flex={1}
            // h={'40'}
            // resizeMode={'contain'}
            // alt="img"
          />
        ))}
      </ScrollView> */}
      <Text>TestScreen 222</Text>
    </View>
  );
};

const w = Dimensions.get("window").width;

const ComicImage = React.memo(function (
  props: ImageProps & {
    setImgs?: React.Dispatch<React.SetStateAction<any[]>>;
    h?: number;
    id?: number;
  }
) {
  React.useEffect(() => {
    let isMounted = true;
    if (!props.h) {
      // @ts-ignore
      Image.getSize(props.source?.uri || "", (width, height) => {
        const screenWidth = w;
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;

        if (isMounted) {
          // setSize({ width: screenWidth, height: imageHeight })
          props.setImgs &&
            props.setImgs((arr) =>
              arr.map((item, id) => {
                if (id !== props.id) return item;
                return { ...item, h: imageHeight };
              })
            );
        }
        // console.log(props.id)
      });
    }
    // console.log('r' + props.id)

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Image
      {...props}
      w={w}
      h={props.h}
      alt={"ComicImage"}
      // resizeMethod={'resize'}
    />
  );
});
