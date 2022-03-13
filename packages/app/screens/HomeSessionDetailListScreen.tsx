import HomeSessionDetailList from '../components/HomeSessionDetailList'
import React from 'react'
import { HomeSessionDetailListScreenProps } from '../navigators/StackNav'

export const HomeSessionDetailListScreen = (
  props: HomeSessionDetailListScreenProps
) => {
  const { type } = props.route.params
  return <HomeSessionDetailList type={type} />
}
