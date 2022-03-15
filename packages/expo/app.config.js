const STAGE = process.env.STAGE
const SCHEME = process.env.SCHEME ?? 'com.hahunavth'

const envConfig = {
  development: {
    scheme: `${SCHEME}.development`,
    icon: './assets/icon.dark.png',
    image: './assets/splash.dark.png',
    name: 'Onigiri - dev'
    // backgroundColor: '#FF0000'
  },
  staging: {
    scheme: `${SCHEME}.staging`,
    icon: './assets/icon.yellow.png',
    image: './assets/splash.yellow.png',
    name: 'Onigiri - staging'

    // backgroundColor: '#8000FF'
  },
  production: {
    scheme: SCHEME,
    icon: './assets/icon.png',
    image: './assets/splash.png',
    name: 'Onigiri'
    // backgroundColor: '#1610FF'
  }
}

const config = envConfig[STAGE ?? 'development']

export default {
  name: config.name,
  description: 'Onigiri- Comic reader',
  slug: 'onigiri',
  scheme: 'onigiri',
  owner: 'hahunavth',
  icon: config.icon,
  version: '0.0.1',
  splash: {
    image: config.image,
    resizeMode: 'cover',
    backgroundColor: '#000000'
  },
  ios: {
    bundleIdentifier: config.scheme,
    supportsTablet: true,
    jsEngine: 'hermes'
  },
  android: {
    package: config.scheme,
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png'
      //   // backgroundColor: config.backgroundColor
    },
    jsEngine: 'hermes'
  },
  androidNavigationBar: {
    barStyle: 'dark-content',
    backgroundColor: '#FFFFFF'
  },
  assetBundlePatterns: ['**/*'],
  // orientation: 'portrait',
  updates: {
    fallbackToCacheTimeout: 0
  },
  // hooks: {
  //   postPublish: [
  //     {
  //       file: 'sentry-expo/upload-sourcemaps',
  //       config: {}
  //     }
  //   ]
  // },
  extra: {
    STAGE: process.env.STAGE
  },
  // plugins: ['sentry-expo']
  // NOTE: RN WEB
  packagerOpts: {
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx', 'vue'],
    config: 'metro.config.js'
  }
}
