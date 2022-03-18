import { Heading, HStack as VStack, Spinner } from 'native-base'
import React from 'react'
import { MotiView } from 'moti'
import LottieView from 'lottie-react-native'

type Props = { text?: string; animation?: boolean }

export const Loading = (props: Props) => {
  return (
    <MotiView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      from={
        props.animation
          ? {
              transform: [{ scale: 0 }, { translateX: -10 }]
            }
          : null
      }
      animate={
        props.animation
          ? {
              transform: [{ scale: 1 }, { translateX: 0 }]
            }
          : null
      }
    >
      <VStack space={2} justifyContent="center">
        <LottieView
          // ref={animation => {
          //   this.animation = animation;
          // }}
          // style={{
          //   width: 1,
          //   height: 1
          //   // backgroundColor: '#eee'
          // }}
          source={require('../assets/loading.json')}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
        {/* <Spinner accessibilityLabel="Loading posts" color="warning.500" /> */}
        {/* <Heading color="warning.500" fontSize="md">
          {props.text || 'Loading'}
        </Heading> */}
      </VStack>
    </MotiView>
  )
}
