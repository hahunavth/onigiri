import { View, Text, Box, Center, HStack, VStack, Image } from 'native-base'
import React from 'react'
import { TouchableNativeFeedback } from 'react-native'
import type { resComicItem_T } from '../../types'
import { ListHeader } from '../ListHeader'
import { ComicItem } from './ComicItem'

export function ComicGridGap3(props: { list: resComicItem_T[] }) {
  const loading = props.list && props.list.length > 6
  return (
    <Center>
      <HStack justifyContent={'space-between'} w={385}>
        <ComicItem
          item={loading ? props.list[0] : undefined}
          loading={loading}
        />
        <ComicItem
          item={loading ? props.list[1] : undefined}
          loading={loading}
        />
        <ComicItem
          item={loading ? props.list[2] : undefined}
          loading={loading}
        />
      </HStack>
      <HStack justifyContent={'space-between'} w={385} pt={1}>
        <ComicItem
          item={loading ? props.list[3] : undefined}
          loading={loading}
        />
        <ComicItem
          item={loading ? props.list[4] : undefined}
          loading={loading}
        />
        <ComicItem
          item={loading ? props.list[5] : undefined}
          loading={loading}
        />
      </HStack>
    </Center>
  )
}
