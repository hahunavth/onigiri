import { Alert } from "react-native";

type Props = {
  title: string;
  message: string;
  onCancel: () => void;
  onOk: () => void;
};

export const createTwoButtonAlert = (props: Props) => {
  return Alert.alert(props.title, props.message, [
    {
      text: "Cancel",
      onPress: props.onCancel,
      style: "cancel"
    },
    { text: "OK", onPress: props.onOk }
  ]);
};
