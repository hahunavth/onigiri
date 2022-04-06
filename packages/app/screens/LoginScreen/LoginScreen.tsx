import { View, Text, Button, Image, VStack, HStack, Box } from "native-base";
import React from "react";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import { Platform, StyleSheet } from "react-native";
import { authActions, authSelector, UserInfo } from "app/store/authSlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { warmUpAsync, coolDownAsync } from "expo-web-browser";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TextMdP, TextSmI } from "../../components/Typo";
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInDown
} from "react-native-reanimated";

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
  // console.log(process.env.STAGE);
  const [accessToken, setAccessToken] = React.useState("");
  // const [userInfo, setUserInfo] = React.useState<UserInfo>();
  const { userInfo, isLogin, loginAt } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const [freq, fres, fpromptAsync] = Facebook.useAuthRequest({
    expoClientId: "536659734721926",
    clientId: "536659734721926",
    responseType: ResponseType.Token
    // redirectUri: "https://auth.expo.io/@hahunavth/onigiri"
  });

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

  // if (freq) {
  //   console.log(
  //     "You need to add this url to your authorized redirect urls on your Facebook app: " +
  //       freq.redirectUri
  //   );
  // }

  React.useEffect(() => {
    if (fres && fres.type === "success" && fres.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${fres?.authentication?.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        // setUser(userInfo);
        console.log(
          "🚀 ~ file: LoginScreen.tsx ~ line 59 ~ userInfo",
          userInfo
        );
        dispatch(authActions.login(userInfo));
      })();
    }
  }, [fres]);

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

  const handlePressAsync = async () => {
    const result = await fpromptAsync({ useProxy: false, showInRecents: true });
    console.log(
      "🚀 ~ file: LoginScreen.tsx ~ line 82 ~ handlePressAsync ~ result",
      result
    );
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }
  };

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
      // console.log(userInfo);

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
    <VStack flex={1}>
      <Box
        h={"2/5"}
        bg="$light.backgroundSecondary"
        justifyContent={"center"}
        alignItems={"center"}
        borderBottomRadius={24}
        // shadow={"1"}
        // zIndex={1}
      >
        <Image
          source={require("@onigiri/expo/assets/favicon.png")}
          w={75}
          h={75}
          mb={50}
          alt={"logo"}
        />
      </Box>

      <Animated.View
        style={styles.container}
        entering={SlideInDown.springify()}
      >
        {/* <View
        // style={styles.container}
        > */}
        <View
          // bg={"red"}
          style={{ backgroundColor: "white" }}
          m={5}
          px={12}
          h={"1/2"}
          borderRadius={12}
          justifyContent={"center"}
          alignItems={"center"}
          shadow={"1"}
          // zIndex={100}
        >
          <TextMdP mb={8}>Welcome to Onigiri</TextMdP>
          <TextSmI mb={8} textAlign={"center"}>
            Discover amazing think near around you
          </TextSmI>
          {showUserInfo()}
          {isLogin ? (
            <Button onPress={() => dispatch(authActions.logout(null))}>
              Logout
            </Button>
          ) : (
            <VStack space={2}>
              <Button
                onPress={handlePressAsync}
                disabled={!freq}
                colorScheme={"blue"}
                w={220}
              >
                <HStack space={2}>
                  <Entypo name="facebook" size={24} color="white" />
                  <Text color={"white"}>Login with Facebook</Text>
                </HStack>
              </Button>
              <Button
                // @ts-ignore
                onPress={
                  accessToken
                    ? getUserData
                    : () => {
                        promptAsync({ useProxy: false, showInRecents: true });
                      }
                }
                w={220}
                colorScheme={"red"}
              >
                {/* {accessToken ? "Get User Data" : "Login with Google"} */}
                <HStack space={2}>
                  <AntDesign name="google" size={24} color="white" />
                  <Text color={"white"}>Login with Facebook</Text>
                </HStack>
              </Button>
            </VStack>
          )}
          {/* </View> */}
        </View>
      </Animated.View>
    </VStack>
  );

  return (
    <View style={styles.container}>
      {showUserInfo()}
      {isLogin ? (
        <Button onPress={() => dispatch(authActions.logout(null))}>
          Logout
        </Button>
      ) : (
        <VStack space={2}>
          <Button
            onPress={handlePressAsync}
            disabled={!freq}
            colorScheme={"blue"}
            w={220}
          >
            <HStack space={2}>
              <Entypo name="facebook" size={24} color="white" />
              <Text color={"white"}>Login with Facebook</Text>
            </HStack>
          </Button>
          <Button
            // @ts-ignore
            onPress={
              accessToken
                ? getUserData
                : () => {
                    promptAsync({ useProxy: false, showInRecents: true });
                  }
            }
            w={220}
            colorScheme={"red"}
          >
            {/* {accessToken ? "Get User Data" : "Login with Google"} */}
            <HStack space={2}>
              <AntDesign name="google" size={24} color="white" />
              <Text color={"white"}>Login with Facebook</Text>
            </HStack>
          </Button>
        </VStack>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
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
