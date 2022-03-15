import { FlatList, Text, View } from 'native-base'
import React from 'react'
import { TouchableNativeFeedback, ListRenderItemInfo } from 'react-native'
import { ComicListVertical } from '../../components/ComicListVertical'
import { useApiInfinityRecently } from '../../hooks/useApiInfinityItem'
import { useApiLazyRecently, useApiRecently } from '../../store/api'
import { resComicItem_T } from '../../types'

export function MainTestScreen() {
  const { fetchNextPage, results } = useApiInfinityRecently()

  return <MemoComicListVertical list={results} onEndReach={fetchNextPage} />
}

const MemoComicListVertical = React.memo(ComicListVertical)
