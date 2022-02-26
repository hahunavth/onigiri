// Lib
import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  FlatList,
  FlatListProps,
  StyleProp,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  ViewProps,
  ViewStyle,
  InteractionManager
} from 'react-native'
import { Button, View, Text, Badge } from 'native-base'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  interpolateColor,
} from 'react-native-reanimated'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs'
import {
  useSafeAreaInsets,
  SafeAreaView
} from 'react-native-safe-area-context'
// App
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { goBack, navigate } from 'app/navigators'
import {
  historySelector,
  toggleSubscribeComicThunk
} from 'app/store/historySlice'
import { useColorModeStyle } from 'app/hooks/useColorModeStyle'
// Local
import Header, { HeaderConfig, Visibility } from './Header'
import HeaderOverlay from './HeaderOverlay'
import { ScrollPair } from './ScrollPair'
import useScrollSync from './useScrollSync'
import ChapterList from './ChapterList'
import TabBar from './TabBar'
import DetailList from './DetailList'
// Type
import type {
  resComicDetailChapterItem_T,
  resComicDetail_T,
  resComicItem_T
} from 'app/types'

type Props = {
  comic?: resComicDetail_T
  routeParam?: resComicItem_T
  offline?: boolean
}

const tbStyle = StyleSheet.create({
  tabBar: {
    // backgroundColor: ColorSchemeE['background-basic-color-1']
  },
  iconColor: {
    // backgroundColor: ColorSchemeE['text-basic-color']
  }
})

// const AnimatedLayout = Animated.createAnimatedComponent(Layout)

const ToastComingSoon = () => {
  ToastAndroid.show('Coming Soon!', 500)
}

// Constant
const TAB_BAR_HEIGHT = 48
const HEADER_HEIGHT = 48
const OVERLAY_VISIBILITY_OFFSET = 32

const Tab = createMaterialTopTabNavigator()
const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign)
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons)

// const getItemLayout = (data, index) => (
//   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
// );

