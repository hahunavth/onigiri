import {View, Text} from 'native-base'
import { useRouter } from 'next/router'

 function ComicDetail () {
  const router = useRouter();

  console.log(router.query)

  return <View>
    <Text>Comic detail</Text>
  </View>
}

export default ComicDetail
