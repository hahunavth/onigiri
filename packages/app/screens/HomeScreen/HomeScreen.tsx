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
import FadeInView, { FadeInWrapper } from '../../components/FadeInView'
import useInteraction from '../../hooks/useInteraction'
import I18n from 'i18n-js'

export const HomeScreen = () => {
  const { loading } = useInteraction()
  console.log('rerender')
  return <>{!loading && <HomeScreenContent />}</>
  return <FadeInView>{!loading && <HomeScreenContent />}</FadeInView>
}

const HomeScreenContent = () => {
  const data = React.useMemo(() => {
    return [
      () => (
        <ListHeader
          name={I18n.t('home.recently.title')}
          subtitle={I18n.t('home.recently.subtitle')}
          onPressMore={() => {
            navigate('home-session-detail-list', { type: 'recently' })
          }}
        />
      ),
      () => <FlatlistBanner />,
      () => (
        <ListHeader
          name={I18n.t('home.categories.title')}
          subtitle={I18n.t('home.categories.subtitle')}
        />
      ),
      () => <Categories />,
      () => (
        <ListHeader
          name={I18n.t('home.hot.title')}
          subtitle={I18n.t('home.hot.subtitle')}
          color=""
          onPressMore={() => {
            navigate('home-session-detail-list', { type: 'hot' })
          }}
        />
      ),
      () => <ComicList1 />,
      () => (
        <ListHeader
          name={I18n.t('home.topWeek.title')}
          subtitle={I18n.t('home.topWeek.subtitle')}
          color=""
          onPressMore={() =>
            navigate('home-session-detail-list', { type: 'week' })
          }
        />
      ),
      () => <ComicList2 />,

      () => (
        <ListHeader
          name={I18n.t('home.history.title')}
          subtitle={I18n.t('home.history.subtitle')}
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
        // TODO: WEB SPECIFIC STYLE
        // @ts-ignore
        _web={{ marginLeft: 200 }}
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
