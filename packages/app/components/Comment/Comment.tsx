import { View, Text, Button } from 'native-base'
import React from 'react'
import { ListRenderItemInfo, TouchableOpacity, UIManager } from 'react-native'
import type { CommentProps } from './types'
import { Message } from './Message'
import { MessageBlock } from './MessageBlock'
import { FlatList, ScrollView } from 'native-base'
import { resCommentT } from '../../types'
import { MessageInput } from './MessageInput'
import useInteraction from '../../hooks/useInteraction'

export const Comment = ({ data }: CommentProps) => {
  /**
   * View more!
   */
  const { data: list, pagination, success } = data
  const length = list?.length || 0
  const [renderedList, setRenderedList] = React.useState<typeof list>(
    list || []
  )
  const [collapse, setCollapse] = React.useState(false)
  const [waiting, setWaiting] = React.useState(false)
  const { loading } = useInteraction({
    callback: () => {
      if (length > 2) {
        setRenderedList(list?.slice(0, 2))
        setCollapse(true)
      }
    },
    dependencyList: []
  })

  React.useEffect(() => {
    if (waiting) {
      setImmediate(() => {
        if (!collapse) setRenderedList(data.data)
        else setRenderedList(data.data?.slice(0, 2))
        setWaiting(false)
      })
    }
  }, [waiting])

  const renderItem = React.useCallback(
    ({ index, item, separators }: ListRenderItemInfo<resCommentT>) => {
      return <MessageBlock message={item} />
    },
    []
  )

  if (loading) return null

  return (
    <>
      {/* {data?.data && data?.data[0] && <MessageBlock message={data?.data[0]} />} */}
      {/* <MessageInput /> */}
      <FlatList data={renderedList} renderItem={renderItem} />
      <Button
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 12
        }}
        isLoading={waiting}
        colorScheme={'pink'}
        variant={'subtle'}
        onPress={() => {
          if (!waiting) {
            setWaiting(true)
            if (collapse) {
              setCollapse(false)
            } else {
              setCollapse(true)
            }
          }
        }}
      >
        {collapse ? 'More' : 'Collapse'}
      </Button>
    </>
  )
}
