import { View, Text, FlatList } from 'native-base'
import React from 'react'
import { historySelector } from '../../store/historySlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { resComicItem_T } from '../../types'
import { ListItem } from './ListItem'
import { Carousel } from '../../../next/src/components/Carousel/index'

type Props = {}

export function ComicHorizontalList(props: Props) {
  const { comics, readComics } = useAppSelector(historySelector)
  const renderList = React.useMemo(() => {
    return readComics.map((path) => comics[path])
  }, [comics])

  return (
    <>
      <FlatList
        data={renderList as resComicItem_T[]}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item?.path + ''}
        horizontal={true}
      />
    </>
  )
}
