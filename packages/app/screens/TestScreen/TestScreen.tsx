import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  VStack,
  HStack
} from 'native-base'
import { ImageProps, Dimensions, InteractionManager } from 'react-native'
import React from 'react'
import { deleteAllImgs, getSingleImg } from 'app/utils/imgManager'
import { useApiComicDetail } from '../../store/api'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { historySelector } from '../../store/historySlice'

import { SelectableBadge } from '../../components/SelectableBadge'

// type Props = {}

// const comicPath =
//   '/truyen-tranh/monster-ga-afureru-sekai-ni-natta-node-suki-ni-ikitai-to-omoimasu-25132'
// const chpaterPath =
//   '/truyen-tranh/monster-ga-afureru-sekai-ni-natta-node-suki-ni-ikitai-to-omoimasu/chap-2/503986'

// export const TestScreen = (props: Props) => {
//   const [imgs, setImgs] = React.useState<{ uri: string; h: number }[]>([])

//   const { data } = useApiComicDetail(
//     '/truyen-tranh/monster-ga-afureru-sekai-ni-natta-node-suki-ni-ikitai-to-omoimasu-25132'
//   )
//   const dispatch = useAppDispatch()
//   const history = useAppSelector(historySelector)

//   React.useEffect(() => {
//     // console.log(data)
//     // if (data)
//     //   dispatch(
//     //     downloadComicThunk({
//     //       comic: data,
//     //       chapterPaths: [
//     //         '/truyen-tranh/monster-ga-afureru-sekai-ni-natta-node-suki-ni-ikitai-to-omoimasu/chap-2/503986'
//     //       ]
//     //     })
//     //   )
//     // deleteAllImgs()
//   }, [data])

//   React.useEffect(() => {
//     let isMounted = true
//     ;(async () => {
//       const fileUrls = await Promise.all(
//         history.downloadCpt[chpaterPath].images.map((url) => {
//           return getSingleImg(url, comicPath, chpaterPath)
//         })
//       )
//       // console.log(fileUrls)
//       if (isMounted) setImgs(fileUrls.map((uri) => ({ uri: uri, h: 0 })))
//     })()
//     return () => {
//       isMounted = false
//     }
//   }, [])

//   const renderItem = React.useCallback(({ item, index }) => {
//     return (
//       <ComicImage
//         source={{ uri: item.uri }}
//         h={item.h}
//         id={index}
//         setImgs={setImgs}
//         // w={'full'}
//         // flex={1}
//         // h={'600'}
//         // resizeMode={'contain'}
//         // alt="img"
//         // setImgs={setHList}
//       />
//     )
//   }, [])

//   return (
//     <View>
//       <Button>Download</Button>
//       <FlatList
//         // itemHeight={100}
//         data={imgs}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.uri}
//         initialNumToRender={4}
//         maxToRenderPerBatch={5}
//         removeClippedSubviews={true}
//         // minimumZoomScale={5}
//       />
//       {/* <ScrollView flex={1}>
//         {imgs.map((url) => (
//           <ComicImage
//             source={{ uri: url }}
//             // w={'full'}
//             // flex={1}
//             // h={'40'}
//             // resizeMode={'contain'}
//             // alt="img"
//           />
//         ))}
//       </ScrollView> */}
//       <Text>TestScreen 222</Text>
//     </View>
//   )
// }

// const w = Dimensions.get('window').width

// const ComicImage = React.memo(function (
//   props: ImageProps & {
//     setImgs?: React.Dispatch<React.SetStateAction<any[]>>
//     h?: number
//     id?: number
//   }
// ) {
//   React.useEffect(() => {
//     let isMounted = true
//     if (!props.h) {
//       // @ts-ignore
//       Image.getSize(props.source?.uri || '', (width, height) => {
//         const screenWidth = w
//         const scaleFactor = width / screenWidth
//         const imageHeight = height / scaleFactor

