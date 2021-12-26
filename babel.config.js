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
            "@/app": "./src/app",
            "@/assets": "./src/assets",
            "@/components": "./src/components",
            "@/navigators": "./src/navigators",
            "@/screens": "./src/screens",
            "@/styles": "./src/styles",
            "@/types": "./src/types",
            "@/utils": "./src/utils",
            // "@/": "./src/",
          },
        },
      ],
    ],
  };
};
