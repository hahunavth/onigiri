import { View, Text, HStack, VStack, Box } from 'native-base'
import React from 'react'
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { navigate } from '../navigators'
import { useColorModeStyle } from '../hooks/useColorModeStyle'

const Categories = () => {
  const { boxStyle, textStyle } = useColorModeStyle('', 'Primary')

  return (
    <HStack justifyContent={'center'} space={2}>
      <IconWithTitle
        title="Top comic"
        onPress={() => {
          navigate('top-comic')
        }}
      >
        <MaterialIcons
          name="align-vertical-top"
          size={24}
          color={textStyle.color}
        />
      </IconWithTitle>
      <IconWithTitle
        title="Genres"
        onPress={() => navigate('genres.badge-list')}
      >
        <MaterialIcons
          name="align-vertical-top"
          size={24}
          color={textStyle.color}
        />
      </IconWithTitle>
      <IconWithTitle
        title="Find comic"
        onPress={() =>
          navigate('main', {
            screen: 'main/discover'
          })
        }
      >
        <MaterialIcons name="more-horiz" size={24} color={textStyle.color} />
      </IconWithTitle>
      <IconWithTitle
        title="More"
        onPress={() => {
          navigate('genres-comic-list')
        }}
      >
        <MaterialIcons name="more-horiz" size={24} color={textStyle.color} />
      </IconWithTitle>
    </HStack>
  )
}

type Props = {
  children: React.ReactElement
  title?: string
  onPress?: () => any
}

const Touchable: React.FC<TouchableOpacityProps & TouchableOpacityProps> =
  Platform.select({
    android: require('react-native').TouchableNativeFeedback,
    web: require('react-native').TouchableOpacity
  })

const IconWithTitle = ({ children, onPress, title }: Props) => {
  const { boxStyle, textStyle } = useColorModeStyle('', 'Primary')

  return (
    <VStack
      rounded={7}
      overflow={'hidden'}
      bg={boxStyle.backgroundColor}
      shadow={'1'}
    >
      <Touchable onPress={onPress}>
        <View
          justifyContent={'center'}
          alignItems={'center'}
          w={81}
          px={0}
          py={3}
        >
          <Box>{children}</Box>
          <Text fontSize={12} style={textStyle}>
            {title}
          </Text>
        </View>
      </Touchable>
    </VStack>
  )
}

export default Categories
