import {
  View,
  Text,
  ListRenderItemInfo,
  InteractionManager
} from 'react-native'
import React from 'react'
import { resComicItem_T } from '../../types'
import { FlatList } from 'native-base'
import { ComicListItem } from './ComicListItem'
import { Loading } from '../Loading'
import { ListFooter } from './ListFooter'

type Props = {
  list: resComicItem_T[]
}

export const ComicListVertical = ({ list }: Props) => {
  /**
   * STUB: Wrap item component of flatlist inside function
   * So item component be able to call hook
   *
   * TODO: Convert all flatlist to this.
   */
  const renderItem = React.useCallback(
    (props: ListRenderItemInfo<resComicItem_T>) => {
      if (props.index === 1 || props.index === 5) return <Text>Sticky</Text>
      return <ComicListItem {...props} />
    },
    []
  )

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      console.log('object')
      setLoading(false)
    })
    return () => {
      interaction.cancel()
    }
  })

  return loading ? (
    <Loading animation={true} />
  ) : (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.path}
        // NOTE: FLATLIST CAUSE SLOW NAVIGATION
        // SOLUTION1: decrease initialNumToRender
        // SOLUTION2: use Interaction manager
        // TODO: USE SOLUTION2
        initialNumToRender={30}
        maxToRenderPerBatch={6}
        contentContainerStyle={{ flexGrow: 1 }}
        ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
        // ListFooterComponent={<ListFooter />}
        stickyHeaderIndices={[1, 5]}
        // invertStickyHeaders
      />
      <ListFooter />
    </View>
  )
}
