import React from 'react'
import {
  MaterialTopTabBar,
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
  MaterialTopTabScreenProps
} from '@react-navigation/material-top-tabs'
import ComicListByGenres from './ComicListByGenres'
import { ComicListByGenresProps } from './type'

const { Navigator, Screen } =
  createMaterialTopTabNavigator<GenresTopTabNavParamList>()

type GenresTopTabNavParamList = {
  'genres-list/action': ComicListByGenresProps
  'genres-list/adventure': ComicListByGenresProps
  'genres-list/chuyen-sinh': ComicListByGenresProps
  'genres-list/drama': ComicListByGenresProps
  'genres-list/ecchi': ComicListByGenresProps
  'genres-list/gender-blender': ComicListByGenresProps
  'genres-list/harem': ComicListByGenresProps
  'genres-list/historocal': ComicListByGenresProps
  'genres-list/josei': ComicListByGenresProps
  'genres-list/manga': ComicListByGenresProps
  'genres-list/manhwa': ComicListByGenresProps
  'genres-list/mystery': ComicListByGenresProps
  'genres-list/one-shot': ComicListByGenresProps
  'genres-list/romance': ComicListByGenresProps
  'genres-list/sci-fi': ComicListByGenresProps
  'genres-list/shoujo': ComicListByGenresProps
  'genres-list/slice-of-line': ComicListByGenresProps
  'genres-list/sport': ComicListByGenresProps
  'genres-list/webtoon': ComicListByGenresProps
  'genres-list/xuyen-khong': ComicListByGenresProps
}

export type GTTScreenProps = MaterialTopTabScreenProps<
  GenresTopTabNavParamList,
  'genres-list/action'
>

type PropsListT = {
  [K in keyof GenresTopTabNavParamList]?: string | number
}

const propsList: PropsListT = {
  'genres-list/action': 1,
  'genres-list/adventure': 3,
  'genres-list/chuyen-sinh': 5,
  'genres-list/drama': 11,
  'genres-list/ecchi': 13,
  'genres-list/gender-blender': 15,
  'genres-list/harem': 16
}

type Props = {}

const GenresTopTabNav = (props: Props) => {
  return (
    <Navigator
      backBehavior="none"
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarBounces: true,
        tabBarLabelStyle: {},
        tabBarItemStyle: {
          margin: -5,
          justifyContent: 'center',
          alignItems: 'center'
        },

        tabBarPressOpacity: 0.1,
        tabBarIndicatorStyle: {
          backgroundColor: '#1285f0df',
          flex: 1,
          height: 38,
          borderWidth: 5,
          borderRadius: 12,
          borderColor: 'transparent'
        },
        tabBarActiveTintColor: 'white',
        tabBarAllowFontScaling: false,
        tabBarInactiveTintColor: 'gray',
        tabBarPressColor: 'transparent'
      }}
      // showPageIndicator
      offscreenPageLimit={2}
      overdrag={true}
    >
      {Object.keys(propsList).map((key) => {
        return (
          <Screen
            key={key}
            name={key as keyof GenresTopTabNavParamList}
            component={ComicListByGenres}
            options={{}}
            initialParams={{
              genres: propsList[key as keyof GenresTopTabNavParamList]
            }}
          ></Screen>
        )
      })}
    </Navigator>
  )
}

export default GenresTopTabNav
