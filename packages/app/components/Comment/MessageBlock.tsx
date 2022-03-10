import { View, Text, FlatList, Box } from 'native-base'
import React from 'react'
import { ListRenderItemInfo } from 'react-native'
import { resCommentReplyT } from '../../types'
import { Message } from './Message'
import { MessageReply } from './MessageReply'

import { MessageBlockProps } from './types'

export const MessageBlock = (props: MessageBlockProps) => {
  const { message } = props

  const renderItem = React.useCallback(
    ({ index, item, separators }: ListRenderItemInfo<resCommentReplyT>) => {
      return <MessageReply message={item} />
    },
    []
  )

  return (
    <Box>
      <Message message={message} />
      <FlatList
        // flex={1}
        data={message.reply}
        renderItem={renderItem}
        keyExtractor={(item, id) => id.toString()}
      />
    </Box>
  )
}
