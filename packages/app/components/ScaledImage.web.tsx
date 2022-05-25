//import liraries
import React, { Component, useEffect, useState, useMemo } from "react";
import {
  Image as ImageElement,
  StyleSheet,
  Dimensions,
  ScaledSize,
  ActivityIndicator,
  Modal
} from "react-native";
import { Image, View, Text, Box } from "native-base";
import { Loading } from "./EmptyPage/Loading";
import { useColorModeStyle } from "app/hooks/useColorModeStyle";
import { default as NextImage } from "next/image";

// import { Image as ImageElement } from 'native-base'

// const screen = Dimensions.get('window')
const window = Dimensions.get("screen");

type ScaledImageProps = {
  source: {
    uri: string;
  };
  setImgs?: React.Dispatch<React.SetStateAction<{ uri: string; h: number }[]>>;
  h: number;
  id?: number;
};

const ScaledImagex = ({ source, h, id, setImgs }: ScaledImageProps) => {
  // const [size, setSize] = useState({ width: 1, height: 1 })
  // const [dimensions, setDimensions] = useState({ window, screen })
  // const [loading, setLoading] = useState(true)
  const [data, setData] = useState("");

  // if (source.uri === '')
  // console.log('empty')

  useEffect(() => {
    let isMounted = true;
    if (!h) {
      // console.log('getSize' + id, ' h ', h)
      // ImageElement.getSizeWithHeaders(
      //   source.uri.replace(
      //     'https://hahunavth-express-api.herokuapp.com/api/v1/cors/',
      //     ''
      //   ),
      //   {
      //     referer: 'https://www.nettruyenpro.com'
      //   },
      //   (width, height) => {
      //     // if (isMounted) setSize(() => ({ width, height }))
      //     if (isMounted) {
      //       setImgs &&
      //         setImgs((imgs) => {
      //           return (
      //             imgs?.map((item, index) =>
      //               index === id
      //                 ? { ...item, h: (height / width) * window.width }
      //                 : item
      //             ) || []
      //           )
      //         })
      //     }
      //  }
      // )

      setImgs &&
        setImgs((imgs) => {
          return (
            imgs?.map((item, index) =>
              index === id ? { ...item, h: (320 / 240) * window.width } : item
            ) || []
          );
        });
    }
    return () => {
      isMounted = false;
    };
  }, [source]);

  // useEffect(() => {
  //   const onChange = ({
  //     window,
  //     screen
  //   }: {
  //     window: ScaledSize
  //     screen: ScaledSize
  //   }) => {
  //     setDimensions(() => ({
  //       window,
  //       screen
  //     }))
  //     Dimensions.addEventListener('change', onChange)
  //     return () => Dimensions.removeEventListener('change', onChange)
  //   }
  // }, [])

  // STUB: FETCH IMAGE IN USEEFFECT
  // useEffect(() => {
  //   let isMounted = true
  //   // console.log('fetch', id, h)
  //   if(!data) {
  //   fetch(
  //     source.uri.replace(
  //       'https://hahunavth-express-api.herokuapp.com/api/v1/cors/',
  //       ''
  //     ),
  //     {
  //       headers: {
  //         referer: 'https://www.nettruyenpro.com'
  //       }
  //     }
  //   )
  //     .then((response) => response.blob())
  //     .then(
  //       (blob) =>
  //         new Promise((callback) => {
  //           let reader = new FileReader()
  //           reader.onload = function() {
  //             callback(this.result)
  //             // var image = new Image();
  //
  //             // image.src = reader.result;
  //
  //             // image.onload = function () {
  //             //   alert(image.width);
  //             // };
  //           }
  //           reader.readAsDataURL(blob)
  //         })
  //     )
  //     .then((data) => {
  //       if (isMounted) setData(typeof data === 'string' ? data : '')
  //     })
  //
  // }
  //   return () => {
  //     isMounted = false
  //   }
  // }, [])

  // const imageStyle = React.useMemo(() => {
  //   return {
  //     width: window.width,
  //     // 320: (240.height / size.window.width) * window.width
  //     height: (h) / window.height * window.width
  //     // flex: 1,
  //   }
  // }, [h, window.width])

  const imageSrc = React.useMemo(() => {
    return { uri: data };
  }, [data]);

  const { boxStyle, textStyle } = useColorModeStyle("", "Primary");
  const { boxStyle: boxStyle2, textStyle: textStyle2 } = useColorModeStyle(
    "",
    "Secondary"
  );

  if (!h) {
    return (
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        height={window.width}
        bg={boxStyle.backgroundColor}
        _text={textStyle}
      >
        <Text
          fontSize={20}
          fontWeight={"bold"}
          textAlign={"center"}
          lineHeight={52}
          borderRadius={"full"}
          h={60}
          w={60}
          borderWidth={10}
          borderColor={boxStyle2.backgroundColor}
        >
          {id}
        </Text>
      </Box>
    );
  }

  return (
    <>
      {/* <Image
          progressiveRenderingEnabled={true}
        source={{
          uri: source.uri.replace(
            'https://hahunavth-express-api.herokuapp.com/api/v1/cors/',
            ''
          ),
          method: 'GET',
          headers: {
            referer: 'https://www.nettruyenpro.com'
          }
        }}
        w={window.width}
        h={h}
        fadeDuration={0}
        alt={'image'}
        defaultSource={1}
      /> */}
      <NextImage
        src={source.uri}
        // width={120}
        // height={120}
        width={window.width}
        height={h}
        // fadeDuration={0}
      />
    </>
  );
};

//make this component available to the app
export const ScaledImage = React.memo(ScaledImagex);
