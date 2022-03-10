import { View, Text, Input, Box, Button } from 'native-base'
import React from 'react'
import { MessageInputProps } from './types'
import { FontAwesome } from '@expo/vector-icons'

export const MessageInput = (props: MessageInputProps) => {
  return (
    <View>
      <Box alignItems="center">
        <Input
          // type={show ? 'text' : 'password'}
          w="75%"
          maxW="300px"
          py="0"
          InputRightElement={
            <Button
              size="xs"
              rounded="full"
              // w="1/6"
              // h="full"
              // onPress={handleClick}
            >
              {/* {show ? 'Hide' : 'Show'} */}
              <FontAwesome name="send-o" size={24} color="black" />
            </Button>
          }
          placeholder="Password"
        />
      </Box>
    </View>
  )
}
