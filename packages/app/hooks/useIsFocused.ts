import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { InteractionManager } from "react-native";

export const useIsFocused = (callback?: () => any, cleanUp?: () => any) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [callbackResult, setCallbackResult] = React.useState(null);
  const [cleanUpResult, setCleanUpResult] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const interaction = InteractionManager.runAfterInteractions(() => {
        callback && setCallbackResult(callback());
        setIsFocused(true);
      });
      return () => {
        setIsFocused(false);
        cleanUp && setCleanUpResult(cleanUp());
        interaction.cancel();
      };
    }, [])
  );

  // console.log("useIsFocused: ", isFocused);

  return {
    isFocused,
    callbackResult,
    cleanUpResult
  };
};
