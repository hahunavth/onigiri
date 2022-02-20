import { View, Text, ScrollView } from 'native-base'
import React from 'react'
import { NextLink } from 'app/components/NextLink'
import { ListHeader } from 'app/components/ListHeader'
import { FlatlistBanner } from 'app/components/Banner'
import { ComicGridGap3 } from '../../components/ComicGridGap3'
import { useApiHot, useApiTopMonth } from '../../store/api'
import { ComicGridGap2 } from '../../components/ComicGridGap2'
import { ComicHorizontalList } from 'app/components/ComicHorizontalList'
export const HomeScreen = () => {
  return (
    <ScrollView>
      {/* <Text>HomeScreen</Text> */}
      <ListHeader name="Recently" subtitle="New comic release!" />
      <FlatlistBanner />
      <ListHeader name="Hot" subtitle="New comic release!" color="Blue" />
      <ComicList1 />
      <ListHeader
        name="Top month"
        subtitle="New comic release!"
        color="Green"
      />
      <ComicList2 />
      <ListHeader name="History" subtitle="New comic release!" color="Yellow" />
      <ComicHorizontalList />
      <NextLink routeName="test">link</NextLink>
    </ScrollView>
  )
}

function ComicList1() {
  const list = useApiHot('1')
  return <ComicGridGap3 list={list.data?.data || []} />
}

function ComicList2() {
  const list = useApiTopMonth('1')
  return <ComicGridGap2 list={list.data?.data || []} />
}
