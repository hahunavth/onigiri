import { BlurView } from 'app/components/BlurView'
import React, { useEffect, useState } from 'react'
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ViewStyle,
  InteractionManager,
  Text
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import { useAppSelector } from 'app/store/hooks'
import { homeSelector } from 'app/store/homeSlice'
import { useNavigation } from '@react-navigation/native'
import { ComicDetailScreenProps } from 'app/navigators/StackNav'
import { usePrefetch } from 'app/store/api'
import Animated from 'react-native-reanimated'
import { navigate } from 'app/navigators/index'
interface Props {
  style?: ViewStyle
}
// FIXME: CHAPTER BAR CHANGE CHAPTER
const ChapterBar = (props: Props) => {
  const home = useAppSelector(homeSelector)
  // console.log(home)

  // Prefetch next and prev chapter if exists
  const chapterCallback = usePrefetch('getChapterByPath', {})

  const [nextChapter, setNextChapter] = useState('')
  const [prevChapter, setPrevChapter] = useState('')

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      const length = home.currentComic?.chapters.length
      const id = home.currentChapter?.id
      const list = home.currentComic?.chapters
      if (id && length && list) {
        if (id < length - 1) {
          setNextChapter(() => list[id + 1].path)
          if (list[id + 1].path) chapterCallback(list[id + 1].path)
        }
        if (id > 0) {
          setPrevChapter(() => list[id - 1].path)
          if (list[id - 1].path) chapterCallback(list[id - 1].path)
        }
      }
    })

    return () => {
      interaction.cancel()
    }
  }, [home.currentChapter?.chapterName])

  return (
    <>
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 64,
            marginBottom: 0
            // marginHorizontal: PADDING / 2,
            // width: width - PADDING,
            // backgroundColor: "transparent",
          },
          props.style
        ]}
      >
        <BlurView
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
          intensity={60}
          tint={'dark'}
          // blurType="light"
          // blurAmount={20}
          // blurRadius={15}
          // downsampleFactor={4}
          // overlayColor="transparent"
        />
        <View
          style={{
            position: 'relative',
            flex: 1,
            backgroundColor: 'transparent',
            // borderBottomLeftRadius: 20,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: -4,
            marginTop: 2
          }}
        >
          <TouchableOpacity
            // disabled={!nextChapter}
            style={{ opacity: prevChapter ? 1 : 0.5 }}
            onPress={() => {
              if (nextChapter && home.currentChapter?.id) {
                navigate('chapter', {
                  path: nextChapter,
                  id: home.currentChapter?.id + 1,
                  name: nextChapter
                })
              }
            }}
          >
            <AntDesign
              name={'arrowleft'}
              size={32}
              style={{ color: 'white' }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name={'like2'} size={32} style={{ color: 'white' }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name={'message1'} size={28} style={{ color: 'white' }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name={'reload1'} size={28} style={{ color: 'white' }} />
          </TouchableOpacity>
          <TouchableOpacity
            // disabled={!prevChapter}
            style={{ opacity: prevChapter ? 1 : 0.5 }}
            onPress={() => {
              if (prevChapter && home.currentChapter?.id) {
                navigate('chapter', {
                  path: prevChapter,
                  id: home.currentChapter?.id - 1,
                  name: prevChapter
                })
              }
            }}
          >
            <AntDesign
              name={'arrowright'}
              size={32}
              style={{ color: 'white' }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ alignSelf: 'center', color: 'white' }} numberOfLines={1}>
          {home.currentChapter?.chapterName}
        </Text>
      </Animated.View>
    </>
  )
}

export default ChapterBar
