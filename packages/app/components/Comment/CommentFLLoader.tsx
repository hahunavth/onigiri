import { View, Text } from "react-native";
import React from "react";
import { Comment } from "./Comment";
import { useApiComicComment } from "../../store/api";
import { Loading } from "../EmptyPage/Loading";
import useInteraction from "../../hooks/useInteraction";
import { CommentFL } from "./CommentFL";

type Props = { path?: string };

export const CommentFLLoader = React.memo((props: Props) => {
  const { data, isSuccess } = useApiComicComment(props.path || "");
  // console.log(props.path, data, isSuccess);
  const { loading } = useInteraction();
  console.log(isSuccess);

  if (isSuccess) return <>{!loading && <CommentFL data={data} />}</>;
  else return null;

  // return <>{data && isSuccess ? <CommentFL data={data} /> : <Loading />}</>;
});
