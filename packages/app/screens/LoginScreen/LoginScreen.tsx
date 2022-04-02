import { View, Text, Button, Image } from "native-base";
import React from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Platform, StyleSheet } from "react-native";
import { authActions, authSelector, UserInfo } from "app/store/authSlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { warmUpAsync, coolDownAsync } from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
  // console.log(process.env.STAGE);
  const [accessToken, setAccessToken] = React.useState("");
  // const [userInfo, setUserInfo] = React.useState<UserInfo>();
  const { userInfo, isLogin, loginAt } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const [req, res, promptAsync] = Google.useAuthRequest({
    scopes: ["profile", "email"],
    //#endregion
    expoClientId: __DEV__
      ? process.env.OAUTH_TOKEN_WEB_DEV
      : process.env.OAUTH_TOKEN_WEB_STG,
    // iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId: __DEV__
      ? process.env.OAUTH_TOKEN_AND_DEV
      : process.env.OAUTH_TOKEN_AND_STG
    // webClientId: __DEV__
    //   ? process.env.OAUTH_TOKEN_WEB_DEV
    //   : process.env.OAUTH_TOKEN_WEB_STG
  });

  React.useEffect(() => {
    if (Platform.OS === "android") {
      warmUpAsync();
    }

    return () => {
      if (Platform.OS === "android") {
        coolDownAsync();
      }
    };
  }, []);

  async function getUserData(t?: string) {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken || t}` }
      }
    );

    userInfoResponse.json().then((data) => {
      // setUserInfo(data);
      dispatch(authActions.login(data));
    });
  }

  React.useEffect(() => {
    if (res?.type === "success") {
      // const { authentication } = res;
      if (res.authentication?.accessToken) {
        setAccessToken(res.authentication?.accessToken);
        getUserData(res.authentication.accessToken);
      } else throw new Error("Token not found!");
    }
  }, [res]);

  function showUserInfo() {
    if (userInfo) {
      console.log(userInfo);

      return (
        <View style={styles.userInfo}>
          <Image
            source={{ uri: userInfo.picture }}
            alt={"hello"}
            style={styles.profilePic}
          />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      {isLogin ? (
        <Button onPress={() => dispatch(authActions.logout(null))}>
          Logout
        </Button>
      ) : (
        <Button
          // @ts-ignore
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
      )}
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