//         if (isMounted) {
//           // setSize({ width: screenWidth, height: imageHeight })
//           props.setImgs((arr) =>
//             arr.map((item, id) => {
//               if (id !== props.id) return item
//               return { ...item, h: imageHeight }
//             })
//           )
//         }
//         // console.log(props.id)
//       })
//     }
//     // console.log('r' + props.id)

//     return () => {
//       isMounted = false
//     }
//   }, [])

//   return (
//     <Image
//       {...props}
//       w={w}
//       h={props.h}
//       alt={'ComicImage'}
//       // resizeMethod={'resize'}
//     />
//   )
// })

export type SelectChapterListItem = {
  name: string | number
  status: 't' | 'f' | 'd'
}

export function TestScreen() {
  // const [selectChapterList, setSelectChapterList] = React.useState<
  //   SelectChapterListItem[]
  // >([
  //   { name: 'Adventure', status: 't' },
  //   { name: 'Action', status: 'f' },
  //   { name: 'Harem', status: 'f' },
  //   { name: 'Romance', status: 'd' },
  //   { name: 'Adventure2', status: 't' },
  //   { name: 'Action2', status: 'f' },
  //   { name: 'Harem2', status: 'f' },
  //   { name: 'Romance2', status: 'd' },
  //   { name: 'Adventure3', status: 't' },
  //   { name: 'Action3', status: 'f' },
  //   { name: 'Harem3', status: 'f' },
  //   { name: 'Romance3', status: 'd' },
  //   { name: 'Adventure4', status: 't' },
  //   { name: 'Action4', status: 'f' },
  //   { name: 'Harem4', status: 'f' },
  //   { name: 'Romance4', status: 'd' }
  // ])

  const [selectChapterList, setSelectChapterList] = React.useState<
    SelectChapterListItem[]
  >([])

  React.useEffect(() => {
    // InteractionManager.runAfterInteractions(() => {
    setSelectChapterList(
      Array(10000)
        .fill(1)
        .map((v, i) => ({ name: 'Adventure' + i, status: 't' }))
    )
    // })
  }, [])

  const [process, setProcess] = React.useState(-1)

  const onPress = React.useCallback((id: number) => setProcess(id), [])

  React.useEffect(() => {
    setImmediate(() => {
      const id = process
      if (process !== -1)
        setSelectChapterList(
          // () => {
          //   isSelect[id].isSelect = !isSelect[id].isSelect
          //   return isSelect
          // }
          (state) => {
            // console.log(id)
            return state.map((a, i) =>
              i === id && a.status !== 'd'
                ? { ...a, status: a.status === 't' ? 'f' : 't' }
                : a
            )
          }
        )
    })
  }, [process])

  return (
    <VStack flex={1} maxW={1000} bg={'$light.backgroundPrimary'}>
      <HStack
        px={3}
        mb={2}
        justifyContent={'space-between'}
        bg={'$light.backgroundPrimary'}
        _text={{ color: '$light.textBluePrimary' }}
      >
        <Text color={'$light.textBlueSecondary'}>
          All: {selectChapterList.length} chapters
        </Text>
        <Text color={'$light.textBlueSecondary'}>Sort</Text>
      </HStack>
      <FlatList
        data={selectChapterList}
        style={{
          flex: 1
        }}
        contentContainerStyle={
          {
            // flexWrap: 'wrap',
            // alignItems: 'baseline',
            // flex: 1
          }
        }
        columnWrapperStyle={{
          // flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}
        renderItem={({ item, index }) => {
          return (
            <SelectableBadge
              id={index}
              collapsable={true}
              onPress={onPress}
              name={item.name}
              variant={
                item.status === 'd'
                  ? 'solid'
                  : item.status === 't'
                  ? 'subtle'
                  : 'outline'
              }
            >
              Adventure
            </SelectableBadge>
          )
        }}
        numColumns={3}
        keyExtractor={(item) => item.name.toString()}
      />
    </VStack>
  )
}
