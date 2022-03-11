const { withEntry } = require('@expo/webpack-config/addons')
const createExpoWebpackConfigAsync = require('@expo/webpack-config')

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        // dangerouslyAddModulePathsToTranspile: ['native-base']
      }
    },
    argv
  )
  // If you want to add a new alias to the config.
  // config.resolve.alias["moduleA"] = "moduleB"

  // remote redux dev tool
  // new webpack.DefinePlugin({
  //   "process.env.NODE_ENV": JSON.stringify("development"),
  // });
  //

  // Maybe you want to turn off compression in dev mode.
  if (config.mode === 'development') {
    config.devServer.compress = false
  }

  // NOTE: RN REANIMATED 2
  // config.entry = ["babel-polyfill", "./index.js"];
  // config.plugins = [new webpack.DefinePlugin({ process: { env: {} } })];
  // config.entry = ["babel-polyfill", ...config.entry];

  const entry = withEntry(config, env, { entryPath: 'babel-polyfill' })

  // console.log(config.plugins);

  // Or prevent minimizing the bundle when you build.
  // if (config.mode === "production") {
  //   config.optimization.minimize = false
  // }

  // Finally return the new config for the CLI to use.
  return config
}

// const createExpoWebpackConfigAsync = require('@expo/webpack-config')
// const path = require('path')

// module.exports = async function (env, argv) {
//   const config = await createExpoWebpackConfigAsync(env, argv)
//   config.module.rules.forEach((r) => {
//     if (r.oneOf) {
//       r.oneOf.forEach((o) => {
//         if (o.use && o.use.loader && o.use.loader.includes('babel-loader')) {
//           o.include = [path.resolve('.')]
//         }
//       })
//     }
//   })
//   return config
// }
