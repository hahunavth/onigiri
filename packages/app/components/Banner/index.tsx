import { resComicItem_T } from 'app/types/api'
import React, { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native'
import { Text, View } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'

import { useApiRecently } from 'app/store/api'
// import QuicksandText, { QFontFamily } from '@/components/Common/QuicksandText'

import { CustomPagination } from './CustomPagination'
import { LinearGradient } from 'expo-linear-gradient'

// Shared Element
// import { SharedElement } from 'react-navigation-shared-element'
// import { useNavigation } from '@react-navigation/native'
import { isNullOrUndefined } from 'util'
// import { MainNavigationProps } from 'expo/navigators/StackNavigator'
// import { BannerLoader } from '../Loader'
import { NextLink } from 'app/components/NextLink'

const { width, height } = Dimensions.get('window')
const NUM_COLUMN = Number.parseInt((width / 540).toFixed()) || 1
const ITEM_WIDTH = width / NUM_COLUMN
const ITEM_PADDING = (NUM_COLUMN + 1) * 10
const HEIGHT = 800

export const FlatlistBanner = () => {
  const [list, setList] = useState<resComicItem_T[]>([])

  const { data, isError, isFetching, isSuccess, error } = useApiRecently('1', {
    selectFromResult: (result) => result
  })

  useEffect(() => {
    if (isSuccess) setList(() => data?.data.filter((item, id) => id < 6))
  }, [isFetching])

  return (
    <View style={{ maxWidth: 500 }}>
      {isSuccess ? (
        <SwiperFlatList
          autoplay
          autoplayDelay={25}
          // index={3}
          autoplayLoop
          // autoplayInvertDirection
          data={isSuccess ? list : []}
          renderItem={(props) => <Item {...props} />}
          showPagination
          initialNumToRender={1}
          PaginationComponent={CustomPagination}
          // numColumns={}
          // horizontal
        />
      ) : // <BannerLoader />
      // isNullOrUndefined
      null}
    </View>
  )
}

const Item = React.memo(({ item }: ListRenderItemInfo<resComicItem_T>) => {
  // const navigation = useNavigation<any>()

  return (
    <NextLink
      routeName="test"
      // onPress={() =>
      //   navigation.navigate('test', {
      //     comic: item,
      //     path: item.path || ''
      //   })
      // }
      // style={{
      //   padding: ITEM_PADDING / 2
      // }}
    >
      {/* <Image style={styles.image} source={{ uri: item.posterUrl }} /> */}
      <ImageBackground
        source={{ uri: item.posterUrl }}
        style={{
          width: ITEM_WIDTH - ITEM_PADDING,
          height: HEIGHT / 4,
          margin: ITEM_PADDING / 2
        }}
        // style={sx({
        //   width: ITEM_WIDTH - ITEM_PADDING,
        //   height: HEIGHT / 4,
        //   margin: ITEM_PADDING / 2
        // })}
        blurRadius={8}
        borderRadius={8}
        progressiveRenderingEnabled
        fadeDuration={500}
      >
        <LinearGradient
          colors={['#0000009d', '#0000004c', '#ffffffb7']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: ITEM_WIDTH - ITEM_PADDING,
            height: HEIGHT / 4,
            borderRadius: 4
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
              // backgroundColor: "#42424237",
            }}
          >
            <View
              style={{
                width: ITEM_WIDTH / 2,
                justifyContent: 'space-between',
                margin: 15
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15
                }}
                numberOfLines={2}
              >
                {item?.name}
              </Text>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ color: 'white' }}>
                  {item?.lastedChapters && item?.lastedChapters[0].chapterName}
                </Text>
                <Text style={{ color: 'white' }}>
                  {item?.lastedChapters &&
                    item?.lastedChapters[0].updatedDistance}
                </Text>
              </View>
            </View>
            {/* <SharedElement id={`${item.posterUrl}`}> */}
            <Image
              // ref={imgRef}
              style={styles.image}
              source={{ uri: item.posterUrl }}
            />
            {/* </SharedElement> */}
          </View>
        </LinearGradient>
      </ImageBackground>
    </NextLink>
  )
})

const styles = StyleSheet.create({
  image: {
    height: HEIGHT / 4 - ITEM_PADDING,
    width: ITEM_WIDTH / 3,
    marginVertical: 10,
    marginRight: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#636363'
  }
})
