import {
  View,
  Text,
  Box,
  Center,
  Image,
  ZStack,
  useToken,
  HStack,
  VStack
} from 'native-base'
import { TouchableNativeFeedback } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { resComicItem_T } from '../../types'
import { HistoryComicT } from '../../store/historySlice'
import { NextLink } from '../NextLink'

type Props = {
  item: Partial<HistoryComicT>
}

export function ListItem({ item }: Props) {
  const [bgLight, bgDark] = useToken('colors', [
    '$light.backgroundYellowPrimary',
    '$light.backgroundYellowSecondary'
  ])

  return (
    <NextLink
      routeName="comic-detail"
      params={{
        preloadItem: item,
        path: item.path
      }}
    >
      <Box
        p={1}
        bg={'$light.backgroundYellowPrimary'}
        rounded={'sm'}
        w={230}
        h={160}
        m={2}
        borderColor={bgDark}
        borderWidth={1}
      >
        <ZStack w={220} h={150} rounded={'sm'}>
          <Image
            source={{
              uri: item.posterUrl
            }}
            alt="Alternate Text"
            // size="xl"
            w={220}
            h={150}
            rounded="sm"
          />
          <Box
            position={'absolute'}
            bottom={0}
            left={0}
            right={0}
            height={44}
            roundedBottom="sm"
            overflow={'hidden'}
          >
            <LinearGradient
              // Button Linear Gradient
              colors={[bgDark, bgLight]}
              style={{ flex: 1 }}
            >
              <VStack>
                <Text
                  color={'$light.textYellowPrimary'}
                  fontWeight="bold"
                  numberOfLines={1}
                  fontSize={15}
                >
                  {item.title}
                </Text>
                <HStack justifyContent="space-between">
                  <Text
                    fontWeight={500}
                    fontSize={12}
                    color={'$light.textYellowSecondary'}
                  >
                    {item.lastedReadChapter}
                  </Text>
                  <Text
                    fontWeight={500}
                    fontSize={12}
                    color={'$light.textYellowSecondary'}
                  >
                    {item.createdAt}
                  </Text>
                </HStack>
              </VStack>
            </LinearGradient>
          </Box>
        </ZStack>
      </Box>
    </NextLink>
  )
}
