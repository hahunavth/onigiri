import {
  View,
  Text,
  Container,
  HStack,
  VStack,
  Box,
  SectionList,
  Avatar,
  Spacer,
  Center,
  Heading,
  Switch,
  Divider,
  Select,
  CheckIcon,
  Button,
  useColorMode,
  Toast,
  useColorModeValue
} from "native-base";
import { Picker, Linking } from "react-native";
import React from "react";
import {
  SectionListRenderItemInfo,
  TouchableNativeFeedback
} from "react-native";
// import { Picker } from '@react-native-picker/picker'
import { AntDesign } from "@expo/vector-icons";
import { TextMdP, TextSmI, TextSmP, TextSmS } from "app/components/Typo";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { settingAction, settingSelector } from "app/store/settingSlice";
import i18n from "i18n-js";
import { navigate } from "app/navigators";

/**
 * Specifics child
 */
const ToggleThemeOption = ({ data }: { data: DataT }) => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const [isLight, setIsLight] = React.useState(() =>
    colorMode === "light" ? true : false
  );

  const toggle = React.useCallback(() => {
    // setColorMode(isLight ? 'dark' : 'light')
    // navigate("day-and-night", {
    //   type: colorMode === "light" ? "day-to-night" : "day-to-night"
    // });
    setTimeout(() => {
      toggleColorMode();
    }, 100);
    setIsLight(!isLight);
    navigate("day-and-night", { type: "day-to-night" });
  }, []);

  return <ToggleOption data={data} toggle={toggle} value={isLight} />;
};

const ToggleNewCptNotiOption = ({ data }: { data: DataT }) => {
  const dispatch = useAppDispatch();
  const { newChapterNotification } = useAppSelector(settingSelector);

  const toggle = React.useCallback(
    () => dispatch(settingAction.toggleNewCptNotification(undefined)),
    []
  );

  console.log(!!newChapterNotification);
  return (
    <ToggleOption
      data={data}
      toggle={toggle}
      value={!!newChapterNotification}
    />
  );
};

type Props = {};

// type SectionT

type DataT = {
  name: string;
  type:
    | "Login"
    | "boolean"
    | "select"
    | "navigate"
    | "button"
    | "component"
    | "link";
  default?: number | boolean;
  data?: any;
  component?: (props: { data: DataT }) => React.ReactElement;
  onPress?: () => any;
};

type SectionT = {
  data: DataT[];
  title: string;
  sectionType: "user-info" | "form";
};

/**
 * Setting screen:
 * Sessions
 * - Login or user user information
 * - Theme
 * - Language
 * - Notification
 * - Terms and support
 * - Remove data
 */
