import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync
} from "expo-ads-admob";

import { Platform, Alert } from "react-native";
import { View } from "native-base";
import React from "react";

type Props = {
  size: "mediumRectangle" | "largeBanner";
};

export const MediumBanner = (props: Props) => {
  return (
    <View
      py={props.size === "largeBanner" ? 2 : 32}
      // bg={"black"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {Platform.OS !== "web" && (
        <AdMobBanner
          // style={{ height: 100, backgroundColor: 'gray' }}
          //   bannerSize="smartBannerLandscape"
          bannerSize={props.size}
          // adUnitID={
          //   process.env.ANDROID_ADMOD_BANNER ||
          //   process.env.ANDROID_ADMOD_BANNER_TEST
          // }
          adUnitID={"ca-app-pub-3940256099942544/6300978111"}
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(e) =>
            __DEV__ &&
            Alert.alert("ca-app-pub-1646154512233519/3404814383", e, [
              { text: "OK", onPress: (e) => console.log(e) }
            ])
          }
        />
      )}
    </View>
  );
};
