import { View, Text, Box, Center, HStack, VStack, Image } from 'native-base'
import { ListRenderItemInfo } from 'react-native'
import React from 'react'
import { FlatGrid } from 'react-native-super-grid'

import { TouchableNativeFeedback } from 'react-native'
import type { resComicItem_T } from '../../types'
import { ListHeader } from '../ListHeader'
import { ComicItem } from './ComicItem'

export function ComicGridGap3(props: { list: resComicItem_T[] }) {
  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<resComicItem_T>) => {
      return <ComicItem item={item} loading={!!item} />
    },
    []
  )

  return (
    <FlatGrid
      itemDimension={108}
      // numColumns={3}
      data={
        props.list?.length > 0
          ? props.list.slice(0, 6)
          : new Array(6).fill(false)
      }
      renderItem={renderItem}
      scrollEnabled={false}
      // keyExtractor={(item, id) => item?.path || id.toString()}
    />
  )

  // return null

  // return (
  //   <Center>
  //     <HStack justifyContent={'space-between'} w={385}>
  //       <ComicItem
  //         item={loading ? props.list[0] : undefined}
  //         loading={loading}
  //       />
  //       <ComicItem
  //         item={loading ? props.list[1] : undefined}
  //         loading={loading}
  //       />
  //       <ComicItem
  //         item={loading ? props.list[2] : undefined}
  //         loading={loading}
  //       />
  //     </HStack>
  //     <HStack justifyContent={'space-between'} w={385} pt={1}>
  //       <ComicItem
  //         item={loading ? props.list[3] : undefined}
  //         loading={loading}
  //       />
  //       <ComicItem
  //         item={loading ? props.list[4] : undefined}
  //         loading={loading}
  //       />
  //       <ComicItem
  //         item={loading ? props.list[5] : undefined}
  //         loading={loading}
  //       />
  //     </HStack>
  //   </Center>
  // )
}
