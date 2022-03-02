import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageStyle,
  StyleSheet
} from 'react-native'
import React from 'react'
import { HistoryComicT, historySelector } from 'app/store/historySlice'
import { useAppSelector } from 'app/store/hooks'
import { navigate } from 'app/navigators'
import { resComicDetail_T } from 'app/types'
import ListItemWithExtractor from './ListItemWithExtractor'

type Props = {
  data: HistoryComicT[]
  addonFieldName?: string
  addonFieldExtractor?: (comic: HistoryComicT) => string
  onPress?: (comic: HistoryComicT) => any
}

const LibraryList = ({
  addonFieldExtractor,
  addonFieldName,
  data,
  onPress
}: Props) => {
  // const styles = useStyleSheet(themedStyle);

  const renderItem = React.useCallback(
    ListItemWithExtractor({
      addonFieldExtractor,
      addonFieldName,
      onPress
    }),
    [addonFieldExtractor, addonFieldName]
  )

  return (
    <FlatList
      style={{ flex: 1 }}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

export default LibraryList
