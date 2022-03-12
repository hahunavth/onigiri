import { Center, HStack } from 'native-base'
import { ListRenderItemInfo } from 'react-native'
import React from 'react'
import { FlatGrid } from 'react-native-super-grid'

import { GridItem } from './GridItem'

import type { ComicGridGap2Props } from './types'
import { resComicItem_T } from '../../types'

export * from './types'

export const ComicGridGap2 = (props: ComicGridGap2Props) => {
  // const loading = props.list && props.list.length > 6

  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<resComicItem_T>) => {
      return <GridItem item={item} loading={!!item} />
    },
    [props.list]
  )

  return (
    <FlatGrid
      itemDimension={130}
      data={props.list.slice(0, 6) || new Array(6).fill(false)}
      renderItem={renderItem}
      scrollEnabled={false}
      keyExtractor={(item, id) => item?.path || id.toString()}
    />
  )

  // return null

  // return (
  //   <Center>
  //     <HStack justifyContent={'space-between'} w={385}>
  //       <GridItem
  //         item={loading ? props.list[0] : undefined}
  //         loading={loading}
  //       />
  //       <GridItem
  //         item={loading ? props.list[1] : undefined}
  //         loading={loading}
  //       />
  //     </HStack>
  //     <HStack justifyContent={'space-between'} w={385} pt={1}>
  //       <GridItem
  //         item={loading ? props.list[2] : undefined}
  //         loading={loading}
  //       />
  //       <GridItem
  //         item={loading ? props.list[3] : undefined}
  //         loading={loading}
  //       />
  //     </HStack>
  //   </Center>
  // )
}
