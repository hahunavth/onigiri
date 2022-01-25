import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, InteractionManager } from "react-native";
import {
  Button,
  Card,
  Divider,
  Layout,
  List,
  StyleService,
  Text,
  Toggle,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import CommingSoon from "@/components/Common/CommingSoon";
import ErrorView from "@/components/Common/ErrorView";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { settingAction, settingSelector } from "@/app/settingSlice";
import QuicksandText from "@/components/Common/QuicksandText";
import { navigate } from "@/navigators";
import FadeInView from "@/components/Common/FadeInView";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigatorHeader from "@/components/Common/NavigatorHeader";

// ListCustomItemShowcase
export function SettingScreen() {
  const styles = useStyleSheet(themeStyled);

  const dispatch = useAppDispatch();
  const setting = useAppSelector(settingSelector);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => setIsReady(true));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container} level="4">
        <NavigatorHeader
          title="Setting"
          headerContainerStyle={{ position: "relative", paddingTop: -40 }}
        />
        {isReady ? (
          <>
            <FadeInView>
              <Layout style={styles.settingItem} level={"2"}>
                <QuicksandText numberOfLines={1} style={styles.title}>
                  Dark theme
                </QuicksandText>
                <Toggle
                  checked={setting.theme === "light"}
                  onChange={() => dispatch(settingAction.switchTheme())}
                ></Toggle>
              </Layout>
              <Divider />
            </FadeInView>
          </>
        ) : null}
        {/* <Button onPress={() => navigate("Test")}>
        <Text>Hello</Text>
      </Button>
      <Button onPress={() => navigate("Test2")}>
        <Text>Hello2</Text>
      </Button> */}
      </Layout>
    </SafeAreaView>
  );
}

const themeStyled = StyleService.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 8,
    paddingHorizontal: 12,
    alignItem: "center",
    height: 48,
  },
});
