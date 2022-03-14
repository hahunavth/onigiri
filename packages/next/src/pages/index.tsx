import { ListHeader } from 'app/components/ListHeader/index.web'
import { Center, Text, View } from 'native-base'
import { FlatlistBanner } from 'app/components/Banner'
import { NavBar } from 'app/components/NavBar.web'
import { ComicGridGap3 } from 'app/components/ComicGridGap3/index'
import { useApiHot, useApiRecently, useApiTopWeek } from 'app/store/api'
import { Carousel } from '../components/Carousel'

export default function Page() {
  const { data } = useApiHot('1')
  const { data: data2 } = useApiTopWeek('1')
  const { data: data3 } = useApiRecently('1')

  return (
    <View flex={1} bg={'warmGray.100'}>
      <NavBar />
      <View
        w={['full', 'lg', '4/5', '3/4', '2/3']}
        // justifyContent={''}
        alignSelf={'center'}
        flexDirection={'column'}
        bg={'warmGray.50'}
        mt={800}
      >
        {/* <FlatlistBanner /> */}
        <View mt={4}>
          <ListHeader name={"What's New"} color="Blue" />
        </View>
        <Carousel list={data?.data || []} />
        <View mt={4}>
          <ListHeader name={"What's New"} color="Blue" />
        </View>
        <Center>
          <ComicGridGap3 list={data?.data || []} />
        </Center>
        <View mt={4}>
          <ListHeader name={'Want to read'} color="Blue" />
        </View>
        <Center>
          <Center>
            <ComicGridGap3 list={data2?.data || []} />
          </Center>
        </Center>
        <View mt={4}>
          <ListHeader name={'Top comment'} color="Blue" />
        </View>

        <Center>
          <ComicGridGap3 list={data3?.data || []} />
        </Center>
      </View>
    </View>
  )
}
