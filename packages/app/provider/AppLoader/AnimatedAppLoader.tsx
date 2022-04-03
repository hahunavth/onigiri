import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Platform,
  BackHandler,
  Alert,
  LogBox,
  UIManager,
  AppState,
  AppStateStatus,
  useWindowDimensions,
  ActivityIndicator,
  Animated,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";

// NOTE: SPLASH
// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

type AnimatedAppLoaderProps = {
  children: React.ReactNode;
  isSplashReady: boolean;
  startAsync: () => any;
  onFinish: () => any;
};

export function AnimatedAppLoader({
  children,
  isSplashReady,
  startAsync,
  onFinish
}: AnimatedAppLoaderProps) {
  if (!isSplashReady) {
    return (
      <AppLoading
        // Instruct SplashScreen not to hide yet, we want to do this manually
        autoHideSplash={false}
        startAsync={startAsync}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  return (
    <AnimatedSplashScreen
      image={require("@hahunavth-packages/expo/assets/splash.yellow.png")}
    >
      {children}
    </AnimatedSplashScreen>
  );
}

function AnimatedSplashScreen({ children, image }: any) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        delay: 3000,
        useNativeDriver: true
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "white",
              opacity: animation
            }
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              transform: [
                {
                  scale: animation
                }
              ]
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
          <AnimatedSplashText />
        </Animated.View>
      )}
    </View>
  );
}

function AnimatedSplashText() {
  const animation = useMemo(() => new Animated.Value(0), []);
  const { height, width } = useWindowDimensions();

  const trans = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0]
  });
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      delay: 500,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: animation,
        transform: [{ translateY: trans }],
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width,
        height: 100,
        bottom: 100,
        flexDirection: "row"
      }}
    >
      <ActivityIndicator
        color={"#8d6868"}
        style={{ marginTop: 2, marginRight: 8, marginLeft: -20 }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          textAlign: "center"
        }}
      >
        Onigiri
      </Text>
    </Animated.View>
  );
}
