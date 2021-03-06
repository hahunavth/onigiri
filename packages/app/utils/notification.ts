/**
 * NOTE: SPECIFIC NATIVE
 *
 * NOTE: FOR IOS WE NEED EXPO-PERMISSION
 *
 */
import * as Notifications from "expo-notifications";

export const triggerNotifications = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Youâve got mail! ð¬",
      body: "Here is the notification body",
      data: { data: "goes here" },
      vibrate: [1, 0, 10],
      // sticky: true
      autoDismiss: true
    },
    trigger: { seconds: 2 }
  });
};

export const triggerBackgroundFetchNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "ð¬ð¬ð¬ð¬ð¬ - BackgroundFetch",
      body: "Task is runing",
      data: { data: "goes here" },
      vibrate: [1, 0, 10],
      // sticky: true
      autoDismiss: true
    },
    trigger: { seconds: 2 }
  });
};

export { Notifications };

// Notifications.setNotificationChannelAsync('default', {
//   name: 'default',
//   importance: Notifications.AndroidImportance.MAX,
//   vibrationPattern: [0, 250, 250, 250],
//   lightColor: '#FF231F7C'
// })

// NOTE: SETUP NOTIFICATION
Notifications.setNotificationHandler({
  handleNotification: async (n) => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true
    };
  }
});
