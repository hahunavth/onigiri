import React, { useCallback, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import store from "app/store/store";
import { mergeNewChapterNotificationThunk } from "app/store/notificationSlice";

/**
 * useAppState
 *
 *  - Check app state
 *  - If state background -> active : merge notification
 * @returns appState
 */
export default function useAppState() {
  // NOTE: APP STATE ON ACTIVE DISPATCH ACTION
  const appState = React.useRef(AppState.currentState);
  // NOTE: CAUSE CRASH WHEN RELOAD #2
  // const [appStateVisible, setAppStateVisible] = React.useState(
  //   appState.current
  // );

  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      store.dispatch(mergeNewChapterNotificationThunk());
    }
    appState.current = nextAppState;
    console.log("AppState", appState.current);
  }, []);

  useEffect(() => {
    const emit = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      // FIXME: SOMETIME emit got undefined
      emit?.remove();
      // AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  return {
    appState
  };
}
