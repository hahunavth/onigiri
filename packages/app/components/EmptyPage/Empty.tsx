import { View, Text, VStack } from 'native-base'
import React from 'react'
import LottieView from 'lottie-react-native'

type Props = {
  title?: string
}

export const Empty = ({ title }: Props) => {
  return (
    <VStack flex={1} justifyContent={'center'} alignItems={'center'}>
      <LottieView
        source={require('../../assets/empty.json')}
        autoPlay
        loop={false}
        speed={1}
        style={{ marginBottom: 0, width: 200, height: 200 }}
      />
      <Text pt={41} fontSize={18} fontWeight={'600'} color={'blueGray.500'}>
        {title ? title : 'Empty, read more comic'}
      </Text>
    </VStack>
  )
}
