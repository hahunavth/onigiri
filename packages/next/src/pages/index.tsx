import { ListHeader } from 'app/components/ListHeader'
import { Center, Text, View } from 'native-base'
import { FlatlistBanner } from 'app/components/Banner'
import { NavBar } from 'app/components/NavBar.web'
import { ComicGridGap3 } from 'app/components/ComicGridGap3'
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
        <ListHeader
          name={'Recently'}
          subtitle="New comic release"
          color="Blue"
        />
        <ComicGridGap3 list={data?.data || []} />
        <ComicGridGap3 list={data?.data || []} />
        <ComicGridGap3 list={data?.data || []} />
        <Text fontSize={30} fontWeight={700}>
          hello
        </Text>
      </View>
    </View>
  )
}
