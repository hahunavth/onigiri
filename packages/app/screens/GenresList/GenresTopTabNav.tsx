import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps
} from "@react-navigation/material-top-tabs";
import ComicListByGenres from "./ComicListByGenres";
import { ComicListByGenresProps } from "./type";
import { useThemedTopTabScreenOption } from "../../components/Typo";

const { Navigator, Screen } =
  createMaterialTopTabNavigator<GenresTopTabNavParamList>();

type GenresTopTabNavParamList = {
  "genres-comic-list/action": ComicListByGenresProps;
  "genres-comic-list/adventure": ComicListByGenresProps;
  "genres-comic-list/chuyen-sinh": ComicListByGenresProps;
  "genres-comic-list/drama": ComicListByGenresProps;
  "genres-comic-list/ecchi": ComicListByGenresProps;
  "genres-comic-list/gender-blender": ComicListByGenresProps;
  "genres-comic-list/harem": ComicListByGenresProps;
  "genres-comic-list/historocal": ComicListByGenresProps;
  "genres-comic-list/josei": ComicListByGenresProps;
  "genres-comic-list/manga": ComicListByGenresProps;
  "genres-comic-list/manhwa": ComicListByGenresProps;
  "genres-comic-list/mystery": ComicListByGenresProps;
  "genres-comic-list/one-shot": ComicListByGenresProps;
  "genres-comic-list/romance": ComicListByGenresProps;
  "genres-comic-list/sci-fi": ComicListByGenresProps;
  "genres-comic-list/shoujo": ComicListByGenresProps;
  "genres-comic-list/slice-of-line": ComicListByGenresProps;
  "genres-comic-list/sport": ComicListByGenresProps;
  "genres-comic-list/webtoon": ComicListByGenresProps;
  "genres-comic-list/xuyen-khong": ComicListByGenresProps;
};

export type GTTScreenProps = MaterialTopTabScreenProps<
  GenresTopTabNavParamList,
  "genres-comic-list/action"
>;

type PropsListT = {
  [K in keyof GenresTopTabNavParamList]?: string | number;
};

const propsList: PropsListT = {
  "genres-comic-list/action": 1,
  "genres-comic-list/adventure": 3,
  "genres-comic-list/chuyen-sinh": 5,
  "genres-comic-list/drama": 11,
  "genres-comic-list/ecchi": 13,
  // 'genres-comic-list/gender-blender': 15,
  "genres-comic-list/harem": 16
};

type Props = {};

const GenresTopTabNav = (props: Props) => {
  const screenOptions = useThemedTopTabScreenOption();

  return (
    <Navigator
      backBehavior="none"
      screenOptions={{
        ...screenOptions,
        tabBarScrollEnabled: true,
        lazy: true
      }}
      // screenOptions={{
      //   // tabBarContentContainerStyle: {
      //   //   position: 'absolute',
      //   //   bottom: 0
      //   // },
      //   //
      //   tabBarScrollEnabled: true,
      //   tabBarBounces: true,
      //   tabBarLabelStyle: {},
      //   tabBarItemStyle: {
      //     margin: -5,
      //     justifyContent: 'center',
      //     alignItems: 'center'
      //   },
      //   tabBarPressOpacity: 0.1,
      //   tabBarIndicatorStyle: {
      //     backgroundColor: '#1285f0df',
      //     flex: 1,
      //     height: 38,
      //     borderWidth: 5,
      //     borderRadius: 12,
      //     borderColor: 'transparent'
      //   },
      //   tabBarActiveTintColor: 'white',
      //   tabBarAllowFontScaling: false,
      //   tabBarInactiveTintColor: 'gray',
      //   tabBarPressColor: 'transparent'
      // }}
      showPageIndicator
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
        );
      })}
    </Navigator>
  );
};

export default GenresTopTabNav;
