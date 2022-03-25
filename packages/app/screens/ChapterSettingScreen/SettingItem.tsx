import { View, Text, Pressable, Button, HStack, Spacer } from "native-base";
import { Dimensions } from "react-native";
import React from "react";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetBackdrop,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import { CustomBackdrop } from "../ChapterScreen/CustomBackdrop";
import { goBack, navigate } from "../../navigators";
import { TextLgP } from "../../components/Typo";
import { TouchableOpacity } from "react-native-gesture-handler";

type SettingItemProps = {
  title: string;
  options: string[];
  selected: number;
  onPress?: (s: any) => any;
};

export const SettingItem = ({
  options,
  title,
  selected,
  onPress
}: SettingItemProps) => {
  return (
    <HStack px={2} mb={4} justifyContent="space-between">
      <TextLgP>{title}</TextLgP>
      <HStack mt={1} space={1}>
        {options.map((opt, id) => {
          return (
            <TouchableOpacity
              onPress={onPress && (() => onPress(opt))}
              key={id}
            >
              <Text
                fontWeight={id === selected ? 700 : 600}
                color={id === selected ? "$light.backgroundActive" : undefined}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </HStack>
    </HStack>
  );
};
