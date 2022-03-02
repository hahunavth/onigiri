import React from 'react'
import {
  ListRenderItemInfo,
  FlatList,
  TouchableNativeFeedback
} from 'react-native'
import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack
} from 'native-base'
import { AntDesign } from '@expo/vector-icons'

type ChapterFooterBtnProps = {
  type?: 'next' | 'prev'
  chapterName?: string
  onPress?: () => any
}

export default function ChapterFooterBtn(props: ChapterFooterBtnProps) {
  return (
    <Pressable onPress={props.onPress}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            w="3/4"
            my={4}
            borderWidth="1"
            borderColor="coolGray.300"
            shadow="3"
            bg={
              isPressed
                ? 'coolGray.200'
                : isHovered
                ? 'coolGray.200'
                : 'coolGray.100'
            }
            ml={props.type === 'next' ? 'auto' : undefined}
            p="5"
            rounded="8"
            // alignItems={'flex-end'}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.98 : 1
                }
              ]
            }}
          >
            {props.type === 'next' ? (
              <>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                  <VStack>
                    <Text
                      color="coolGray.800"
                      // mt="3"
                      fontWeight="medium"
                      fontSize="xl"
                    >
                      NEXT CHAPTER
                    </Text>
                    <Text mt="2" fontSize="sm" color="coolGray.700">
                      Chap 1
                    </Text>
                  </VStack>
                  <AntDesign
                    name="doubleright"
                    size={24}
                    color="black"
                    style={{ marginLeft: 18 }}
                  />
                </HStack>
              </>
            ) : (
              <>
                <HStack
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  flexDirection="row-reverse"
                >
                  <VStack>
                    <Text
                      color="coolGray.800"
                      // mt="3"
                      fontWeight="medium"
                      fontSize="xl"
                    >
                      PREV CHAPTER
                    </Text>
                    <Text mt="2" fontSize="sm" color="coolGray.700">
                      Chap 1
                    </Text>
                  </VStack>
                  <AntDesign
                    name="doubleleft"
                    size={24}
                    color="black"
                    style={{ marginLeft: 18 }}
                  />
                </HStack>
              </>
            )}
          </Box>
        )
      }}
    </Pressable>
  )
}