export const CollapseHeader = (props: Props) => {
  // const tbStyle = useStyleSheet(themedStyles)

  const dispatch = useAppDispatch()
  const { downloadCpt } =
    useAppSelector(historySelector)
  const subscribed = !!useAppSelector(historySelector).subscribeComics.find(
    (path) => path === props.comic?.path
  )

  // Get safe area
  const { top, bottom } = useSafeAreaInsets()

  const { height: screenHeight } = useWindowDimensions()

  const friendsRef = useRef<FlatList>(null)
  const suggestionsRef = useRef<FlatList>(null)

  const [tabIndex, setTabIndex] = useState(0)

  const [headerHeight, setHeaderHeight] = useState(0)
  const defaultHeaderHeight = top + HEADER_HEIGHT

  const headerConfig = useMemo<HeaderConfig>(
    () => ({
      heightCollapsed: defaultHeaderHeight,
      heightExpanded: headerHeight
    }),
    [defaultHeaderHeight, headerHeight]
  )

  const { heightCollapsed, heightExpanded } = headerConfig

  const headerDiff = heightExpanded - heightCollapsed
  const rendered = headerHeight > 0

  const handleHeaderLayout = useCallback<NonNullable<ViewProps['onLayout']>>(
    (event) => setHeaderHeight(event.nativeEvent.layout.height),
    []
  )

  const friendsScrollValue = useSharedValue(0)

  const friendsScrollHandler = useAnimatedScrollHandler(
    (event) => (friendsScrollValue.value = event.contentOffset.y)
  )

  const suggestionsScrollValue = useSharedValue(0)

  const suggestionsScrollHandler = useAnimatedScrollHandler(
    (event) => (suggestionsScrollValue.value = event.contentOffset.y)
  )

  const scrollPairs = useMemo<ScrollPair[]>(
    () => [
      { list: friendsRef, position: friendsScrollValue },
      { list: suggestionsRef, position: suggestionsScrollValue }
    ],
    [friendsRef, friendsScrollValue, suggestionsRef, suggestionsScrollValue]
  )

  const { sync } = useScrollSync(scrollPairs, headerConfig)

  const currentScrollValue = useDerivedValue(
    () =>
      tabIndex === 0 ? friendsScrollValue.value : suggestionsScrollValue.value,
    [tabIndex, friendsScrollValue, suggestionsScrollValue]
  )

  const translateY = useDerivedValue(
    () => -Math.min(currentScrollValue.value, headerDiff)
  )

  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))

  const [a, setA] = React.useState(0)
  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => setA(1))
  }, [])

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: a && translateY.value }],
    opacity: interpolate(
      translateY.value,
      [-headerDiff, 0],
      [Visibility.Hidden, Visibility.Visible]
    )
  }))

  // header icon color transform
  // const backgroundColor = useDerivedValue(() =>
  //   mixColor(translateY.value/headerDiff, "#ff3884", "#38ffb3")
  // );

  const headerIconStyle = useAnimatedStyle(() => {
    console.log(-translateY.value/headerDiff)
    return {
      color: interpolateColor(-translateY.value, [0, headerDiff], ["#fff", "#111"])
    }
  })

  const headerIconStyle2 = useAnimatedStyle(() => {
    return {
      color: interpolateColor(-translateY.value, [0, headerDiff], ["#fff", "#111"])
    }
  })

  const headerIconStyle3 = useAnimatedStyle(() => {
    return {
      color: interpolateColor(-translateY.value, [0, headerDiff], ["#fff", "#111"])
    }
  })

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: rendered ? headerHeight + TAB_BAR_HEIGHT : 0,
      paddingBottom: bottom,
      minHeight: screenHeight + headerDiff
    }),
    [rendered, headerHeight, bottom, screenHeight, headerDiff]
  )

  const sharedProps = useMemo<
    Partial<FlatListProps<resComicDetailChapterItem_T>>
  >(
    () => ({
      contentContainerStyle,
      onMomentumScrollEnd: sync,
      onScrollEndDrag: sync,
      scrollEventThrottle: 16,
      scrollIndicatorInsets: { top: heightExpanded }
    }),
    [contentContainerStyle, sync, heightExpanded]
  )

  const downloadedChapterList = useMemo(() => {
    return props.offline
      ? props.comic?.chapters.filter((item) => !!downloadCpt[item.path])
      : props.comic?.chapters
  }, [props.comic, props.offline])

  // NOTE: Render List
  const renderFriends = useCallback(
    () => (
      <DetailList
        ref={friendsRef}
        // @ts-ignore
        data={props.comic ? [props.comic] : []}
        onScroll={friendsScrollHandler}
        // Performance settings
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={10} // Reduce initial render amount
        maxToRenderPerBatch={5} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        windowSize={10} // Reduce the window size
        {...sharedProps}
      />
    ),
    [friendsRef, friendsScrollHandler, sharedProps]
  )

  const renderSuggestions = useCallback(
    () => (
      <ChapterList
        ref={suggestionsRef}
        data={downloadedChapterList}
        onScroll={suggestionsScrollHandler}
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={10}
        offline={props.offline}
        {...sharedProps}
      //   ListHeaderComponent={() => (
      //     <ListHeader
      //       lastedChapter={props.comic?.chapters[0].name || ""}
      //       sortType="newer"
      //       onSortTypeChange={(type) => null}
      //     />
      //   )}
      />
    ),
    [suggestionsRef, suggestionsScrollHandler, sharedProps]
  )

  const tabBarStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      rendered ? styles.tabBarContainer : undefined,
      { top: rendered ? headerHeight : undefined },
      tabBarAnimatedStyle
    ],
    [rendered, headerHeight, tabBarAnimatedStyle]
  )

  const renderTabBar = useCallback<
    (props: MaterialTopTabBarProps) => React.ReactElement
  >(
    (props) => (
      <Animated.View style={tabBarStyle}>
        <TabBar onIndexChange={setTabIndex} {...props} />
      </Animated.View>
    ),
    [tabBarStyle]
  )

  const headerContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.headerContainer,
      {
        paddingTop: 0
      },
      headerAnimatedStyle
    ],
    [rendered, top, headerAnimatedStyle]
  )

  const collapsedOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [-headerDiff, OVERLAY_VISIBILITY_OFFSET - headerDiff, 0],
      [Visibility.Visible, Visibility.Hidden, Visibility.Hidden]
    )
  }))

  const collapsedOverlayStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.collapsedOverlay,
      collapsedOverlayAnimatedStyle,
      { height: heightCollapsed, paddingTop: top }
    ],
    [collapsedOverlayAnimatedStyle, heightCollapsed, top]
  )

  // NOTE:color
  const { boxStyle: bs1, textStyle: ts1 } = useColorModeStyle(
    'Blue',
    'Secondary'
  )

  return (
    <View style={{
      // marginTop: -28,
      flex: 1
    }}>
      <View style={styles.container}>
        {/* Custom Header Icon */}
        <SafeAreaView
          style={{
            position: 'absolute',
            zIndex: 100,
            // marginTop: 28,
            flexDirection: 'row',
            justifyContent: 'space-between',
            left: 0,
            right: 0,
            height: 72,
            alignItems: 'center',
            marginHorizontal: 4
            // backgroundColor: 'red'
          }}
        >
          <TouchableOpacity onPress={() => goBack()}>
            <AnimatedAntDesign
              name="arrowleft"
              size={34}
              style={ headerIconStyle }
              // color={bs1._text.color as string}
              // color={bs1.backgroundColor}
            />
          </TouchableOpacity>
          <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
            {props.offline ? (
              <Badge variant={'subtle'} colorScheme={'danger'}>
                Offline
              </Badge>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  props.comic &&
                  navigate('select-download-chapter', { comic: props.comic })
                }
              >
                <AnimatedIonicons
                  name="ios-download-outline"
                  size={34}
                  color={bs1.backgroundColor}
                  style={[{ marginRight: 4, marginBottom: 4 }, headerIconStyle2]}
                />
              </TouchableOpacity>
            )}
            <AnimatedAntDesign
              name="menuunfold"
              size={30}
              style={[{ marginTop: 4 }, headerIconStyle3]}
            />
          </View>
        </SafeAreaView>

        <Animated.View
          onLayout={handleHeaderLayout}
          style={headerContainerStyle}
        >
          <Header
            name={props.routeParam?.name || props.comic?.title || ''}
            bio={
              props.comic?.rate ? `Rating: ${props.comic?.rate}` : 'Loading...'
            }
            photo={props.routeParam?.posterUrl || props.comic?.posterUrl || ''}
          />
        </Animated.View>
        <Animated.View style={collapsedOverlayStyle}>
          <HeaderOverlay
            name={props.comic?.title || ''}
            numChapter={props.comic?.chapters?.length || 0}
          />
        </Animated.View>
        <Tab.Navigator
          tabBar={renderTabBar}
          pageMargin={10}
          backBehavior="none"
          screenOptions={{
            tabBarStyle: tbStyle.tabBar,
            tabBarLabelStyle: {},
            tabBarItemStyle: {
              margin: -5,
              justifyContent: 'center',
              alignItems: 'center'
            },
            tabBarPressOpacity: 0.1,
            tabBarIndicatorStyle: {
              backgroundColor: '#f0125cdf',
              // margin: "auto",
              flex: 1,
              height: 38,
              // marginBottom: 1,
              // margin: -100,
              borderWidth: 5,
              borderRadius: 12,
              borderColor: 'transparent'
            },
            tabBarActiveTintColor: 'white',
            tabBarAllowFontScaling: false,
            tabBarInactiveTintColor: 'gray',
            tabBarPressColor: 'transparent'

            // tabBarContentContainerStyle: { backgroundColor: "blue" },
            // tabBarShowLabel: false,
            // tabBarBounces: true,
            // lazy: true,
          }}
        >
          <Tab.Screen name="Friends">{renderFriends}</Tab.Screen>
          <Tab.Screen
            name="Suggestions"
          // component={renderSuggestions}
          // NOTE: Do not use component props like above
          //       It will rerender component when navigate
          //       Use children props will render once
          >
            {renderSuggestions}
          </Tab.Screen>
        </Tab.Navigator>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5
            // height: 64,
            // margin: 0,
            // padding: -10,
            // position: "absolute",
            // bottom: 0,
            // left: 0,
            // right: 0,
            // height: 100,
          }}
        >
          <TouchableOpacity
            style={{ margin: 'auto', alignItems: 'center', marginLeft: 24 }}
            onPress={ToastComingSoon}
          >
            <AntDesign
              name="sharealt"
              size={24}
            />
            <Text style={{ fontSize: 11 }}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (props.comic) dispatch(toggleSubscribeComicThunk(props.comic))
            }}
            style={{
              margin: 'auto',
              alignItems: 'center'
            }}
          >
            <AntDesign
              name="adduser"
              size={24}
            />
            <Text
              style={{ fontSize: 11, color: subscribed ? 'pink' : 'white' }}
            >
              Subscribe
            </Text>
          </TouchableOpacity>
          <Button
            // status={'danger'}
            style={{
              width: 210,
              borderRadius: 100,
              margin: 0,
              padding: 0,
              marginRight: 12
            }}
            onPress={() => {
              const chapter1 =
                props.comic?.chapters[props.comic?.chapters.length - 1]
              chapter1?.path &&
                props.comic?.chapters.length &&
                navigate('chapter', {
                  id: props.comic?.chapters.length - 1,
                  // name: chapter1.name,
                  path: chapter1.path
                })
            }}
          >
            Read now!
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "black",
  },
  tabBarContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1
  },
  overlayName: {
    fontSize: 24
  },
  collapsedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    zIndex: 2
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1
  }
})
