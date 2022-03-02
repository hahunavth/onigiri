import { View, FlatList, ScrollView, Button } from 'native-base'
import { Text } from 'react-native'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ComicDetailScreen } from 'app/screens'
import MemoCollapseHeader from 'app/components/CollapseHeader/CollapseHeader'
import { useApiComicDetail } from 'app/store/api'
import { NextLink } from 'app/components/NextLink'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

function ComicDetail() {
  const router = useRouter()
  const { id, path } = router.query

  const { data } = useApiComicDetail((path || '') as string)
  const offset = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(offset.value)
    }
  })

  setTimeout(() => {
    offset.value = 1
  }, 2000)

  // console.log(router.query)

  return <MemoCollapseHeader comic={data} />
  return (
    <View>
      <Animated.View
        style={[
          {
            backgroundColor: 'red',
            width: 100,
            height: 100
          },
          animatedStyle
        ]}
      ></Animated.View>
      <NextLink routeName="/">Home</NextLink>
      {data?.path ? (
        <Image src={data?.posterUrl || ''} width={100} height={100} />
      ) : null}
      <Text>{data?.title}</Text>
      <Text>{data?.rate}</Text>
      <Text>{data?.author}</Text>
      <Text>{data?.detail}</Text>
      <Text>{data?.follows}</Text>
      <Text>{data?.info}</Text>
      <Text>{data?.status}</Text>
      <ScrollView>
        {data?.kind.map((kind) => (
          <Button>{kind}</Button>
        ))}
      </ScrollView>
      <FlatList
        data={data?.chapters || []}
        renderItem={({ item, index, separators }) => {
          return <Text>{item.name}</Text>
        }}
      />
    </View>
  )
}

export default ComicDetail
