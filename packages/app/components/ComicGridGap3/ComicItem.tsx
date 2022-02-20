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
import {NextLink} from 'app/components/NextLink'

export function ComicItem(props: { loading?: boolean; item?: resComicItem_T }) {
  return (
    <NextLink
      routeName={"comic-detail"}
      params={{
        // item: props.item,
        id: 0,
        path: props.item?.path,
        preloadItem: props.item
      }}
    >
      <VStack
        flexDirection={'column-reverse'}
        bg={'$light.backgroundBluePrimary'}
        borderWidth={1}
        borderColor={'#c0d4f1'}
        w={125}
        height={208}
        rounded="sm"
        // ml={1}
        // mr={1}
      >
        <Center justifyContent={'center'} h={49}>
          {props.loading ? (
            <Text
              numberOfLines={2}
              textAlign="center"
              fontSize={12}
              color={'$light.textBluePrimary'}
            >
              {props.item?.name}
              {/* <Skeleton ></Skeleton> */}
            </Text>
          ) : (
            <>
              <Skeleton.Text fontSize={12} mb={4} />
              <Skeleton.Text fontSize={12} />
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
            w={114}
            h={152}
            mt={1}
            ml={1}
            mr={1}
            rounded={'sm'}
          />
        ) : (
          <Skeleton w={114} h={152} mt={1} ml={1} mr={1} rounded={'sm'} />
        )}
      </VStack>
    </NextLink>
  )
}
