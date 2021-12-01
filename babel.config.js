module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: "./",
          alias: {
            "@/assets": "./src/assets",
            "@/components": "./src/components",
            "@/navigator": "./src/navigator",
            "@/screens": "./src/screens",
            "@/styles": "./src/styles",
            "@/types": "./src/types",
            "@/utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
