import { View, Text } from 'react-native'
import React from 'react'

import { Button, Image, FlatList, VStack, HStack } from 'native-base'
import { ImageProps, Dimensions } from 'react-native'
import { deleteAllImgs, getSingleImg } from 'app/utils/imgManager'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { historySelector } from '../../store/historySlice'

import type { OfflineChapterScreenProps } from 'app/navigators/StackNav'
import useUpdateCurrentChapter from '../../hooks/useUpdateCurrentChapter'
import { default as LocalComicImage } from './LocalImage'
import PinchWrapper from '../../components/PinchWrapper'

export const OfflineChapterScreen = (props: OfflineChapterScreenProps) => {
  const { comicPath, chapterPath } = props.route.params

  const [imgs, setImgs] = React.useState<{ uri: string; h: number }[]>([])

  const history = useAppSelector(historySelector)

  const { loading } = useUpdateCurrentChapter({
    chapterDetail: history.downloadCpt[chapterPath],
    id: -1,
    isFetching: false
  })

  React.useEffect(() => {
    let isMounted = true

    ;(async () => {
      const images = history.downloadCpt[chapterPath]?.images || []

      const fileUrls = await Promise.all(
        images.map((url) => {
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
      <PinchWrapper>
        {loading ? null : (
          <FlatList
            data={imgs}
            renderItem={renderItem}
            keyExtractor={(item) => item.uri}
            initialNumToRender={4}
            maxToRenderPerBatch={5}
            removeClippedSubviews={true}
          />
        )}
      </PinchWrapper>
    </View>
  )
}
