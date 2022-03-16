import { View, Text, VStack } from 'native-base'
import React from 'react'
import LottieView from 'lottie-react-native'

type Props = {}

export const NoNotification = (props: Props) => {
  return (
    <VStack flex={1} justifyContent={'center'} alignItems={'center'}>
      <LottieView
        // ref={animation => {
        //   this.animation = animation;
        // }}
        // style={{
        //   width: 1,
        //   height: 1
        //   // backgroundColor: '#eee'
        // }}
        source={require('../../assets/no-notifications.json')}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        autoPlay
        loop
        style={{ marginBottom: 60 }}
      />
      <Text pt={91} fontSize={18} fontWeight={'600'} color={'blueGray.500'}>
        No Notification
      </Text>
    </VStack>
  )
}
