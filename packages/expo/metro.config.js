// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config')}
 */
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Monorepo
const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, "../..");

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPath = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules")
];

// yarn v2
config.resolver.extraNodeModules = new Proxy(
  {},
  {
    get: (target, name) => path.join(__dirname, `node_modules/${name}`)
  }
);

config.transformer = {
  ...config.transformer,
  minifierPath: require.resolve("metro-minify-esbuild"),
  minifierConfig: {}
};

module.exports = config;
