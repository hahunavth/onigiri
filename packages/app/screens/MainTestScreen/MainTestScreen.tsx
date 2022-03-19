// import { Button, FlatList, Input, Text, View } from 'native-base'
// import React from 'react'
// import {
//   TouchableNativeFeedback,
//   ListRenderItemInfo,
//   TextInput
// } from 'react-native'
// import { ComicListVertical } from '../../components/ComicListVertical'
// import { useApiInfinityRecently } from '../../hooks/useApiInfinityItem'
// import { useApiLazyRecently, useApiRecently } from '../../store/api'
// import { useAppDispatch, useAppSelector } from '../../store/hooks'
// import {
//   fetchNewChapterNotificationThunk,
//   notificationSelector
// } from '../../store/notificationSlice'
// import { resComicItem_T } from '../../types'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { fetchBackgroundTask } from '../../utils/backgroundFetchServices'

// export function MainTestScreen() {
//   // const { fetchNextPage, results } = useApiInfinityRecently()
//   // const dispatch = useAppDispatch()
//   // React.useEffect(() => {
//   //   dispatch(fetchNewChapterNotificationAsync())
//   // }, [])
//   // return <MemoComicListVertical list={results} onEndReach={fetchNextPage} />
//   const { count, mergeCount } = useAppSelector(notificationSelector)
//   const [str, setStr] = React.useState('')
//   const [text, setText] = React.useState('')
//   const inputRef = React.useRef<TextInput>()

//   React.useEffect(() => {
//     AsyncStorage.getItem('background-fetch-last-number').then((s) =>
//       s ? setStr(s) : null
//     )
//     fetchBackgroundTask()
//   }, [])

//   AsyncStorage.getAllKeys().then((a) => console.log(a))
//   AsyncStorage.getItem('notifications-template').then((a) => {
//     console.log('result')
//     console.log(a ? JSON.parse(a) : 'cant parse')
//   })

//   return (
//     <View>
//       <Text>Count: {count}</Text>
//       <Text>async storage background-fetch-last-number: {str}</Text>
//       <Text>mergeCount: {mergeCount}</Text>
//       <Input value={text} onChangeText={(e) => setText(e)}></Input>
//       <Button
//         onPress={() =>
//           AsyncStorage.getItem(text).then((s) => (s ? setStr(s) : null))
//         }
//       >
//         RefreshInfo
//       </Button>
//     </View>
//   )
// }

// // const MemoComicListVertical = React.memo(ComicListVertical)

import { Center, View, VStack } from 'native-base'
import React from 'react'
import { TextTest, TextXsS } from '../../components/Typo'
import i18n from 'i18n-js'

export function MainTestScreen() {
  console.log(i18n.currentLocale())
  return (
    <Center flex={1}>
      <TextTest>{i18n.t('welcome')}</TextTest>
    </Center>
  )
}
