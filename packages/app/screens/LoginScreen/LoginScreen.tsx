import { View, Text, Button, Image } from "native-base";
import React from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet } from "react-native";

type Props = {};

WebBrowser.maybeCompleteAuthSession();

const CLIENTID =
  "30060461713-lfr5t51vnh6vb08a89sj52s2rmsq4rp0.apps.googleusercontent.com";

export const LoginScreen = (props: Props) => {
  const [accessToken, setAccessToken] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({});

  const [req, res, promptAsync] = Google.useAuthRequest({
    expoClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId: CLIENTID,
    webClientId:
      "30060461713-n4h7b7dnj6jsu43gkcb69cr95e29a0kh.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    if (res?.type === "success") {
      const { authentication } = res;
      setAccessToken(res.authentication?.accessToken);
    }
  }, [res]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <Button
        onPress={
          accessToken
            ? getUserData
            : () => {
                promptAsync({ useProxy: false, showInRecents: true });
              }
        }
      >
        {accessToken ? "Get User Data" : "Login"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center"
  },
  profilePic: {
    width: 50,
    height: 50
  }
});
