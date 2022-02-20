import { View, Text, FlatList } from 'native-base'
import React from 'react'
import { historySelector } from '../../store/historySlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ListItem } from './ListItem'

type Props = {}

export function ComicHorizontalList(props: Props) {
  const { comics, readComics } = useAppSelector(historySelector)
  const renderList = React.useMemo(() => {
    return readComics.map((path) => comics[path])
  }, [comics])

  return (
    <FlatList
      data={renderList}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => item.path}
      horizontal={true}
    />
  )
}
