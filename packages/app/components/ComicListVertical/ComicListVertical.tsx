import React from 'react'
import { View, ListRenderItemInfo, InteractionManager } from 'react-native'
import { FlatList } from 'native-base'
import { ComicListItem } from './ComicListItem'
import { Loading } from '../Loading'
import { ListFooter } from './ListFooter'

import type { resComicItem_T } from '../../types'
import useInteraction from '../../hooks/useInteraction'
import { navigate } from '../../navigators'

type Props = {
  list: resComicItem_T[]
  onEndReach?: () => any
  listFooterComponent?: React.ReactElement
}

export const ComicListVertical = ({
  list,
  onEndReach,
  listFooterComponent
}: Props) => {
  /**
   * STUB: Wrap item component of flatlist inside function
   * So item component be able to call hook
   *
   * TODO: Convert all flatlist to this.
   */
  console.log('re codev')
  const renderItem = React.useCallback(
    (props: ListRenderItemInfo<resComicItem_T>) => {
      // if (props.index === 1 || props.index === 5) return <Text>Sticky</Text>
      return <ComicListItem item={props.item} />
    },
    []
  )

  const keyExtractor = React.useCallback(
    // FIXME: Find why have same key
    // (item, index) => item.path + index.toString(),
    (item, index) => index.toString(),

    []
  )

  const { loading } = useInteraction()

  return loading ? (
    <Loading animation={true} />
  ) : (
    <View style={{ flex: 1 }}>
      {/* <SectionList
        sections={[{ data: list }]}
        style={{ flex: 1 }}
        // data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.path}
        initialNumToRender={30}
        maxToRenderPerBatch={6}
        contentContainerStyle={{ flexGrow: 1 }}
        stickySectionHeadersEnabled={true}
        // ListFooterComponent={<ListFooter />}
        stickyHeaderIndices={[1, 5]}
        ItemSeparatorComponent={() => <Text>Sperate</Text>}
      /> */}
      {/* <VirtualizedList
        style={{ flex: 1 }}
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.path}
        initialNumToRender={30}
        maxToRenderPerBatch={6}
        contentContainerStyle={{ flexGrow: 1 }}
        // ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
        // ListFooterComponent={<ListFooter />}
        stickyHeaderIndices={[1, 5]}
        getItemCount={() => 36}
        getItem={(data) => data}
        // invertStickyHeaders
      /> */}
      <FlatList
        style={{ flex: 1 }}
        data={list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReach}
        // NOTE: FLATLIST CAUSE SLOW NAVIGATION
        // SOLUTION1: decrease initialNumToRender
        // SOLUTION2: use Interaction manager
        // TODO: USE SOLUTION2
        initialNumToRender={30}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={100}
        // alwaysBounceHorizontal
        // removeClippedSubviews
        // directionalLockEnabled
        // disableVirtualization

        // removeClippedSubviews
        // FIXME: Sticky list too slow
        // stickyHeaderIndices={[1, 5]}
        // invertStickyHeaders
        // NOTE: Deprecated
        // contentContainerStyle={{ flexGrow: 1 }}
        // ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
        // ListFooterComponent={<ListFooter />}
        alwaysBounceHorizontal={true}
        ListFooterComponent={listFooterComponent}
      />
    </View>
  )
}
