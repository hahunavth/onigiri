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
      routeName={props.loading ? 'comic-detail' : 'main'}
      params={{
        preloadItem: props.item,
        path: props.item?.path
      }}
    >
      <VStack
        flexDirection={'column-reverse'}
        bg={'$light.backgroundPrimary'}
        _dark={{
          bg: '$dark.backgroundPrimary',
          borderColor: '$dark.textSecondary'
        }}
        borderWidth={1}
        borderColor={'#c0d4f1'}
        w={190}
        height={208}
        rounded="sm"
      >
        <Center justifyContent={'center'} h={49}>
          {props.loading ? (
            <Text
              numberOfLines={2}
              textAlign="center"
              fontSize={12}
              color={'$light.textPrimary'}
              _dark={{
                color: '$dark.textPrimary'
              }}
            >
              {props.item?.name}
            </Text>
          ) : (
            <Skeleton.Text lines={1} fontSize={12} px={4} />
          )}
        </Center>
        {props.loading ? (
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
        ) : (
          <Skeleton w={180} h={152} mt={1} ml={1} mr={1} rounded={'sm'} />
        )}
      </VStack>
    </NextLink>
  )
}
