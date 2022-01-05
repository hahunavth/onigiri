import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import { useAppDispatch, useAppSelector } from "./hooks";
import { Subscription } from "expo-modules-core";
import {
  AndroidImportance,
  AndroidNotificationVisibility,
  NotificationChannel,
  NotificationChannelInput,
} from "expo-notifications";
import { addMultipleImgs } from "@/utils/Download/ImgManager";
import { resChapterDetail_T, resComicDetail_T } from "@/types/api";
import { downloadAction } from "./downloadSlice";

// ANCHOR: Notification setup
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const channelId = "DownloadComic";

// hook
export function useNotification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    if (Platform.OS !== "ios" && Platform.OS !== "android") {
      registerForPushNotificationsAsync().then((token) => {
        if (token) setExpoPushToken(token);
        else
          console.log(
            "🚀🚀🚀 ~ file: App.tsx ~ line 100 ~ registerForPushNotificationsAsync ~ token !!!FAIL",
            token
          );
      });

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          if (notification) setNotification(notification);
          else
            console.log(
              "🚀 ~ file: App.tsx ~ line 110 ~ Notifications.addNotificationReceivedListener ~ notification",
              notification
            );
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });
    }
    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return {
    expoPushToken,
    notification,
  };
}

// one time notification
export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 10 },
  });
}

// TODO: Continue
export async function scheduleCustomNotification(info: Notifications.NotificationRequestInput) {
  await Notifications.scheduleNotificationAsync(info);
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // alert("Failed to get push token for push notification!");
      console.log("Failed to get push token for push notification");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    // alert("Must use physical device for Push Notifications");
    console.log("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export function useDownloadComic() {
  const [uriList, setUriList] = useState<string[]>();
  const [comic, setComic] = useState<resComicDetail_T>();
  const [chapter, setChapter] = useState<resChapterDetail_T>();

  const [downloadProgress, setDownloadProgress] = useState(0);

  const dispatch = useAppDispatch();

  async function setNotificationChannel() {
    const loadingChannel: NotificationChannel | null =
      await Notifications.getNotificationChannelAsync(channelId);

    // if we didn't find a notification channel set how we like it, then we create one
    if (loadingChannel == null) {
      const channelOptions: NotificationChannelInput = {
        name: channelId,
        importance: AndroidImportance.HIGH,
        lockscreenVisibility: AndroidNotificationVisibility.PUBLIC,
        sound: "default",
        vibrationPattern: [250],
        enableVibrate: true,
      };
      await Notifications.setNotificationChannelAsync(
        channelId,
        channelOptions
      );
    }
  }

  useEffect(() => {
    setNotificationChannel();
  });

  const callback = (downloadProgress: any) => {
    const progress: number =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  async function run() {
    if (uriList) {
      const savedImgs = await addMultipleImgs(uriList);
      console.log("🚀 ~ file: notification.ts ~ line 180 ~ run ~ savedImgs", uriList)
      if (chapter && savedImgs)
        dispatch(
          downloadAction.saveChapter({
            chapter,
            fileUrls: savedImgs,
          })
        );
      console.log("updated");
      setUriList([]);
      setComic(undefined);
      setChapter(undefined);
    }
  }

  return {
    uriList,
    setUriList,
    setComic,
    setChapter,
    run,
  };
}
