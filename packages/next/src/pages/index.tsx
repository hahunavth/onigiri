import { ListHeader } from 'app/components/ListHeader/index.web'
import { Center, Text, View } from 'native-base'
import { FlatlistBanner } from 'app/components/Banner'
import { NavBar } from 'app/components/NavBar.web'
import { ComicGridGap3 } from 'app/components/ComicGridGap3/index'
import { useApiHot } from 'app/store/api'

export default function Page() {
  const { data } = useApiHot('1')

  return (
    <View flex={1} bg={'warmGray.100'}>
      <NavBar />
      <View
        w={['full', 'lg', '4/5', '3/4', '2/3']}
        // justifyContent={''}
        alignSelf={'center'}
        flexDirection={'column'}
        bg={'warmGray.50'}
      >
        <FlatlistBanner />
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
            <ComicGridGap3 list={data?.data || []} />
          </Center>
        </Center>
        <View mt={4}>
          <ListHeader name={'Top comment'} color="Blue" />
        </View>

        <Center>
          <ComicGridGap3 list={data?.data || []} />
        </Center>
      </View>
    </View>
  )
}
