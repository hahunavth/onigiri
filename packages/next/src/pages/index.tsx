import { ListHeader } from 'app/components/ListHeader/index.web'
import { Center, HStack, Text, useBreakpointValue, View } from 'native-base'
import { FlatlistBanner } from 'app/components/Banner'
import { NavBar } from 'app/components/NavBar.web'
import { ComicGridGap3 } from 'app/components/ComicGridGap3/index'
import { useApiHot, useApiRecently, useApiTopWeek } from 'app/store/api'
import { Carousel } from '../components/Carousel'
import { ComicItem } from 'app/components/ComicGridGap3/ComicItem'
import { FlatGrid } from 'react-native-super-grid'
import React from 'react'
import { ListRenderItemInfo } from 'react-native'
import { resComicItem_T } from 'app/types'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'
import { ANbView } from 'app/components/Typo/View'

export default function Page() {
  const { data } = useApiHot('1')
  const { data: data2 } = useApiTopWeek('1')
  const { data: data3 } = useApiRecently('1')
  const numItem = useBreakpointValue({ base: 6, md: 12, lg: 18, xl: 24 })

  const offset = useSharedValue(400)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(offset.value)
    }
  })

  return (
    <ANbView
      w={['full', 'lg', '4/5', '3/4', '2/3']}
      // justifyContent={''}
      alignSelf={'center'}
      flexDirection={'column'}
      bg={'warmGray.50'}
      mt={100}
      // h={400}
      style={animatedStyle}
      overflow={'hidden'}
    >
      <ComicGridGap3 list={data?.data || []} />
      <LinearGradient
        colors={['#fffdfd9d', '#ffffff4a', '#cccccc30']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          // width: '',
          height: 60,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          onPress={() =>
            offset.value === 400 ? (offset.value = 1000) : (offset.value = 400)
          }
        >
          <MaterialCommunityIcons
            name="arrow-left-bold-circle"
            size={36}
            color={'gray'}
          />
        </TouchableOpacity>
      </LinearGradient>
    </ANbView>
  )

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
        {/* <View mt={4}>
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
        </View> */}

        <Center>
          {/* <ComicGridGap3 list={data3?.data || []} /> */}
          <ComicItem item={data3?.data[0]} loading />
        </Center>
      </View>
    </View>
  )
}
