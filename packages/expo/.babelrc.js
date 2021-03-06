module.exports = function (api) {
  api.cache(true)

  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      'react-native-reanimated/plugin',
      // NOTE: LOAD FROM APP CONFIG
      // 'transform-inline-environment-variables'
      'inline-dotenv'
      // NOT WORK
      // ['transform-remove-console']
      // 'transform-remove-console'
      // parcel
      // '@parcel/babel-plugin-transform-runtime',
      // '@babel/helper-environment-visitor'
    ],
    env: {
      production: {
        plugins: ['transform-remove-console']
      },
      staging: {
        plugins: ['transform-remove-console']
      }
    }
  }
}
