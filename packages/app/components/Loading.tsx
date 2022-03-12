import { Heading, HStack, Spinner } from 'native-base'
import React from 'react'
import { MotiView } from 'moti'

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
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" color="warning.500" />
        <Heading color="warning.500" fontSize="md">
          {props.text || 'Loading'}
        </Heading>
      </HStack>
    </MotiView>
  )
}
