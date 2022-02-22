//import liraries
import React, { Component, useEffect, useState, useMemo } from 'react'
import { Image as ImageElement, Dimensions, ScaledSize } from 'react-native'

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')
const windowWidth = window.width

type Props = {
  src: string
  setImgs?: React.Dispatch<React.SetStateAction<any[]>>
  h?: number
  id?: number
}

const ScaledImagex = ({ src, setImgs, h, id }: Props) => {
  const [size, setSize] = useState({ width: 1, height: 1 })
  const [dimensions, setDimensions] = useState({ window, screen })
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState('')

  useEffect(() => {
    let isMounted = true
    // if (!h)
    ImageElement.getSize(src, (width, height) => {
      // if (isMounted) setSize(() => ({ width, height }))
      const screenWidth = windowWidth
      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor

      if (isMounted) {
        setImgs((arr) =>
          arr.map((item, id) => {
            if (id !== id) return item
            return { ...item, h: imageHeight }
          })
        )
      }
    })

    return () => {
      isMounted = false
    }
  }, [src])

  // NOTE: RESIZABLE
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

  // useEffect(() => {
  //   let isMounted = true
  //   fetch(
  //     src.replace(
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
  //           reader.onload = function () {
  //             callback(this.result)
  //           }
  //           reader.readAsDataURL(blob)
  //         })
  //     )
  //     .then((data) => {
  //       if (isMounted) setData(typeof data === 'string' ? data : '')
  //     })

  //   return () => {
  //     isMounted = false
  //   }
  // }, [])

  return (
    <>
      {data ? (
        <ImageElement
          source={{ uri: src, width: windowWidth }}
          style={[
            {
              width: windowWidth,
              height: h
            }
          ]}
          // resizeMode={'cover'}
          // onLoadEnd={() => setLoading(false)}
          fadeDuration={0}
        />
      ) : null}
    </>
  )
}

//make this component available to the app
export const ScaledImage = React.memo(ScaledImagex)
