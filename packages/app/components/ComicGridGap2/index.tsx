import { Center, HStack } from 'native-base'
import React from 'react'
import { GridItem } from './GridItem'
import { resComicItem_T } from '../../types'

export const ComicGridGap2 = (props: { list: resComicItem_T[] }) => {
  const loading = props.list && props.list.length > 6
  return (
    <Center>
      <HStack justifyContent={'space-between'} w={385}>
        <GridItem
          item={loading ? props.list[0] : undefined}
          loading={loading}
        />
        <GridItem
          item={loading ? props.list[1] : undefined}
          loading={loading}
        />
      </HStack>
      <HStack justifyContent={'space-between'} w={385} pt={1}>
        <GridItem
          item={loading ? props.list[2] : undefined}
          loading={loading}
        />
        <GridItem
          item={loading ? props.list[3] : undefined}
          loading={loading}
        />
      </HStack>
    </Center>
  )
}
