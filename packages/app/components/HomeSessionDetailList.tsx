import { View, Text } from 'native-base'
import React from 'react'
import {
  useApiInfinityHot,
  useApiInfinityRecently,
  useApiInfinityTopWeek
} from '../hooks/useApiInfinityItem'
import useInteraction from '../hooks/useInteraction'
import { useApiHot, useApiRecently, useApiTopWeek } from '../store/api'
import { ComicListVertical } from './ComicListVertical'

type Props = {}
// TODO: Infinity scroll
export const HomeSessionDetailListRecently = (props: Props) => {
  // const { data, isLoading } = useApiRecently('1')
  const { fetchNextPage, results } = useApiInfinityRecently()

  const { loading } = useInteraction()
  return (
    <>
      {loading ? null : (
        <ComicListVertical list={results} onEndReach={fetchNextPage} />
      )}
    </>
  )
}

export const HomeSessionDetailListHot = (props: Props) => {
  const { fetchNextPage, results } = useApiInfinityHot()
  const { loading } = useInteraction()
  return (
    <>
      {loading ? null : (
        <ComicListVertical list={results} onEndReach={fetchNextPage} />
      )}
    </>
  )
}

export const HomeSessionDetailListWeek = (props: Props) => {
  const { fetchNextPage, results } = useApiInfinityTopWeek()

  const { loading } = useInteraction()
  return (
    <>
      {loading ? null : (
        <ComicListVertical list={results} onEndReach={fetchNextPage} />
      )}
    </>
  )
}
type HomeSessionDetailList = {
  type: 'recently' | 'hot' | 'week'
}
const HomeSessionDetailList = ({ type }: HomeSessionDetailList) => {
  if (type === 'recently') return <HomeSessionDetailListRecently />
  if (type === 'hot') return <HomeSessionDetailListHot />
  return <HomeSessionDetailListWeek />
}
export default HomeSessionDetailList
