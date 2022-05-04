import React from "react";
// import { CollapseHeader } from "app/components/CollapseHeader";
import MemoCollapseHeader from "app/components/CollapseHeader/CollapseHeader";
import { ComicDetailScreenProps } from "app/navigators/StackNav";
import { useApiComicDetail } from "app/store/api";
import useUpdateCurrentComic from "app/hooks/useUpdateCurrentComic";
// import usePrevious from "react-use/esm/usePrevious";
import { useAppDispatch } from "app/store/hooks";
import { notificationAction } from "app/store/notificationSlice";
import * as Sentry from "sentry-expo";

export const ComicDetailScreen = (props: ComicDetailScreenProps) => {
  // REVIEW: CAN CAUSE WEB ERROR
  Sentry.Native.useProfiler("ComicDetailScreen");

  const { path, preloadItem } = props.route.params;
  const { data } = useApiComicDetail(path || "", {});
  // const prev = usePrevious(props.route)
  // console.log('ComicDetailScreen', prev === props.route)

  // NOTE: REMOVE NOTIFICATION WHEN VIEW COMIC DETAIL
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(notificationAction.removeNewChapterNotification(path));
  }, []);

  const { loading } = useUpdateCurrentComic(data);

  return (
    <>
      <MemoCollapseHeader comic={data} routeParam={preloadItem} />
    </>
  );
};
