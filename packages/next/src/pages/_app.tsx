import '../styles/global.scss'

import 'raf/polyfill'
// @ts-ignore
global.setImmediate = requestAnimationFrame
import 'setimmediate'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import Head from 'next/head'
import { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import store, { persistor } from 'app/store/store'
import { PersistGate } from 'redux-persist/integration/react'

import {
  ColorMode,
  extendTheme,
  NativeBaseProvider,
  StorageManager,
  themeTools
} from 'native-base'
import { colors } from 'app/colors'

import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from 'app/navigators'
import React, { useEffect, useState } from 'react'
import * as Font from 'expo-font'
import { Text } from 'react-native'

import '../components/Carousel/style.css'

// NOTE: CONFIG LG IN NEXT.JS
const config = {
  dependencies: {
    // For Expo projects (Bare or managed workflow)
    'linear-gradient': require('expo-linear-gradient').LinearGradient
    // For non expo projects
    // 'linear-gradient': require('react-native-linear-gradient').default
  }
}

const theme = extendTheme({
  colors: colors,
  config: {
    initialColorMode: 'light'
  },
  fontConfig: {
    heading: 'Quicksand',
    body: 'Quicksand',
    mono: 'Quicksand'
  },
  components: {
    Heading: {
      baseStyle: (props: any) => {
        return {
          color: themeTools.mode('red.300', 'blue.300')
        }
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

// ANCHOR: NEXT.JS APP COMPONENT
export default function App({ Component, pageProps }: AppProps) {
  //
  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        // @ts-ignore
        let val = await localStorage.getItem('@my-app-color-mode')
        return val === 'dark' ? 'dark' : 'light'
      } catch (e) {
        console.log(e)
        return 'light'
      }
    },
    set: async (value: ColorMode) => {
      try {
        // @ts-ignore
        await localStorage.setItem('@my-app-color-mode', value || 'light')
      } catch (e) {
        console.log(e)
      }
    }
  }

  // const [loaded, setLoaded] = useState(false)

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       await Font.loadAsync({
  //         // You can get this font on GitHub: https://shorturl.at/chEHS
  //         Quicksand_regular: require('../../assets/Quicksand-Regular.ttf')
  //       })
  //     } catch ({ message }) {
  //       // This will be called if something is broken
  //       console.log(`Error loading font: ${message}`)
  //     } finally {
  //       setLoaded(true)
  //     }
  //   })()
  // }, [])

  // if (!loaded) return <Text>Loading fonts...</Text>

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider
            config={config}
            theme={theme}
            colorModeManager={colorModeManager}
          >
            {/* NOTE: USE TOP TAB NAVIGATOR  IN COMIC DETAIL SCREEN */}
            {/* WORKING */}
            <NavigationContainer ref={navigationRef}>
              <SafeAreaProvider>
                {/* <DripsyProvider theme={theme}> */}
                <Component {...pageProps} />
                {/* </DripsyProvider> */}
              </SafeAreaProvider>
            </NavigationContainer>
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </>
  )
}
