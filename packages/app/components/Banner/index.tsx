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
import Item from './Item'
import { ITEM_HEIGHT, ITEM_PADDING, ITEM_WIDTH } from './size'
import { Box, Skeleton } from 'native-base'

export const FlatlistBanner = () => {
  const [list, setList] = useState<resComicItem_T[]>([])

  const { data, isError, isFetching, isSuccess, error } = useApiRecently('1', {
    selectFromResult: (result) => result
  })

  useEffect(() => {
    if (isSuccess)
      setList((list) => data?.data.filter((item, id) => id < 6) || list)
  }, [isFetching])

  return (
    <View style={{ maxWidth: 500, marginHorizontal: ITEM_PADDING }}>
      {isSuccess ? (
        <SwiperFlatList
          autoplay
          autoplayDelay={25}
          autoplayLoop
          data={isSuccess ? list : []}
          renderItem={(props) => <Item {...props} />}
          showPagination
          initialNumToRender={1}
          PaginationComponent={CustomPagination}
        />
      ) : (
        <Box bg={'$light.backgroundPrimary'}>
          <Skeleton
            w={ITEM_WIDTH}
            h={ITEM_HEIGHT}
            p={ITEM_PADDING / 4}
            m="auto"
          />
        </Box>
      )}
    </View>
  )
}
