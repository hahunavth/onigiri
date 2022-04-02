import { ViewStyle } from "react-native";
import { resCommentT, resCommentReplyT, ApiResponse_T } from "app/types/api";

export type CommentProps = {
  data: Partial<ApiResponse_T<resCommentT[]>>;
};

export type MessageBlockProps = {
  message: resCommentT;
};

export type MessageProps = {
  message: Partial<resCommentT>;
  like?: boolean;
  comment?: boolean;
  style?: ViewStyle;
};

export type MessageReplyProps = {
  message: resCommentReplyT;
};

export type MessageInputProps = {};

export type CommentBottomSheetProps = {
  path: string; // comic path
};
