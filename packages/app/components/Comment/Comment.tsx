import { View, Text } from 'react-native'
import React from 'react'
import { ListRenderItemInfo } from 'react-native'
import type { CommentProps } from './types'
import { Message } from './Message'
import { MessageBlock } from './MessageBlock'
import { FlatList, ScrollView } from 'native-base'
import { resCommentT } from '../../types'
import { MessageInput } from './MessageInput'

export const Comment = ({ data }: CommentProps) => {
  const renderItem = React.useCallback(
    ({ index, item, separators }: ListRenderItemInfo<resCommentT>) => {
      return <MessageBlock message={item} />
    },
    []
  )

  return (
    <>
      {/* {data?.data && data?.data[0] && <MessageBlock message={data?.data[0]} />} */}
      {/* <MessageInput /> */}
      <FlatList data={data.data} renderItem={renderItem} />
    </>
  )
}
