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
import { navigate } from "app/navigators";
import { useColorModeStyle } from "app/hooks/useColorModeStyle";
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
        {/* <MaterialIcons
          name="align-vertical-top"
          size={24}
          color={textStyle.color}
        /> */}
        <Image
          source={require("@onigiri/expo/assets/icons8-increase-100.png")}
          style={{ width: 50, height: 50 }}
          resizeMode={"contain"}
          resizeMethod={"resize"}
        />
      </IconWithTitle>
      <IconWithTitle
        title={i18n.t("home.categories.items.1")}
        onPress={() => navigate("genres.badge-list", undefined)}
      >
        {/* <MaterialIcons
          name="align-vertical-top"
          size={24}
          color={textStyle.color}
        />
         */}
        <Image
          source={require("@onigiri/expo/assets/icons8-checklist-100.png")}
          style={{ width: 50, height: 50 }}
          resizeMode={"contain"}
          resizeMethod={"resize"}
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
        {/* <MaterialIcons name="more-horiz" size={24} color={textStyle.color} /> */}
        <Image
          source={require("@onigiri/expo/assets/icons8-bookmark-500.png")}
          style={{ width: 50, height: 50 }}
          resizeMode={"contain"}
          resizeMethod={"resize"}
        />
      </IconWithTitle>
      <IconWithTitle
        title={i18n.t("home.categories.items.3")}
        onPress={() => {
          navigate("genres-comic-list");
        }}
      >
        {/* <MaterialIcons name="more-horiz" size={24} color={textStyle.color} /> */}
        <Image
          source={require("@onigiri/expo/assets/icons8-menu-vertical-100.png")}
          style={{ width: 50, height: 50 }}
          resizeMode={"contain"}
          resizeMethod={"resize"}
        />
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
    <Touchable onPress={onPress}>
      <VStack
        rounded={7}
        overflow={"hidden"}
        // bg={boxStyle.backgroundColor}
        // shadow={"1"}
      >
        <View
          justifyContent={"center"}
          alignItems={"center"}
          w={81}
          px={0}
          py={3}
        >
          <Box>{children}</Box>
          <Text fontSize={12} style={textStyle} textAlign={"center"}>
            {title}
          </Text>
        </View>
      </VStack>
    </Touchable>
  );
};

export default Categories;
