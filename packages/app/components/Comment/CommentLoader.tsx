import { View, Text } from "react-native";
import React from "react";
import { Comment } from "./Comment";
import { useApiComicComment } from "app/store/api";
import { Loading } from "../EmptyPage/Loading";
import useInteraction from "app/hooks/useInteraction";

type Props = { path?: string };

export const CommentLoader = React.memo((props: Props) => {
  const { data } = useApiComicComment(props.path || "");

  const { loading } = useInteraction();

  return <>{data && !loading ? <Comment data={data} /> : <Loading />}</>;
});
