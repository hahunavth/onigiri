import { View, Text } from "react-native";
import React from "react";
import { SettingItem } from "../SettingItem";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import {
  chapterActions,
  selectCptSettingViewMode
} from "app/store/chapterSlice";

type Props = {};

export const ListDirection = (props: Props) => {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector(selectCptSettingViewMode);

  return (
    <SettingItem
      title="Comic View"
      options={["Vertical", "Horizontal"]}
      selected={viewMode === "Horizontal" ? 1 : 0}
      onPress={(str: "Vertical" | "Horizontal") =>
        dispatch(chapterActions.setViewMode(str))
      }
    />
  );
};
