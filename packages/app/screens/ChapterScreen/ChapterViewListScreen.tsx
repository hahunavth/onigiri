import React from 'react'
import {
  ListRenderItemInfo,
  FlatList,
  TouchableNativeFeedback
} from 'react-native'
import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack
} from 'native-base'
import { ScaledImage } from '../../components/ScaledImage'
import { AntDesign } from '@expo/vector-icons'
import ChapterFooterBtn from '../../components/ChapterFooterBtn'
import PinchWrapper from '../../components/PinchWrapper'
import { ChapterContext } from './ChapterContext'
import { useAppSelector } from '../../store/hooks'
import { homeSelector } from '../../store/homeSlice'

type ChapterViewListScreenProps = {
  setImgs: React.Dispatch<React.SetStateAction<{ uri: string; h: number }[]>>
  imgs: { uri: string; h: number }[]
  handleScroll?: (e: any) => void
  // Toggle BottomSheet
  onEndReach?: (e: any) => void
}
const ChapterViewListScreen = React.forwardRef<
  FlatList,
  ChapterViewListScreenProps
>((props, ref) => {
  console.log(props.imgs)
  const { setImgs, handleScroll, imgs } = props

  const { ctxId, changeChapter } = React.useContext(ChapterContext)
  const { currentComic } = useAppSelector(homeSelector)

  const renderItem = React.useCallback(
    ({ item, index }: ListRenderItemInfo<{ uri: string; h: number }>) => {
      console.log(
        'https://hahunavth-express-api.herokuapp.com/api/v1/cors/' + item.uri
      )
      return (
        <ScaledImage
          source={{
            uri:
              'https://hahunavth-express-api.herokuapp.com/api/v1/cors/' +
              item.uri
          }}
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
    <PinchWrapper>
      <FlatList
        ref={ref}
        data={imgs || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={handleScroll}
        initialNumToRender={4}
        maxToRenderPerBatch={5}
        removeClippedSubviews={true}
        // FIXME: SCROLL OVER FOOTER -> OPEN
        onEndReachedThreshold={1.1}
        onEndReached={(e) => props.onEndReach && props.onEndReach(e)}
        nestedScrollEnabled
        ListFooterComponent={() => {
          return (
            <ScrollView my={24}>
              <Center>
                <Text fontSize={24}>END</Text>
                <Text>Chapter 0</Text>
              </Center>
              <Divider my={12} />
              <ChapterFooterBtn
                onPress={() => {
                  const length = currentComic?.chapters.length || -1
                  const list = currentComic?.chapters || []
                  const id = ctxId || -1
                  console.log(length, id)
                  if (
                    id < length - 1 &&
                    id > 0 &&
                    list[id + 1] &&
                    changeChapter
                  ) {
                    changeChapter({
                      ctxId: id + 1,
                      ctxName: list[id + 1].name,
                      ctxPath: list[id + 1].path
                    })
                  }
                }}
              />
              <ChapterFooterBtn
                type="next"
                onPress={() => {
                  const length = currentComic?.chapters.length || -1
                  const list = currentComic?.chapters || []
                  const id = ctxId || -1
                  console.log(length, id)
                  if (id < length && id >= 0 && list[id - 1] && changeChapter) {
                    changeChapter({
                      ctxId: id - 1,
                      ctxName: list[id - 1].name,
                      ctxPath: list[id - 1].path
                    })
                  }
                }}
              />
              <Divider my={12} />
              <Center>
                <Text fontSize={24}>COMMENT</Text>
                <Text>Open comment BottomSheet</Text>
              </Center>
            </ScrollView>
          )
        }}
      />
    </PinchWrapper>
  )
})

export default React.memo(ChapterViewListScreen)
