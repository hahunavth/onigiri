import { View, Text, FlatList } from 'native-base'
import React from 'react'

import { HistoryComicT, historySelector } from 'app/store/historySlice'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { NextLink } from '../../components/NextLink'
import LibraryList from './LibraryList'
import { navigate } from '../../navigators'
import { LibraryContext } from './LibraryContext'

interface Props {}

export const DownloadTab = (props: Props) => {
  const dispatch = useAppDispatch()
  const { comics, downloadComics, downloadCpt } =
    useAppSelector(historySelector)

  const { showModal } = React.useContext(LibraryContext)

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>{downloadComics.length}</Text>
      <FlatList
        data={downloadComics.map((str) => comics[str])}
        renderItem={({ item, index, separators }) => {
          return (
            <NextLink
              routeName="offline-comic-screen"
              params={{ path: item.path }}
            >
              <Text>{item.title}</Text>
            </NextLink>
          )
        }}
        keyExtractor={(item) => item.title}
      /> */}

      <LibraryList
        data={
          (downloadComics?.map((str) => comics[str]) as HistoryComicT[]) || []
        }
        addonFieldName={'Downloaded:'}
        addonFieldExtractor={(comic) =>
          comic.chapters
            .map((cpt) => downloadCpt[cpt.path])
            .filter((p) => p)
            .length.toString()
        }
        onPress={(comic) =>
          navigate('offline-comic-screen', {
            path: comic.path || ''
          })
        }
        onLongPress={(comic) => {
          showModal &&
            showModal(true, comic.path, () => (path) => {
              console.log('test remove downloaded chapter ' + path)
            })
        }}
      />
    </View>
  )
}
