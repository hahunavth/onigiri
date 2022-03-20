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
  Toast
} from 'native-base'
import { Picker, Linking } from 'react-native'
import React from 'react'
import {
  SectionListRenderItemInfo,
  TouchableNativeFeedback
} from 'react-native'
// import { Picker } from '@react-native-picker/picker'
import { AntDesign } from '@expo/vector-icons'
import { TextMdP, TextSmI, TextSmP, TextSmS } from '../../components/Typo'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { settingAction, settingSelector } from '../../store/settingSlice'
import i18n from 'i18n-js'

/**
 * Specifics child
 */
const ToggleThemeOption = ({ data }: { data: DataT }) => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode()
  const [isLight, setIsLight] = React.useState(
    colorMode === 'light' ? true : false
  )

  return (
    <ToggleOption
      data={data}
      toggle={() => {
        // setColorMode(isLight ? 'dark' : 'light')
        toggleColorMode()
        setIsLight(!isLight)
      }}
      value={isLight}
    />
  )
}

type Props = {}

// type SectionT

type DataT = {
  name: string
  type:
    | 'Login'
    | 'boolean'
    | 'select'
    | 'navigate'
    | 'button'
    | 'component'
    | 'link'
  default?: number | boolean
  data?: any
  component?: (props: { data: DataT }) => React.ReactElement
}

type SectionT = {
  data: DataT[]
  title: string
  sectionType: 'user-info' | 'form'
}

const sections: SectionT[] = [
  {
    title: i18n.t('setting.account.name'),
    sectionType: 'user-info',
    data: [
      {
        name: '',
        type: 'Login'
      }
    ]
  },
  {
    title: i18n.t('setting.setting.name'),
    sectionType: 'form',
    data: [
      {
        name: i18n.t('setting.setting.items.0'),
        type: 'component',
        default: false,
        component: ToggleThemeOption
      },
      {
        name: i18n.t('setting.setting.items.1'),
        type: 'select'
      }
    ]
  },
  {
    title: i18n.t('setting.pushNotification.name'),
    sectionType: 'form',
    data: [
      {
        name: i18n.t('setting.pushNotification.items.0'),
        type: 'boolean'
      }
    ]
  },
  {
    title: i18n.t('setting.about.name'),
    sectionType: 'form',
    data: [
      {
        name: i18n.t('setting.about.items.0'),
        type: 'link',
        data: 'https://hahunavth.xyz'
      },
      { name: i18n.t('setting.about.items.1'), type: 'navigate' },
      { name: i18n.t('setting.about.items.2'), type: 'navigate' },
      { name: i18n.t('setting.about.items.3'), type: 'navigate' },
      { name: i18n.t('setting.about.items.4'), type: 'navigate' }
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
]

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
  const renderItem = React.useCallback(
    ({
      item,
      index,
      section,
      separators
    }: SectionListRenderItemInfo<DataT, SectionT>) => {
      if (item.type === 'Login') return <UserLogin />
      else if (item.type === 'boolean') return <ToggleOption data={item} />
      else if (item.type === 'navigate') return <NavigateOption data={item} />
      else if (item.type === 'link') return <NavigateOption data={item} />
      else if (item.type === 'select') return <SelectOption data={item} />
      else if (item.type === 'button')
        return (
          <Button variant={'subtle'} colorScheme="danger" mb={1}>
            {item.name}
          </Button>
        )
      else {
        const Component = item.component
        if (Component) return <Component data={item} />
        else return null
      }
      // return null
    },
    []
  )

  const renderSectionHeader = React.useCallback(
    ({ section: { title } }) => (
      <Box>
        <TextSmS
          ml={2}
          fontSize={14}
          mt={1}
          fontWeight={500}
          textTransform={'uppercase'}
        >
          {title}
        </TextSmS>
      </Box>
    ),
    []
  )

  return (
    <View flex={1}>
      <SectionList
        flex={1}
        // bg={'red.100'}
        sections={sections}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  )
}

/**
 * Child components primitive
 */
const SelectOption = ({ data }: { data: DataT }) => {
  // let [service, setService] = React.useState('')
  const dispatch = useAppDispatch()
  const { language, theme } = useAppSelector(settingSelector)
  return (
    <HStack
      h={44}
      bg={'coolGray.50'}
      color="coolGray.500"
      _dark={{
        color: 'warmGray.400'
      }}
      px={3}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <TextSmI fontWeight="400" fontSize={16}>
        {data.name}
      </TextSmI>
      <Box w="1/2" maxW="200" pb={1} mt={0} mr={-4}>
        {/* // FIXME: SELECT REQUIRE KEY */}
        <Picker
          style={{ flex: 1, minWidth: 100 }}
          selectedValue={language}
          onValueChange={(itemValue, itemIndex) => {
            // setService(itemValue)
            dispatch(settingAction.changeLanguage(itemValue))
            console.log(language)
          }}
        >
          <Picker.Item label="English" value="en-US" />
          <Picker.Item label="Vietnamese" value="vi-VN" />
          <Picker.Item label="Japanese" value="ja-JP" />
        </Picker>
      </Box>
    </HStack>
  )
}

const NavigateOption = ({ data }: { data: DataT }) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        data.type === 'link' ? Linking.openURL(data.data) : null
      }}
    >
      <HStack
        h={44}
        bg={'coolGray.50'}
        color="coolGray.500"
        _dark={{
          color: 'warmGray.400'
        }}
        px={3}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <TextSmI fontWeight="400" fontSize={16}>
          {data.name}
        </TextSmI>
        <AntDesign name="right" size={24} color="black" alignSelf="flex-end" />
      </HStack>
    </TouchableNativeFeedback>
  )
}

const ToggleOption = ({
  data,
  toggle,
  value
}: {
  data: DataT
  value?: boolean
  toggle?: () => any
}) => {
  // const [isOn, setIsOn] = React.useState((data.default as boolean) || false)

  const handleChange = React.useCallback(
    (value) => {
      toggle ? toggle() : console.log('Not found toggle')
    },
    [toggle, value]
  )

  return (
    <HStack
      h={44}
      bg={'coolGray.50'}
      color="coolGray.500"
      _dark={{
        color: 'warmGray.400'
      }}
      px={3}
      alignItems={'center'}
      justifyContent={'space-between'}
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
  )
}

const UserLogin = () => {
  return (
    <TouchableNativeFeedback
      onPress={() =>
        Toast.show({
          title: 'Coming soon'
        })
      }
    >
      <HStack
        flex={1}
        h={84}
        bg={'coolGray.50'}
        alignItems={'center'}
        justifyContent={'space-between'}
        space={3}
        px={3}
      >
        <HStack alignItems={'center'}>
          <Avatar
            bg="yellow.300"
            size="lg"
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKa58lk7m0L2D5R3m-3SLGKBkoHXhC7Z4WKQ&usqp=CAU'
            }}
            mr={4}
          >
            Avatar
          </Avatar>
          {/* <Spacer /> */}
          <VStack mt={3}>
            <TextSmP fontSize={'lg'} fontWeight="600">
              Login
            </TextSmP>
            <TextSmI fontWeight="400">Login to use more feature</TextSmI>
            <Text></Text>
          </VStack>
        </HStack>
        <AntDesign name="right" size={24} color="black" alignSelf="flex-end" />
      </HStack>
    </TouchableNativeFeedback>
  )
}
