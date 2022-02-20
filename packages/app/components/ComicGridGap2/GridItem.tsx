import {
  View,
  Text,
  Box,
  Center,
  HStack,
  VStack,
  Image,
  Skeleton
} from 'native-base'
import React from 'react'
import { TouchableNativeFeedback } from 'react-native'
import type { resComicItem_T } from '../../types'
import { NextLink } from '../NextLink'

export const GridItem = (props: {
  loading?: boolean
  item?: resComicItem_T
}) => {
  return (
    <NextLink
      routeName="comic-detail"
      params={{
        preloadItem: props.item,
        path: props.item?.path
      }}
    >
      <VStack
        flexDirection={'column-reverse'}
        bg={'$light.backgroundGreenPrimary'}
        borderWidth={1}
        borderColor={'#c0d4f1'}
        w={190}
        height={208}
        rounded="sm"
      >
        <Center justifyContent={'center'} h={49}>
          <Text
            numberOfLines={2}
            textAlign="center"
            fontSize={12}
            color={'$light.textGreenPrimary'}
          >
            {props.item?.name}
            {/* <Skeleton ></Skeleton> */}
          </Text>
        </Center>
        <Image
          source={{
            uri: props.item?.posterUrl
          }}
          // source={{
          //   uri: 'https://wallpaperaccess.com/full/317501.jpg'
          // }}
          alt="Alternate Text"
          // size="xl"
          w={180}
          h={152}
          mt={1}
          ml={1}
          mr={1}
          rounded={'sm'}
        />
      </VStack>
    </NextLink>
  )
}
