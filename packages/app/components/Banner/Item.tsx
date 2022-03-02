import { resComicItem_T } from 'app/types/api'
import React, { useEffect, useRef, useState } from 'react'
import {
  Image,
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet
} from 'react-native'
import { Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { NextLink } from 'app/components/NextLink'
import {
  HEIGHT,
  ITEM_PADDING,
  ITEM_WIDTH,
  NUM_COLUMN,
  height,
  width
} from './size'

const Item = React.memo(({ item }: ListRenderItemInfo<resComicItem_T>) => {
  return (
    <NextLink
      routeName="comic-detail"
      params={{
        path: item.path,
        preloadItem: item
      }}
      style={{
        width: ITEM_WIDTH,
        height: HEIGHT / 4,
        margin: ITEM_PADDING
        // maxWidth: width,
        // marginHorizontal: 'auto'
      }}
    >
      <ImageBackground
        source={{ uri: item.posterUrl }}
        style={{
          width: ITEM_WIDTH,
          height: HEIGHT / 4,
          margin: ITEM_PADDING
          // maxWidth: width,
          // marginHorizontal: 'auto'
        }}
        blurRadius={8}
        borderRadius={4}
        progressiveRenderingEnabled
        fadeDuration={500}
      >
        <LinearGradient
          colors={['#0000009d', '#0000004c', '#ffffffb7']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: ITEM_WIDTH,
            height: HEIGHT / 4,
            borderRadius: 4
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                width: ITEM_WIDTH / 2,
                justifyContent: 'space-between',
                margin: ITEM_PADDING * 3
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
              <View style={{ marginBottom: 4 * ITEM_PADDING }}>
                <Text style={{ color: 'white' }}>
                  {item?.lastedChapters && item?.lastedChapters[0].chapterName}
                </Text>
                <Text style={{ color: 'white' }}>
                  {item?.lastedChapters &&
                    item?.lastedChapters[0].updatedDistance}
                </Text>
              </View>
            </View>
            <Image style={styles.image} source={{ uri: item.posterUrl }} />
          </View>
        </LinearGradient>
      </ImageBackground>
    </NextLink>
  )
})

const styles = StyleSheet.create({
  image: {
    height: HEIGHT / 4 - 4 * ITEM_PADDING,
    width: ITEM_WIDTH / 3,
    marginVertical: 2 * ITEM_PADDING,
    marginRight: 4 * ITEM_PADDING,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#a58989'
  }
})

export default Item
