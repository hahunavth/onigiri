import { resComicItem_T } from 'app/types/api'
import React, { useEffect, useRef, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'

import { useApiRecently } from 'app/store/api'

import { CustomPagination } from './CustomPagination'

import { NextLink } from 'app/components/NextLink'
import Item from './Item'
import { ITEM_HEIGHT, ITEM_PADDING, ITEM_WIDTH } from './size'
import { Box, Pressable, Skeleton } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

export const FlatlistBanner = () => {
  const [list, setList] = useState<resComicItem_T[]>([])
  const flatListRef = React.useRef<SwiperFlatList>(null)
  const { data, isError, isFetching, isSuccess, error } = useApiRecently('1', {
    selectFromResult: (result) => result
  })

  useEffect(() => {
    if (isSuccess)
      setList((list) => data?.data.filter((item, id) => id < 6) || list)
  }, [isFetching])

  return (
    <View
      style={{
        marginTop: 100,
        position: 'relative'
      }}
    >
      {isSuccess ? (
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
      ) : (
        <Box bg={'$light.backgroundPrimary'}>
          <Skeleton
            // w={ITEM_WIDTH}
            w={'full'}
            h={ITEM_HEIGHT}
            p={ITEM_PADDING / 4}
            m="auto"
          />
        </Box>
      )}
      <Pressable
        position={'absolute'}
        right={-12}
        bottom={104}
        onPress={() => {
          const cid = flatListRef.current?.getCurrentIndex()
          // const s2i = flatListRef.current.
          cid &&
            cid < 5 &&
            flatListRef.current?.scrollToIndex({
              index: cid + 1,
              animated: true
            })
        }}
      >
        {({ isFocused, isHovered, isPressed }) => {
          return (
            // <TouchableOpacity>
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
            // </TouchableOpacity>
          )
        }}
      </Pressable>

      <Pressable
        position={'absolute'}
        left={-12}
        bottom={104}
        onPress={() => {
          const cid = flatListRef.current?.getCurrentIndex()
          // const s2i = flatListRef.current.
          cid &&
            cid > 0 &&
            flatListRef.current?.scrollToIndex({
              index: cid + 1,
              animated: true
            })
        }}
      >
        {({ isFocused, isHovered, isPressed }) => {
          return (
            // <TouchableOpacity>
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
            // </TouchableOpacity>
          )
        }}
      </Pressable>
    </View>
  )
}
