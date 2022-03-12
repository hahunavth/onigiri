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
import { MaterialIcons } from '@expo/vector-icons'

import { CustomPagination } from './CustomPagination'
import { LinearGradient } from 'expo-linear-gradient'

import { isNullOrUndefined } from 'util'
import { NextLink } from 'app/components/NextLink'
import Item from './Item'
import { HEIGHT, ITEM_HEIGHT, ITEM_PADDING, ITEM_WIDTH, NUM_ITEM } from './size'
import { Box, Pressable, Skeleton } from 'native-base'

export const FlatlistBanner = () => {
  const [list, setList] = useState<resComicItem_T[]>([])
  const flatListRef = React.useRef<SwiperFlatList>(null)
  const { data, isError, isFetching, isSuccess, error } = useApiRecently('1', {
    selectFromResult: (result) => result
  })

  useEffect(() => {
    if (isSuccess)
      setList((list) => data?.data.filter((item, id) => id < NUM_ITEM) || list)
  }, [isFetching])

  return (
    <View
      style={{
        maxWidth: 500,
        marginHorizontal: ITEM_PADDING,
        width: ITEM_WIDTH,
        height: HEIGHT / 4,
        margin: ITEM_PADDING
      }}
    >
      {isSuccess ? (
        <View>
          <SwiperFlatList
            ref={flatListRef}
            autoplay
            autoplayDelay={25}
            autoplayLoop
            data={isSuccess ? list : []}
            renderItem={(props) => <Item {...props} />}
            showPagination
            initialNumToRender={1}
            PaginationComponent={CustomPagination}
          />
          {/*Floating Btn*/}
          <Pressable
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: [{ translateY: -18 }]
            }}
            onPress={() => {
              const curId = flatListRef.current?.getCurrentIndex()
              if (curId !== undefined && curId > 0)
                flatListRef.current?.scrollToIndex({ index: curId - 1 })
              else flatListRef.current?.goToLastIndex()
            }}
          >
            {({ isFocused, isHovered, isPressed }) => {
              return (
                <MaterialIcons
                  name="navigate-before"
                  size={36}
                  color="white"
                  style={{
                    opacity: isPressed ? 0.4 : isHovered ? 0.8 : 1,
                    borderRadius: 100,
                    backgroundColor: '#1499b1'
                  }}
                />
              )
            }}
          </Pressable>

          <Pressable
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: [{ translateY: -18 }]
            }}
            onPress={() => {
              const curId = flatListRef.current?.getCurrentIndex()
              if (curId !== undefined && curId < NUM_ITEM - 1)
                flatListRef.current?.scrollToIndex({ index: curId + 1 })
              else flatListRef.current?.goToFirstIndex()
            }}
          >
            {({ isFocused, isHovered, isPressed }) => {
              return (
                <MaterialIcons
                  name="navigate-next"
                  size={36}
                  color="white"
                  style={{
                    opacity: isPressed ? 0.4 : isHovered ? 0.8 : 1,
                    borderRadius: 100,
                    backgroundColor: '#1499b1'
                  }}
                />
              )
            }}
          </Pressable>
          {/* Floating Btn */}
        </View>
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
