//import liraries
import React, { Component, useEffect, useState, useMemo } from 'react'
import {
  View,
  Text,
  Image as ImageElement,
  StyleSheet,
  Dimensions,
  ScaledSize,
  ActivityIndicator,
  Modal
} from 'react-native'

// import { Image as ImageElement } from 'native-base'

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')

// create a component
const ScaledImagex = ({
  src,
  h,
  id,
  setImgs
}: {
  src: string
  setImgs?: React.Dispatch<React.SetStateAction<any[]>>
  h?: number
  id?: number
}) => {
  const [size, setSize] = useState({ width: 1, height: 1 })
  const [dimensions, setDimensions] = useState({ window, screen })
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState('')

  useEffect(() => {
    let isMounted = true
    if (!h) {
      ImageElement.getSize(src, (width, height) => {
        // if (isMounted) setSize(() => ({ width, height }))
        if (isMounted) {
          setImgs((imgs) =>
            imgs.map((item, index) =>
              index === id
                ? { ...item, h: (height / width) * dimensions.window.width }
                : item
            )
          )
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [src])

  useEffect(() => {
    const onChange = ({
      window,
      screen
    }: {
      window: ScaledSize
      screen: ScaledSize
    }) => {
      setDimensions(() => ({
        window,
        screen
      }))
      Dimensions.addEventListener('change', onChange)
      return () => Dimensions.removeEventListener('change', onChange)
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    fetch(
      src.replace(
        'https://hahunavth-express-api.herokuapp.com/api/v1/cors/',
        ''
      ),
      {
        headers: {
          referer: 'https://www.nettruyenpro.com'
        }
      }
    )
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((callback) => {
            let reader = new FileReader()
            reader.onload = function () {
              callback(this.result)
              // var image = new Image();

              // image.src = reader.result;

              // image.onload = function () {
              //   alert(image.width);
              // };
            }
            reader.readAsDataURL(blob)
          })
      )
      .then((data) => {
        if (isMounted) setData(typeof data === 'string' ? data : '')
      })
    // let isMounted = true;

    // ImageElement.getSizeWithHeaders(
    //   src.replace(
    //     "https://hahunavth-express-api.herokuapp.com/api/v1/cors/",
    //     ""
    //   ),
    //   {
    //     referer: "https://www.nettruyenpro.com",
    //   },
    //   (width, height) => {
    //     if (isMounted) setSize(() => ({ width, height }));
    //   }
    // );

    return () => {
      isMounted = false
    }
  }, [])

  // console.log(size);

  return (
    <>
      {data ? (
        <ImageElement
          // source={{ uri: src }}
          source={{ uri: data }}
          // defaultSource={}
          style={[
            {
              width: dimensions.window.width,
              // height: (size.height / size.width) * dimensions.window.width
              height: h
              // flex: 1,
            }
          ]}
          fadeDuration={0}
        />
      ) : null}
    </>
  )
}

//make this component available to the app
export const ScaledImage = React.memo(ScaledImagex)
