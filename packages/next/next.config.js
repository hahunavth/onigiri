const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const withImages = require('next-images')
const withFonts = require('next-fonts')
const withTM = require('next-transpile-modules')([
  'app',
  '@gorhom/bottom-sheet',
  '@gorhom/portal',
  // 'dripsy',
  // '@dripsy/core',
  'react-native-swiper-flatlist',
  'react-native-web',
  'react-native-svg',
  'native-base',
  'expo-next-react-navigation',
  'moti',
  '@motify/core',
  '@motify/components',
  '@motify/interactions',
  'react-native-reanimated',
  'react-use'
  // FIXME: ERROR WHEN RUN BUILD BY THIS LIB
  // 'react-native-element-dropdown'
])

const nextConfig = {
  distDir: 'build',
  images: {
    disableStaticImages: true,
    domains: ['st.nettruyengo.com', 'example2.com']
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  }
}

module.exports = withPlugins(
  [
    withTM,
    withBundleAnalyzer,
    withFonts,
    withImages,
    [withExpo, { projectRoot: __dirname + '/../..' }]
  ],
  nextConfig
)
