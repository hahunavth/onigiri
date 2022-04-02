import React from "react";
import { OfflineComicScreenProps } from "app/navigators/StackNav";
import { useAppSelector } from "app/store/hooks";
import { historySelector } from "app/store/historySlice";
import useUpdateCurrentComic from "app/hooks/useUpdateCurrentComic";
import MemoCollapseHeader from "app/components/CollapseHeader/CollapseHeader";

export const OfflineComicScreen = (props: OfflineComicScreenProps) => {
  const { path } = props.route.params;
  const { comics, downloadComics } = useAppSelector(historySelector);

  const {} = useUpdateCurrentComic(comics[path]);
  console.log("OfflineComicScreen");

  return <MemoCollapseHeader comic={comics[path]} offline={true} />;
};
