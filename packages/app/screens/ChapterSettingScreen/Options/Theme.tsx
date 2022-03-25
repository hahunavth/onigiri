import { View, Text } from "react-native";
import React from "react";
import { SettingItem } from "../SettingItem";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  chapterActions,
  selectCptSettingTheme
} from "../../../store/chapterSlice";

type Props = {};

export const Theme = (props: Props) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectCptSettingTheme);

  return (
    <SettingItem
      title="Theme"
      options={["default", "dark", "light"]}
      selected={theme === "default" ? 0 : theme === "dark" ? 1 : 2}
      onPress={(str: "default" | "dark" | "light") =>
        dispatch(chapterActions.setTheme(str))
      }
    />
  );
};
