import { View, Text, ScrollView, FlatList } from 'native-base'
import { VirtualizedList, ListRenderItemInfo } from 'react-native'
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
import { Carousel } from '../../../next/src/components/Carousel'

export const HomeScreen = () => {
  const data = React.useMemo(() => {
    return [
      () => (
        <ListHeader
          name="New Release!"
          subtitle="Read the lasted comic recommendations!"
          onPressMore={() => {
            navigate('home-session-detail-list', { type: 'recently' })
          }}
        />
      ),
      () => <FlatlistBanner />,
      () => <ListHeader name="Categories" subtitle="Find more here!" />,
      () => <Categories />,
      () => (
        <ListHeader
          name="Hot"
          subtitle="New comic release!"
          color=""
          onPressMore={() => {
            navigate('home-session-detail-list', { type: 'hot' })
          }}
        />
      ),
      () => <ComicList1 />,
      () => (
        <ListHeader
          name="Top week"
          subtitle="New comic release!"
          color=""
          onPressMore={() =>
            navigate('home-session-detail-list', { type: 'week' })
          }
        />
      ),
      () => <ComicList2 />,

      () => (
        <ListHeader
          name="History"
          subtitle="New comic release!"
          color=""
          onPressMore={() => {
            navigate('main', {
              screen: 'main/library'
            })
          }}
        />
      ),
      () => <ComicHorizontalList />
    ]
  }, [])

  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<() => React.ReactElement>) => {
      const Element = item
      return <Element />
    },
    []
  )

  const keyExtractor = React.useCallback((item, id) => {
    return id.toString()
  }, [])

  return (
    <>
      <FlatList
        bg={'warmGray.100'}
        // @ts-ignore
        _dark={{
          backgroundColor: '$dark.backgroundPrimary'
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      ></FlatList>
    </>
  )
}

function ComicList1() {
  const list = useApiHot('1')
  return <ComicGridGap3 list={list.data?.data || []} />
}

function ComicList2() {
  const list = useApiTopWeek('1')
  return (
    <>
      <ComicGridGap2 list={list.data?.data || []} />
      {/* <Carousel list={list.data?.data || []} /> */}
    </>
  )
}
