import { View, Text } from 'native-base'
import React from 'react'
import useInteraction from '../hooks/useInteraction'
import { useApiHot, useApiRecently, useApiTopWeek } from '../store/api'
import { ComicListVertical } from './ComicListVertical'

type Props = {}
// TODO: Infinity scroll
export const HomeSessionDetailListRecently = (props: Props) => {
  const { data, isLoading } = useApiRecently('1')
  const { loading } = useInteraction()
  return (
    <>
      {isLoading || loading ? null : (
        <ComicListVertical list={data?.data || []} />
      )}
    </>
  )
}

export const HomeSessionDetailListHot = (props: Props) => {
  const { data, isLoading } = useApiHot('1')
  const { loading } = useInteraction()
  return (
    <>
      {isLoading || loading ? null : (
        <ComicListVertical list={data?.data || []} />
      )}
    </>
  )
}

export const HomeSessionDetailListWeek = (props: Props) => {
  const { data, isLoading } = useApiTopWeek('1')
  const { loading } = useInteraction()
  return (
    <>
      {isLoading || loading ? null : (
        <ComicListVertical list={data?.data || []} />
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
