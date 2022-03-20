import React from 'react'
import {
  ListRenderItemInfo,
  FlatList,
  TouchableNativeFeedback
} from 'react-native'
import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack
} from 'native-base'
import { ScaledImage } from '../../components/ScaledImage'
import { AntDesign } from '@expo/vector-icons'
import ChapterFooterBtn from '../../components/ChapterFooterBtn'
import PinchWrapper from '../../components/PinchWrapper'
import { ChapterContext } from './ChapterContext'
import { useAppSelector } from '../../store/hooks'
import { homeSelector } from '../../store/homeSlice'
import ImageView from 'react-native-image-viewing'
import Gallery from 'react-native-awesome-gallery'
import { ChapterViewListProps } from './type'

export const ChapterViewHorizontalList = React.forwardRef<
  FlatList,
  ChapterViewListProps
>((props, ref) => {
  const {
    imgs,
    setImgs,
    handleScroll,
    onEndReach,
    imgList,
    toggleFloatingVisible
  } = props
  console.log('object')
  console.log(imgs?.length)

  return imgs?.length > 0 ? (
    <Gallery
      data={imgs.map((img) => img.uri)}
      // onIndexChange={(newIndex) => {
      //   console.log(newIndex)
      // }}
      disableVerticalSwipe={false}
      style={{ backgroundColor: '#eee' }}
      onTap={toggleFloatingVisible}
      renderItem={({ item, index, setImageDimensions }) => {
        return (
          <Image
            alt="a"
            source={{
              uri: item,
              headers: { referer: 'https://www.nettruyenpro.com' }
            }}
            w={'full'}
            resizeMode={'contain'}
            h={'full'}
          />
        )
      }}
    />
  ) : null
})
