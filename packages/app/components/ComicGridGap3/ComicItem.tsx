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
import { NextLink } from 'app/components/NextLink'

export function ComicItem(props: { loading?: boolean; item?: resComicItem_T }) {
  return (
    <NextLink
      routeName={props.loading ? 'comic-detail' : 'main'}
      params={{
        // item: props.item,
        id: 0,
        path: props.item?.path,
        preloadItem: props.item
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
        w={[125, 125, 150, 175, 220]}
        height={[220, 208, 260, 320]}
        rounded="sm"
        m={[1, 1, 2]}
      >
        <Center justifyContent={'center'} h={49}>
          {props.loading ? (
            <Text
              numberOfLines={2}
              textAlign="center"
              fontSize={[12, 13, 13, 14, 16]}
              fontWeight={'600'}
              color={'$light.textPrimary'}
              _dark={{
                color: '$dark.textPrimary'
              }}
            >
              {props.item?.name}
              {/* <Skeleton ></Skeleton> */}
            </Text>
          ) : (
            <>
              <Skeleton.Text fontSize={12} px={2} mb={0} lines={2} />
              {/* <Skeleton.Text fontSize={12} /> */}
            </>
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
            // w={114}
            w={[125, 150, 150, 175, 220]}
            height={[152, 180, 180, 210, 270]}
            // h={152}
            // mt={[1]}
            // ml={1}
            // mr={1}
            rounded={'sm'}
          />
        ) : (
          <Skeleton
            w={[125, 150, 150, 175, 220]}
            height={[152, 180, 180, 210, 270]}
            // mt={1}
            // ml={1}
            // mr={1}
            rounded={'sm'}
          />
        )}
      </VStack>
    </NextLink>
  )
}
