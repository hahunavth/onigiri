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

  return (
    <>
      <Head>
        <title>Example</title>
        <meta key="title" name="title" content="Example" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
      </Head>
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
