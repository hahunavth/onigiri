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
import { TouchableOpacity } from 'react-native-gesture-handler'
import { navigate } from '../../navigators'
import type { resComicItem_T } from '../../types'
import { num2FormatString } from '../../utils/stringFormat'
import { NextLink } from '../NextLink'
import { TextXsP } from '../Typo'
import { GridItemProps } from './types'

export const GridItem = (props: GridItemProps) => {
  return (
    // <NextLink
    //   routeName={props.loading ? 'comic-detail' : 'main'}
    //   params={{
    //     preloadItem: props.item,
    //     path: props.item?.path
    //   }}
    // >
    <TouchableOpacity
      onPress={() =>
        navigate('comic-detail', {
          preloadItem: props.item,
          path: props.item?.path || ''
        })
      }
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
            <TextXsP
              numberOfLines={2}
              textAlign="center"
              fontSize={12}
              color={'$light.textPrimary'}
              _dark={{
                color: '$dark.textPrimary'
              }}
            >
              {props.item?.name}
            </TextXsP>
          ) : (
            <Skeleton.Text lines={1} fontSize={12} px={4} />
          )}
        </Center>
        {/* NOTE: RESPONSIVE IMAGE CONTAINER */}
        <View flex={1} p={1}>
          {/* NOTE: RESPONSIVE IMAGE CONTAINER */}
          {props.loading ? (
            <Image
              source={{
                uri: props.item?.posterUrl
              }}
              // source={{
              //   uri: 'https://wallpaperaccess.com/full/317501.jpg'
              // }}
              alt="Alternate Text"
              resizeMode="cover"
              w={'full'}
              h={'full'}
              rounded={'sm'}
            />
          ) : (
            <Skeleton w={'full'} h={'full'} rounded={'sm'} />
          )}
        </View>
        <Box
          position={'absolute'}
          top={2}
          right={2}
          bg={'$light.backgroundSecondary'}
          px={2}
          pt={0}
          pb={0.2}
          rounded={'full'}
        >
          <Text fontSize={11} fontWeight={600} color={'$light.textSecondary'}>
            {num2FormatString(props.item?.views)}
          </Text>
        </Box>
      </VStack>
    </TouchableOpacity>

    // </NextLink>
  )
}
