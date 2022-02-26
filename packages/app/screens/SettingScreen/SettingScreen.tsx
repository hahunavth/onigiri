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
  useColorMode
} from 'native-base'
import React from 'react'
import {
  SectionListRenderItemInfo,
  TouchableNativeFeedback
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

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
  type: 'Login' | 'boolean' | 'select' | 'navigate' | 'button' | 'component'
  default?: number | boolean
  component?: (props: { data: DataT }) => React.ReactElement
}

type SectionT = {
  data: DataT[]
  title: string
  sectionType: 'user-info' | 'form'
}

const sections: SectionT[] = [
  {
    title: 'Account',
    sectionType: 'user-info',
    data: [
      {
        name: '',
        type: 'Login'
      }
    ]
  },
  {
    title: 'Setting',
    sectionType: 'form',
    data: [
      {
        name: 'Dark theme',
        type: 'component',
        default: false,
        component: ToggleThemeOption
      },
      {
        name: 'Language',
        type: 'select'
      }
    ]
  },
  {
    title: 'Push notification',
    sectionType: 'form',
    data: [
      {
        name: 'Subscribed comic have new chapter',
        type: 'boolean'
      }
    ]
  },
  {
    title: 'About',
    sectionType: 'form',
    data: [
      { name: 'Tern', type: 'navigate' },
      { name: 'About us', type: 'navigate' },
      { name: 'Privacy', type: 'navigate' },
      { name: 'Contact', type: 'navigate' }
    ]
  },
  {
    title: 'Dangerous location',
    sectionType: 'form',
    data: [
      {
        name: 'logout',
        type: 'button'
      },
      {
        name: 'Remove data',
        type: 'button'
      }
    ]
  }
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
      else if (item.type === 'select') return <SelectOption data={item} />
      else if (item.type === 'button')
        return (
          <Button variant={'subtle'} colorScheme="danger">
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
        <Text
          ml={2}
          fontSize={14}
          mt={1}
          fontWeight={400}
          textTransform={'uppercase'}
        >
          {title}
        </Text>
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
  let [service, setService] = React.useState('')
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
      <Text
        fontWeight="400"
        fontSize={16}
        _light={{
          color: 'coolGray.600'
        }}
      >
        {data.name}
      </Text>
      <Box w="1/4" maxW="200" pb={1} mt={0} mr={100}>
        {/* // FIXME: SELECT REQUIRE KEY */}
        <Select
          selectedValue={service}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />
          }}
          mt={1}
          onValueChange={(itemValue) => setService(itemValue)}
          defaultValue={'1'}
        >
          <Select.Item label="English" value="1" key={1} />
          <Select.Item label="Vietnamese" value="2" key={2} />
          <Select.Item label="Japanese" value="3" key={3} />
        </Select>
      </Box>
    </HStack>
  )
}

const NavigateOption = ({ data }: { data: DataT }) => {
  return (
    <TouchableNativeFeedback>
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
        <Text
          fontWeight="400"
          fontSize={16}
          _light={{
            color: 'coolGray.600'
          }}
        >
          {data.name}
        </Text>
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

  const handleChange = React.useCallback((value) => {
    toggle ? toggle() : console.log('Not found toggle')
  }, [])

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
      <Text
        fontWeight="400"
        fontSize={16}
        _light={{
          color: 'coolGray.600'
        }}
      >
        {data.name}
      </Text>
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
    <TouchableNativeFeedback>
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
            <Text
              color="coolGray.800"
              _dark={{
                color: 'warmGray.100'
              }}
              fontSize={'lg'}
              fontWeight="600"
            >
              Login
            </Text>
            <Text
              color="coolGray.500"
              _dark={{
                color: 'warmGray.400'
              }}
              fontWeight="400"
            >
              Login to use more feature
            </Text>
            <Text></Text>
          </VStack>
        </HStack>
        <AntDesign name="right" size={24} color="black" alignSelf="flex-end" />
      </HStack>
    </TouchableNativeFeedback>
  )
}
