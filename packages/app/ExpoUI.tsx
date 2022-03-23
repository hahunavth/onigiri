/**
 * NOTE: Specific expo
 */

import React from 'react'
import { enableScreens } from 'react-native-screens'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { NavigationContainer } from '@react-navigation/native'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from 'app/store/store'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useColorMode } from 'native-base'
import { StackNav } from 'app/navigators/StackNav'

import {
  Box,
  ColorMode,
  Container,
  extendTheme,
  NativeBaseProvider,
  StorageManager,
  themeTools
} from 'native-base'
import { colors } from 'app/colors'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { mergeNewChapterNotificationThunk } from './store/notificationSlice'
import { settingSelector } from './store/settingSlice'
import { mmkvStorage } from './utils/mmkvStorage'

// REVIEW: CUSTOM APP

// NOTE: CONFIG LG IN NEXT.JS
const config = {
  dependencies: {
    // For Expo projects (Bare or managed workflow)
    'linear-gradient': require('expo-linear-gradient').LinearGradient
    // For non expo projects
    // 'linear-gradient': require('react-native-linear-gradient').default,
  }
}
const theme = extendTheme({
  colors: colors,
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'light'
  },
  fontConfig: {
    Quicksand: {
      300: {
        normal: 'Quicksand_300Light'
      },
      400: {
        normal: 'Quicksand_400Regular'
      },
      500: {
        normal: 'Quicksand_500Medium'
      },
      600: {
        normal: 'Quicksand_600SemiBold'
      },
      700: {
        normal: 'Quicksand_700Bold'
      }
    }
  },
  fonts: { mono: 'Quicksand', Quicksand: 'Quicksand' },
  shadows: {},
  components: {
    Heading: {
      baseStyle: (props: any) => {
        return {
          color: themeTools.mode('red.300', 'blue.300')
        }
      }
    },
    Text: {
      baseStyle: {
        // rounded: 'md',
        fontFamily: 'mono'
      }
    }
  }
})
// 2. Get the type of the CustomTheme
type CustomThemeType = typeof theme
// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

export default function UI() {
  // STUB: background-fetch
  const dispatch = useAppDispatch()
  const { language } = useAppSelector(settingSelector)

  // React.useEffect(() => {}, [language])

  React.useEffect(() => {
    dispatch(mergeNewChapterNotificationThunk())
  }, [])

  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await mmkvStorage.getItem('@my-app-color-mode')
        return val === 'dark' ? 'dark' : 'light'
      } catch (e) {
        console.log(e)
        return 'light'
      }
    },
    set: async (value: ColorMode) => {
      try {
        await mmkvStorage.setItem('@my-app-color-mode', value || 'light')
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <>
      {/* <Container> */}
      <NativeBaseProvider
        config={config}
        theme={theme}
        colorModeManager={colorModeManager}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* <StatusBar style="dark" /> */}
          {/* <StatusBar /> */}
          <ThemedStatusBar />
          <StackNav />
        </GestureHandlerRootView>
      </NativeBaseProvider>
      {/* </Container> */}
      {/* <Navigator>
        <Screen name={'test'} component={() => <Box>fff</Box>} />
      </Navigator> */}
      {/* <Box>aa</Box> */}
    </>
  )
}

function ThemedStatusBar() {
  const theme = useColorMode()
  return <StatusBar style={theme.colorMode === 'dark' ? 'light' : 'dark'} />
}
