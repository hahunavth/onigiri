import { FlatList, Text, View } from 'native-base'
import React from 'react'
import { TouchableNativeFeedback, ListRenderItemInfo } from 'react-native'
import { ComicListVertical } from '../../components/ComicListVertical'
import { useApiInfinityRecently } from '../../hooks/useApiInfinityItem'
import { useApiLazyRecently, useApiRecently } from '../../store/api'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  fetchNewChapterNotificationAsync,
  notificationSelector
} from '../../store/notificationSlice'
import { resComicItem_T } from '../../types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function MainTestScreen() {
  // const { fetchNextPage, results } = useApiInfinityRecently()
  // const dispatch = useAppDispatch()
  // React.useEffect(() => {
  //   dispatch(fetchNewChapterNotificationAsync())
  // }, [])
  // return <MemoComicListVertical list={results} onEndReach={fetchNextPage} />
  const { count } = useAppSelector(notificationSelector)
  const [str, setStr] = React.useState('')

  React.useEffect(() => {
    AsyncStorage.getItem('background-fetch-last-number').then((s) =>
      s ? setStr(s) : null
    )
  })

  return (
    <View>
      <Text>Count: {count}</Text>
      <Text>Count: {str}</Text>
    </View>
  )
}

// const MemoComicListVertical = React.memo(ComicListVertical)
