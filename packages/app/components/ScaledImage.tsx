import React, {
  Component,
  useEffect,
  useState,
  useMemo,
  useLayoutEffect
} from "react";
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
import TFastImage from "./Typo/TFastImage";

type ScaledImageProps = {
  source: {
    uri: string;
  };
  setImgs?: React.Dispatch<React.SetStateAction<{ uri: string; h: number }[]>>;
  h: number;
  w: number;
  id?: number;
};

const ScaledImagex = ({
  source,
  // h: ratio,
  id,
  // setImgs,
  w
}: ScaledImageProps) => {
  const [ratio, setRatio] = useState(0);

  useLayoutEffect(() => {
    let isMounted = true;
    if (!ratio) {
      // console.log('getSize' + id, ' h ', h)
      ImageElement.getSizeWithHeaders(
        source.uri,
        // .replace(
        //   "https://hahunavth-express-api.herokuapp.com/api/v1/cors/",
        //   ""
        // )
        {
          referer: "https://www.nettruyenpro.com"
        },
        (width, height) => {
          // if (isMounted) setSize(() => ({ width, height }))
          if (isMounted) {
            setRatio &&
              // setRatio((imgs) => {
              //     return (
              //       imgs?.map(
              //         (item, index) =>
              //           index === id ? { ...item, h: height / width } : item
              //         // index === id ? { ...item, h: (height / width) * w } : item
              //       ) || []
              //     );
              //   });
              setRatio(height / width);
          }
        }
      );
    }
    return () => {
      isMounted = false;
    };
  }, [source]);

  // useLayoutEffect(() => {
  //   let mount = true;

  //   if (h && mount) {
  //     setImgs &&
  //       setImgs((imgs) => {
  //         return (
  //           imgs?.map((item, index) =>
  //             index === id ? { ...item, h: ratio * w } : item
  //           ) || []
  //         );
  //       });
  //   }

  //   return () => {
  //     mount = false;
  //   };
  // }, [w]);

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
  //     // height: (size.height / size.window.width) * window.width
  //     height: (h) / window.height * window.width
  //     // flex: 1,
  //   }
  // }, [h, window.width])

  // const imageSrc = React.useMemo(() => {
  //   return { uri: data };
  // }, [data]);

  const { boxStyle, textStyle } = useColorModeStyle("", "Primary");
  const { boxStyle: boxStyle2, textStyle: textStyle2 } = useColorModeStyle(
    "",
    "Secondary"
  );

  if (!ratio) {
    return (
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        height={w}
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
          borderWidth={6}
          borderColor={boxStyle2.backgroundColor}
        >
          {id}
        </Text>
      </Box>
    );
  }

  return (
    <TFastImage
      source={{
        uri: source.uri.replace(
          "https://hahunavth-express-api.herokuapp.com/api/v1/cors/",
          ""
        ),
        headers: {
          referer: "https://www.nettruyenpro.com"
        },
        priority: TFastImage.priority.high
      }}
      style={{ width: w, height: ratio * w }}
      resizeMode={TFastImage.resizeMode.contain}
    />
  );

  
};

//make this component available to the app
export const ScaledImage = React.memo(ScaledImagex, (prev, next) => {
  return (
    prev.h === next.h &&
    prev.w === next.w &&
    prev.source.uri === next.source.uri
  );
});
