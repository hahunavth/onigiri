import { View, Text } from 'react-native'
import React from 'react'
import { resComicItem_T } from '../../types'
import { FlatList } from 'native-base'
import { ComicListItem } from './ComicListItem'

type Props = {
  list: resComicItem_T[]
}

export const ComicListVertical = ({ list }: Props) => {
  return (
    <FlatList
      style={{ flex: 1 }}
      data={list}
      renderItem={ComicListItem}
      keyExtractor={(item) => item.path}
    />
  )
}
