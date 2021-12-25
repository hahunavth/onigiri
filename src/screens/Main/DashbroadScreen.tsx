import React from "react";
import { Button, StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import QuicksandText, { QFontFamily } from "@/components/Common/QuicksandText";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { fetchRecentlyAsync, selectHome } from "../../app/homeSlice";
import { useApiRecently } from "../../app/api";
import ErrorView from "@/components/Common/ErrorView";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import SessionHeader from "@/components/Common/SessionHeader";

export const DashboardScreen = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <Layout>
        <QuicksandText
          style={{
            fontSize: 16,
            fontFamily: QFontFamily.Quicksand_600SemiBold,
            backgroundColor: "#ddd",
            padding: 3,
          }}
        >
          Chapter Numbers
        </QuicksandText>
        {}
      </Layout>
    </Layout>
  );
};
