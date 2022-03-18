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
export const HomeSessionDetailListRecently = (props: Props) => {
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
  const { fetchNextPage, results, maxPage } = useApiInfinityHot()

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

/**
 *
 */
export type HomeSessionDetailList = {
  type: 'recently' | 'hot' | 'week'
}
const HomeSessionDetailList = ({ type }: HomeSessionDetailList) => {
  if (type === 'recently') return <HomeSessionDetailListRecently />
  if (type === 'hot') return <HomeSessionDetailListHot />
  return <HomeSessionDetailListWeek />
}

export default HomeSessionDetailList
