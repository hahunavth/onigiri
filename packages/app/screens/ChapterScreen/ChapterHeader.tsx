import { BlurView } from 'app/components/BlurView'
import React, { useEffect, useState } from 'react'
import {
  useWindowDimensions,
  StyleSheet,
  ViewStyle,
  InteractionManager
} from 'react-native'
import { Text, View } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useAppSelector } from 'app/store/hooks'
import { homeSelector } from 'app/store/homeSlice'
import { useNavigation } from '@react-navigation/native'
import { ComicDetailScreenProps } from 'app/navigators/StackNav'
import { usePrefetch } from 'app/store/api'
import Animated from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColorModeStyle } from '../../hooks/useColorModeStyle'
import { goBack, navigate } from '../../navigators'

interface Props {
  style?: ViewStyle,
  name?: string
}

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView)

const ChapterHeader = (props: Props) => {
  const home = useAppSelector(homeSelector)
  const { top } = useSafeAreaInsets()
  const navigation = useNavigation<ComicDetailScreenProps>()
  const { width, height } = useWindowDimensions()
  const chapterCallback = usePrefetch('getChapterByPath', {})

  // const PADDING = 32;
  //
  // const [nextChapter, setNextChapter] = useState('')
  // const [prevChapter, setPrevChapter] = useState('')
  //
  // useEffect(() => {
  //   const interaction = InteractionManager.runAfterInteractions(() => {
  //     const length = home.currentComic?.chapters.length
  //     const id = home.currentChapter?.id
  //     const list = home.currentComic?.chapters
  //     if (id && length && list) {
  //       if (id < length - 1) {
  //         setNextChapter(() => list[id + 1].path)
  //         if (list[id + 1].path) chapterCallback(list[id + 1].path)
  //       }
  //       if (id > 0) {
  //         setPrevChapter(() => list[id - 1].path)
  //         if (list[id - 1].path) chapterCallback(list[id - 1].path)
  //       }
  //     }
  //   })
  //   return () => {
  //     interaction.cancel()
  //   }
  // }, [home.currentChapter?.chapterName])

  const { boxStyle, textStyle } = useColorModeStyle('', 'Secondary')

  const containerStyle = React.useMemo(() => {
    return [
      {
        position: 'absolute',
        top: 0,
        // width: '100%',
        left: 0,
        right: 0,
        height: 48 + top,
        marginBottom: 0,
        zIndex: 100,
        backgroundColor: boxStyle.backgroundColor
        // marginHorizontal: PADDING / 2,
        // width: width - PADDING,
        // backgroundColor: "transparent",
      },
      props.style
    ]
  }, [props.style, top])


  return (
    <>
      <AnimatedSafeAreaView
        style={containerStyle as ViewStyle}
      >
        {/* Floading */}
        <SafeAreaView
          style={[{
            position: 'absolute', right: 4, top: 0,
            bottom: 0, justifyContent: 'center',
            alignItems: 'center'
          }, textStyle]}
        >
          <TouchableOpacity

          >
            <AntDesign
              name="menuunfold"
              size={28}
              color={textStyle.color}
            />
          </TouchableOpacity>
        </SafeAreaView>

        <SafeAreaView
          style={[{
            position: 'absolute', left: 4, top: 0,
            bottom: 0, justifyContent: 'center',
            alignItems: 'center'
          }, textStyle]}
        >
          <TouchableOpacity
            onPress={() => {
              goBack()
            }}
          >
            <AntDesign
              name="arrowleft"
              size={34}
              color={textStyle.color}

            />
          </TouchableOpacity>
        </SafeAreaView>

        {/* <View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 0
              // backgroundColor: '#1e282b83'
              // justifyContent: "center",
              // padding: 20,
              // backgroundColor: "red",
              // borderBottomLeftRadius: 20,
            },
            StyleSheet.absoluteFill
          ]}
          // intensity={60}
          // tint={'dark'}
          // blurType="light"
          // blurAmount={20}
          // blurRadius={15}
          // downsampleFactor={4}
          // overlayColor="transparent"
        /> */}
        <View
          style={{
            position: 'relative',
            flex: 1,
            backgroundColor: 'transparent',
            // borderBottomLeftRadius: 20,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            // marginBottom: ,
            marginTop: 2
          }}
        >
          <Text style={textStyle}>{props.name}</Text>
        </View>
      </AnimatedSafeAreaView>
    </>
  )
}

export default ChapterHeader
