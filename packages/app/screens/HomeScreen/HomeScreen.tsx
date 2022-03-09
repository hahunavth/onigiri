import { View, Text, ScrollView } from 'native-base'
import React from 'react'
import { NextLink } from 'app/components/NextLink'
import { ListHeader } from 'app/components/ListHeader'
import { FlatlistBanner } from 'app/components/Banner'
import { ComicGridGap3 } from '../../components/ComicGridGap3'
import { useApiHot, useApiTopMonth, useApiTopWeek } from '../../store/api'
import { ComicGridGap2 } from '../../components/ComicGridGap2'
import { ComicHorizontalList } from 'app/components/ComicHorizontalList'
import { navigate } from '../../navigators'
import Categories from '../../components/Categories'

export const HomeScreen = () => {
  return (
    <ScrollView
      bg={'$light.backgroundSecondary'}
      _dark={{
        bg: '$dark.backgroundSecondary'
      }}
    >
      {/* <Text>HomeScreen</Text> */}
      <ListHeader
        name="New Release!"
        subtitle="Read the lasted comic recommendations!"
        onPressMore={() => {
          navigate('home-session-detail-list', { type: 'recently' })
        }}
      />
      <FlatlistBanner />

      <ListHeader name="Categories" subtitle="Find more here!" />
      <Categories />
      <ListHeader
        name="Hot"
        subtitle="New comic release!"
        color=""
        onPressMore={() => {
          navigate('home-session-detail-list', { type: 'hot' })
        }}
      />
      <ComicList1 />
      <ListHeader
        name="Top week"
        subtitle="New comic release!"
        color=""
        onPressMore={() =>
          navigate('home-session-detail-list', { type: 'week' })
        }
      />
      <ComicList2 />
      <ListHeader
        name="History"
        subtitle="New comic release!"
        color=""
        onPressMore={() => {
          // FIXME: Lint here
          navigate('main/library')
        }}
      />
      <ComicHorizontalList />
    </ScrollView>
  )
}

function ComicList1() {
  const list = useApiHot('1')
  return <ComicGridGap3 list={list.data?.data || []} />
}

function ComicList2() {
  const list = useApiTopWeek('1')
  return <ComicGridGap2 list={list.data?.data || []} />
}
