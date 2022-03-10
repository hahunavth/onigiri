import { View, Text } from 'react-native'
import React from 'react'
import { ListRenderItemInfo } from 'react-native'
import type { CommentProps } from './types'
import { Message } from './Message'
import { MessageBlock } from './MessageBlock'
import { FlatList, ScrollView } from 'native-base'
import { resCommentT } from '../../types'
import { MessageInput } from './MessageInput'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'

export const CommentFL = ({ data }: CommentProps) => {
  const renderItem = React.useCallback(
    ({ index, item, separators }: ListRenderItemInfo<resCommentT>) => {
      return <MessageBlock message={item} />
    },
    []
  )

  return (
    <>
      <BottomSheetFlatList data={data.data} renderItem={renderItem} />
    </>
  )
}
