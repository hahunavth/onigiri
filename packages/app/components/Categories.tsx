import { View, Text, HStack, VStack, Box } from "native-base";
import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { navigate } from "../navigators";
import { useColorModeStyle } from "../hooks/useColorModeStyle";
import i18n from "i18n-js";

const Categories = () => {
  const { boxStyle, textStyle } = useColorModeStyle("", "Primary");

  return (
    <HStack justifyContent={"center"} space={2}>
      <IconWithTitle
        title={i18n.t("home.categories.items.0")}
        onPress={() => {
          navigate("top-comic");
        }}
      >
        <MaterialIcons
          name="align-vertical-top"
          size={24}
          color={textStyle.color}
        />
        {/* <Image
          source={require("./test.png")}
          style={{ width: 100, height: 100 }}
        /> */}
      </IconWithTitle>
      <IconWithTitle
        title={i18n.t("home.categories.items.1")}
        onPress={() => navigate("genres.badge-list", undefined)}
      >
        <MaterialIcons
          name="align-vertical-top"
          size={24}
          color={textStyle.color}
        />
      </IconWithTitle>
      <IconWithTitle
        title={i18n.t("home.categories.items.2")}
        onPress={() =>
          navigate("main", {
            screen: "main/discover"
          })
        }
      >
        <MaterialIcons name="more-horiz" size={24} color={textStyle.color} />
      </IconWithTitle>
      <IconWithTitle
        title={i18n.t("home.categories.items.3")}
        onPress={() => {
          navigate("genres-comic-list");
        }}
      >
        <MaterialIcons name="more-horiz" size={24} color={textStyle.color} />
      </IconWithTitle>
    </HStack>
  );
};

type Props = {
  children: React.ReactElement;
  title?: string;
  onPress?: () => any;
};

const Touchable: React.FC<TouchableOpacityProps & TouchableOpacityProps> =
  Platform.select({
    android: require("react-native").TouchableNativeFeedback,
    web: require("react-native").TouchableOpacity
  });

const IconWithTitle = ({ children, onPress, title }: Props) => {
  const { boxStyle, textStyle } = useColorModeStyle("", "Primary");

  return (
    <VStack
      rounded={7}
      overflow={"hidden"}
      bg={boxStyle.backgroundColor}
      shadow={"1"}
    >
      <Touchable onPress={onPress}>
        <View
          justifyContent={"center"}
          alignItems={"center"}
          w={81}
          px={0}
          py={3}
        >
          <Box>{children}</Box>
          <Text fontSize={12} style={textStyle}>
            {title}
          </Text>
        </View>
      </Touchable>
    </VStack>
  );
};

export default Categories;
