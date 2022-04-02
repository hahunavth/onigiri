import HomeSessionDetailList from "app/components/HomeSessionDetailList";
import React from "react";
import { HomeSessionDetailListScreenProps } from "app/navigators/StackNav";

export const HomeSessionDetailListScreen = (
  props: HomeSessionDetailListScreenProps
) => {
  const { type } = props.route.params;
  return <HomeSessionDetailList type={type} />;
};
