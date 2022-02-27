import React from "react"
import { ListRenderItemInfo, FlatList } from 'react-native'
import { ScaledImage } from "../../components/ScaledImage"

type ChapterViewListScreenProps = {
  setImgs: React.Dispatch<React.SetStateAction<{ uri: string; h: number }[]>>
  imgs: { uri: string; h: number }[]
  handleScroll: (e: any) => void
}
function ChapterViewListScreen(props: ChapterViewListScreenProps) {
  const { setImgs, handleScroll, imgs} = props;

  const renderItem = React.useCallback(
    ({ item, index }: ListRenderItemInfo<{ uri: string; h: number }>) => {
      return (
        <ScaledImage
          source={
            {
              uri: 'https://hahunavth-express-api.herokuapp.com/api/v1/cors/' +
                item.uri
            }
          }
          id={index}
          h={item.h}
          setImgs={setImgs}
        />
      )
    },
    []
  )
  const keyExtractor = React.useCallback((item, id) => item.uri, [])

  return (
    <FlatList
      data={imgs || []}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onScroll={handleScroll}
      initialNumToRender={4}
      maxToRenderPerBatch={5}
      removeClippedSubviews={true}
    />
  )
}

export default React.memo(ChapterViewListScreen)
