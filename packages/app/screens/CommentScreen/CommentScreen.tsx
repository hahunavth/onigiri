import React from "react";
import { CommentBottomSheet } from "app/components/Comment/CommentBottomSheet";
import { View, Pressable } from "native-base";
import { goBack } from "../../navigators";
import { CommentScreenProps } from "../../navigators/StackNav";

export const CommentScreen = (props: CommentScreenProps) => {
  const { path } = props.route.params;
  return (
    <View bg={"#0000001c"} flex={1}>
      <Pressable flex={1} onPress={() => goBack()}></Pressable>
      <CommentBottomSheet path={path} />
    </View>
  );
};