export const SettingScreen = (props: Props) => {
  const setting = useAppSelector(settingSelector);

  const renderItem = React.useCallback(
    ({
      item,
      index,
      section,
      separators
    }: SectionListRenderItemInfo<DataT, SectionT>) => {
      if (item.type === "Login") return <UserLogin />;
      else if (item.type === "boolean") return <ToggleOption data={item} />;
      else if (item.type === "navigate") return <NavigateOption data={item} />;
      else if (item.type === "link") return <NavigateOption data={item} />;
      else if (item.type === "select") return <SelectOption data={item} />;
      else if (item.type === "button")
        return (
          <Button variant={"subtle"} colorScheme="danger" mb={1}>
            {item.name}
          </Button>
        );
      else {
        const Component = item.component;
        if (Component) return <Component data={item} />;
        else return null;
      }
      // return null
    },
    [setting.language, setting.theme]
  );

  const renderSectionHeader = React.useCallback(
    ({ section: { title } }) => (
      <Box>
        <TextSmS
          ml={2}
          fontSize={14}
          mt={1}
          fontWeight={500}
          textTransform={"uppercase"}
        >
          {title}
        </TextSmS>
      </Box>
    ),
    [setting.language, setting.theme]
  );

  const sections: SectionT[] = [
    {
      title: i18n.t("setting.account.name"),
      sectionType: "user-info",
      data: [
        {
          name: "",
          type: "Login"
        }
      ]
    },
    {
      title: i18n.t("setting.setting.name"),
      sectionType: "form",
      data: [
        {
          name: i18n.t("setting.setting.items.0"),
          type: "component",
          default: false,
          component: ToggleThemeOption
        },
        {
          name: i18n.t("setting.setting.items.1"),
          type: "select"
        }
      ]
    },
    {
      title: i18n.t("setting.pushNotification.name"),
      sectionType: "form",
      data: [
        {
          name: i18n.t("setting.pushNotification.items.0"),
          type: "component",
          default: false,
          component: ToggleNewCptNotiOption
        }
      ]
    },
    {
      title: i18n.t("setting.about.name"),
      sectionType: "form",
      data: [
        {
          name: i18n.t("setting.about.items.0"),
          type: "link",
          data: "https://hahunavth.xyz"
        },
        { name: i18n.t("setting.about.items.1"), type: "navigate" },
        { name: i18n.t("setting.about.items.2"), type: "navigate" },
        { name: i18n.t("setting.about.items.3"), type: "navigate" },
        { name: i18n.t("setting.about.items.4"), type: "navigate" },
        // TODO: I18N
        {
          name: "Feedback",
          type: "navigate",
          onPress: () => navigate("rating")
        }
      ]
    }
    // {
    //   title: 'Dangerous',
    //   sectionType: 'form',
    //   data: [
    //     {
    //       name: 'logout',
    //       type: 'button'
    //     },
    //     {
    //       name: 'Remove data',
    //       type: 'button'
    //     }
    //   ]
    // }
  ];

  return (
    <View flex={1} bg={"warmGray.50"} _dark={{ bg: "warmGray.900" }}>
      <SectionList
        flex={1}
        sections={sections}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

/**
 * Child components primitive
 */
const SelectOption = ({ data }: { data: DataT }) => {
  // let [service, setService] = React.useState('')
  const dispatch = useAppDispatch();
  const { language, theme } = useAppSelector(settingSelector);
  return (
    <HStack
      h={44}
      color="coolGray.500"
      bg={"coolGray.50"}
      _dark={{
        bg: "warmGray.800"
      }}
      px={3}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <TextSmI fontWeight="400" fontSize={16}>
        {data.name}
      </TextSmI>
      <Box w="1/2" maxW="200" pb={1} mt={0} mr={-4}>
        {/* // FIXME: SELECT REQUIRE KEY */}
        <Picker
          style={{
            flex: 1,
            minWidth: 100,
            color: useColorModeValue("#000000", "#b9a398")
          }}
          selectedValue={language}
          onValueChange={(itemValue: any, itemIndex: any) => {
            // setService(itemValue)
            dispatch(settingAction.changeLanguage(itemValue));
            console.log(language);
          }}
        >
          <Picker.Item label="English" value="en-US" />
          <Picker.Item label="Vietnamese" value="vi-VN" />
          <Picker.Item label="Japanese" value="ja-JP" />
        </Picker>
      </Box>
    </HStack>
  );
};

const NavigateOption = ({ data }: { data: DataT }) => {
  return (
    <TouchableNativeFeedback
      onPress={
        data?.onPress ||
        (() => {
          data.type === "link" ? Linking.openURL(data.data) : null;
        })
      }
    >
      <HStack
        h={44}
        bg={"coolGray.50"}
        color="coolGray.500"
        _dark={{ bg: "warmGray.800" }}
        px={3}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <TextSmI fontWeight="400" fontSize={16}>
          {data.name}
        </TextSmI>
        <AntDesign
          name="right"
          size={24}
          color={useColorModeValue("#0c0c0c", "#9b684d")}
          alignSelf="flex-end"
        />
      </HStack>
    </TouchableNativeFeedback>
  );
};

const ToggleOption = ({
  data,
  toggle,
  value
}: {
  data: DataT;
  value?: boolean;
  toggle?: () => any;
}) => {
  // const [isOn, setIsOn] = React.useState((data.default as boolean) || false)

  const handleChange = React.useCallback(() => {
    toggle ? toggle() : console.log("Not found toggle");
  }, [toggle]);

  console.log(value + "t");

  return (
    <HStack
      h={44}
      bg={"coolGray.50"}
      color="coolGray.500"
      _dark={{ bg: "warmGray.800" }}
      px={3}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <TextSmI fontWeight="400" fontSize={16}>
        {data.name}
      </TextSmI>
      <Switch
        defaultIsChecked
        colorScheme="emerald"
        value={value || false}
        onValueChange={handleChange}
      />
    </HStack>
  );
};

const UserLogin = () => {
  return (
    <TouchableNativeFeedback
      onPress={() =>
        Toast.show({
          title: "Coming soon"
        })
      }
    >
      <HStack
        flex={1}
        h={84}
        bg={"coolGray.50"}
        _dark={{ bg: "warmGray.800" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        space={3}
        px={3}
      >
        <HStack alignItems={"center"}>
          <Avatar
            bg="yellow.300"
            size="lg"
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKa58lk7m0L2D5R3m-3SLGKBkoHXhC7Z4WKQ&usqp=CAU"
            }}
            mr={4}
          >
            Avatar
          </Avatar>
          {/* <Spacer /> */}
          <VStack mt={3}>
            <TextSmP fontSize={"lg"} fontWeight="600">
              Login
            </TextSmP>
            <TextSmI fontWeight="400">Login to use more feature</TextSmI>
            <Text></Text>
          </VStack>
        </HStack>
        <AntDesign
          name="right"
          size={24}
          color={useColorModeValue("#000000", "#99684d")}
          alignSelf="flex-end"
        />
      </HStack>
    </TouchableNativeFeedback>
  );
};
