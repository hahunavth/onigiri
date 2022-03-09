import { HStack, VStack, Text, View, Factory } from 'native-base'
import { StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import type { comicListProps } from './types'

export const ListHeader = ({
  name,
  onPressMore,
  subtitle,
  color = ''
}: comicListProps): JSX.Element => {
  const NBEntypo = Factory(Entypo)

  return (
    <HStack
      shadow={1}
      style={styles.headerContainer}
      _light={{ bg: `$light.background${color}Primary` }}
      _dark={{ bg: `$dark.backgroundPrimary` }}
    >
      <VStack style={styles.titleContainer}>
        <Text
          style={styles.title}
          _light={{ color: `$light.text${color}Primary` }}
          _dark={{ color: `$dark.text${color}Primary` }}
          fontWeight={`bold`}
        >
          {name}
        </Text>
        <Text
          style={styles.subTitle}
          _light={{ color: `$light.text${color}Secondary` }}
          _dark={{ color: `$dark.text${color}Secondary` }}
          fontWeight={`bold`}
        >
          {subtitle}
        </Text>
      </VStack>
      {onPressMore && (
        <TouchableNativeFeedback
          onPress={() => {
            onPressMore()
          }}
          style={styles.btn}
        >
          <View flexDirection={`row`}>
            <Text
              style={styles.btnText}
              _light={{ color: `$light.text${color}Secondary` }}
              _dark={{ color: `$dark.text${color}Secondary` }}
              fontWeight={`bold`}
              fontSize={12}
            >
              Show more
            </Text>
            <NBEntypo
              name="chevron-right"
              size={10}
              color="black"
              textAlign={`center`}
              w={6}
              h={6}
              _light={{ color: `$light.text${color}Secondary` }}
              _dark={{ color: `$dark.text${color}Secondary` }}
              style={styles.btnIcon}
            />
            {/* <Icon name="angle-right" style={styles.btnIcon} /> */}
          </View>
        </TouchableNativeFeedback>
      )}
    </HStack>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    paddingLeft: 10,
    borderRadius: 4,
    margin: 5
  },
  titleContainer: {
    marginLeft: 4
  },
  title: {
    fontSize: 16
  },
  subTitle: {
    fontSize: 12
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  btnText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 12,
    opacity: 0.6
  },
  btnIcon: {
    fontSize: 22,
    marginLeft: -4,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 4,
    opacity: 0.6
  }
})
