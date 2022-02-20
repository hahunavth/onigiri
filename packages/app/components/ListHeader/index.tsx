import { HStack, VStack, Text, View, Factory } from 'native-base'
import { comicListProps } from './types'
import { StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Entypo } from '@expo/vector-icons'

// TODO: Use common SessionHeader
export const ListHeader = ({
  name,
  onPressMore,
  subtitle,
  color = ''
}: comicListProps): JSX.Element => {
  const NBEntypo = Factory(Entypo)

  return (
    <HStack
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
      <TouchableNativeFeedback
        onPress={() => {
          onPressMore && onPressMore()
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
    </HStack>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    paddingLeft: 10,
    borderRadius: 4,
    margin: 5
    // flexDirection: 'row',
    // alignItems: 'flex-end',
  },
  titleContainer: {
    marginLeft: 4
  },
  title: {
    fontSize: 16
    // fontFamily: 'Quicksand_600SemiBold',
    // color: ColorSchemeE['text-basic-color']
  },
  subTitle: {
    fontSize: 12
    // fontFamily: QFontFamily.Quicksand_500Medium,
    // color: ColorSchemeE['text-hint-color']
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  btnText: {
    // fontSize: 10
    // width: HeaderHeight, height: HeaderHeight,
    // color: ColorSchemeE['text-hint-color']
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
    // color: ColorSchemeE['text-hint-color'],
  }
})
