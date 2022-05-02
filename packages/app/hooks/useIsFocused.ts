import React from "react";
import { useFocusEffect } from "@react-navigation/native";

export const useIsFocused = (callback?: () => any, cleanUp?: () => any) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [callbackResult, setCallbackResult] = React.useState(null);
  const [cleanUpResult, setCleanUpResult] = React.useState(null);

  useFocusEffect(() => {
    setIsFocused(true);
    callback && setCallbackResult(callback());
    return () => {
      setIsFocused(false);
      cleanUp && setCleanUpResult(cleanUp());
    };
  });

  console.log("useIsFocused: ", isFocused);

  return {
    isFocused,
    callbackResult,
    cleanUpResult
  };
};
