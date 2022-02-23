import { View, Text } from 'native-base'
import { FindResultScreenProps } from '../../navigators/StackNav'
import { API_URL } from '../../types'
import axios from 'axios'
import { useApiFindComic } from '../../store/api'
import { ComicListVertical } from '../../components/ComicListVertical/ComicListVertical'

export const FindResultScreen = (props: FindResultScreenProps) => {
  const { findOption, path } = props.route.params

  // const result = axios
  //   .get(
  //     `http://www.nettruyengo.com${path}`
  //     // {
  //     //   headers: { referer: 'http://www.nettruyenpro.com' }
  //     // }
  //   )
  //   // .then((res) => res.json())
  //   .then((data) => console.log(data.data))
  // console.log(`http://www.nettruyenpro.com${path}`)

  const { isSuccess, isLoading, data } = useApiFindComic(findOption)

  console.log(data?.data.length)
  return (
    <View flex={1}>
      {/* <Text>{path}</Text> */}
      <ComicListVertical list={data?.data || []} />
    </View>
  )
}
