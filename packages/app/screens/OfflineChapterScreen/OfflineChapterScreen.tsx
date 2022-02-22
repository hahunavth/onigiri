import { View, Text } from 'react-native'
import React from 'react'

import { Button, Image, FlatList, VStack, HStack } from 'native-base'
import { ImageProps, Dimensions } from 'react-native'
import { deleteAllImgs, getSingleImg } from 'app/utils/imgManager'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { historySelector } from '../../store/historySlice'

import type { OfflineChapterScreenProps } from 'app/navigators/StackNav'

export const OfflineChapterScreen = (props: OfflineChapterScreenProps) => {
  const { comicPath, chapterPath } = props.route.params

  const [imgs, setImgs] = React.useState<{ uri: string; h: number }[]>([])

  const history = useAppSelector(historySelector)

  React.useEffect(() => {
    let isMounted = true

    ;(async () => {
      const fileUrls = await Promise.all(
        history.downloadCpt[chapterPath].images.map((url) => {
          return getSingleImg(url, comicPath, chapterPath)
        })
      )
      if (isMounted) setImgs(fileUrls.map((uri) => ({ uri: uri, h: 0 })))
    })()

    return () => {
      isMounted = false
    }
  }, [])

  const renderItem = React.useCallback(({ item, index }) => {
    return (
      <LocalComicImage
        source={{ uri: item.uri }}
        h={item.h}
        id={index}
        setImgs={setImgs}
      />
    )
  }, [])

  return (
    <View>
      <Button>Download</Button>
      <FlatList
        data={imgs}
        renderItem={renderItem}
        keyExtractor={(item) => item.uri}
        initialNumToRender={4}
        maxToRenderPerBatch={5}
        removeClippedSubviews={true}
        // minimumZoomScale={5}
      />

      <Text>TestScreen 222</Text>
    </View>
  )
}

const w = Dimensions.get('window').width

const LocalComicImage = React.memo(function (
  props: ImageProps & {
    setImgs?: React.Dispatch<React.SetStateAction<any[]>>
    h?: number
    id?: number
  }
) {
  React.useEffect(() => {
    let isMounted = true
    if (!props.h) {
      // @ts-ignore
      Image.getSize(props.source?.uri || '', (width, height) => {
        const screenWidth = w
        const scaleFactor = width / screenWidth
        const imageHeight = height / scaleFactor

        if (isMounted) {
          props.setImgs((arr) =>
            arr.map((item, id) => {
              if (id !== props.id) return item
              return { ...item, h: imageHeight }
            })
          )
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [])

  return <Image {...props} w={w} h={props.h} alt={'ComicImage'} />
})
