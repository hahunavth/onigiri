// the dotenv/config will read your .env file
// and merge it with process.env data
// This is just for the builds that happen outside of eas
import "dotenv/config";

/**
 * STUB: .env not work in eas build
 */
process.env.MMKV = "true";
process.env.FAST_IMAGE = "true";

// the secrets created with eas secret:create will
// be merged with process.env during eas builds
const SENTRY_DSN = process.env.SENTRY_DSN;
const STAGE = process.env.STAGE;
const SCHEME = process.env.SCHEME ?? "com.hahunavth.onigiri";
const plugins = ["sentry-expo", "expo-community-flipper", "expo-ads-admob"];
// NOTE: WHEN BUILD DEV CLIENT, WE ALSO NEED THIS PLUGIN
process.env.MMKV !== "false" && plugins.push("./react-native-mmkv-plugin.js");
console.log(plugins);
console.log(process.env.MMKV);
console.log(process.env.SCHEME);

const envConfig = {
  development: {
    scheme: `${SCHEME}.development`,
    icon: "./assets/icon.dark.png",
    image: "./assets/splash.dark.png",
    name: "Onigiri - dev"
    // backgroundColor: '#FF0000'
  },
  staging: {
    scheme: `${SCHEME}.staging`,
    icon: "./assets/icon.yellow.png",
    image: "./assets/splash.yellow.png",
    name: "Onigiri - staging"

    // backgroundColor: '#8000FF'
  },
  production: {
    scheme: `${SCHEME}`,
    icon: "./assets/icon.png",
    image: "./assets/splash.png",
    name: "Onigiri"
    // backgroundColor: '#1610FF'
  }
};

const config = envConfig[STAGE ?? "development"];

export default {
  name: config.name,
  description: "Onigiri- Comic reader",
  slug: "onigiri",
  scheme: "onigiri",
  owner: "hahunavth",
  icon: config.icon,
  version: "0.0.2",
  // NOTE: eas update
  runtimeVersion: "0.0.2",
  splash: {
    image: config.image,
    resizeMode: "cover",
    backgroundColor: "#000000"
  },
  ios: {
    bundleIdentifier: config.scheme,
    supportsTablet: true,
    jsEngine: "hermes"
  },
  android: {
    package: config.scheme,
    versionCode: 1,
    // adaptiveIcon: {
    // foregroundImage: './assets/adaptive-icon.png'
    //   // backgroundColor: config.backgroundColor
    // },
    jsEngine: "hermes",
    config: {
      googleMobileAdsAppId: "ca-app-pub-1646154512233519~1161794425" //
    }
  },
  androidNavigationBar: {
    barStyle: "dark-content",
    backgroundColor: "#FFFFFF"
  },
  assetBundlePatterns: ["**/*"],
  // orientation: 'portrait',
  updates: {
    fallbackToCacheTimeout: 0,
    // NOTE: eas update ( Not work with expo publish )
    url: "https://u.expo.dev/11ff3e77-ae95-4a1e-8869-cf81503a9b5e"
  },
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: "aseryo",
          project: "onigiri",
          authToken:
            "5a61ecb37707446193e7a36cdb735bef8a36776c0fac48d990b1c0c55bca311a"
        }
      }
    ]
  },
  extra: {
    STAGE: process.env.STAGE,
    SENTRY_DSN: SENTRY_DSN,
    ANDROID_ADMOD_BANNER_TEST: process.env.ANDROID_ADMOD_BANNER_TEST,
    ANDROID_ADMOD_INTERSTITIAL_TEST:
      process.env.ANDROID_ADMOD_INTERSTITIAL_TEST,
    ANDROID_ADMOD_BANNER: process.env.ANDROID_ADMOD_BANNER,
    ANDROID_ADMOD_INTERSTITIAL: process.env.ANDROID_ADMOD_INTERSTITIAL,
    MMKV: process.env.MMKV,
    FAST_IMAGE: process.env.FAST_IMAGE === "true"
  },
  plugins: plugins,
  // NOTE: RN WEB
  packagerOpts: {
    sourceExts: ["js", "json", "ts", "tsx", "jsx", "vue"],
    config: "metro.config.js"
  },
  // NOTE: ASSETS CATCHING
  assetBundlePatterns: ["../app/assets/*"]
};
