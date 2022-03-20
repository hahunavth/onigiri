// export { LibraryScreen as default } from 'app/screens/LibraryScreen'

// export { default } from 'app/navigators/BottomNav'

// export { StackNav as default } from 'app/navigators/StackNav'

// export { default } from 'app/ExpoUI'

import { StackNav } from 'app/navigators/StackNav'
import { View, Container, Center } from 'native-base'
import {} from 'react-native'

export default function native() {
  return (
    <Center>
      <View
        w={['full', '5/6']}
        style={{
          maxWidth: 1000,
          height: '100vh'
        }}
      >
        <StackNav />
      </View>
    </Center>
  )
}
