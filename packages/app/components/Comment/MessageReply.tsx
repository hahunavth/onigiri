import { View, Text } from "native-base";
import React from "react";
import { Message } from "./Message";
import { MessageReplyProps } from "./types";

export const MessageReply = (props: MessageReplyProps) => {
  const { abbr, content, datednf, id, username, avatarUrl } = props.message;

  return (
    <Message
      message={{
        abbr,
        content,
        datednf,
        id,
        username,
        avatarUrl
      }}
      style={{ marginLeft: 50 }}
    />
  );
};
