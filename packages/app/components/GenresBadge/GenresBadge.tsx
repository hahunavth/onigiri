import { View, Text, Box, Pressable } from 'native-base'
import { ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import { GenresBadgeProps } from './types'
import { navigate } from '../../navigators'

export const GenresBadge = ({ imageUrl, name }: GenresBadgeProps) => {
  return (
    <TouchableOpacity
      style={{
        width: 150,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        overflow: 'hidden'
      }}
      onPress={() => navigate('genres', { genresName: name })}
    >
      <LinearGradient
        colors={['#7a92a89d', '#65b8b8b7']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0
        }}
      ></LinearGradient>
      <Text color={'white'} fontSize={16} fontWeight={600} textAlign={'center'}>
        {name}
      </Text>
    </TouchableOpacity>
  )

  // return (
  //   <Pressable w={100} h={100}>
  //     {/* <ImageBackground
  //       source={{ uri: imageUrl }}
  //       style={{ width: 100, height: 100 }}
  //       blurRadius={8}
  //       borderRadius={4}
  //       progressiveRenderingEnabled
  //     > */}
  //     {/* </ImageBackground> */}
  //     {({isFocused, isHovered, isPressed}) => <Text>{name}</Text>}
  //   </Pressable>
  // )
}
