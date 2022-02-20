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
])

const nextConfig = {
  distDir: 'build'
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
