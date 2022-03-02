import { historyAction, historySelector } from 'app/store/historySlice'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
// import QuicksandText, { QFontFamily } from "app/components/Common/QuicksandText";
// import { navigate } from "app/navigators";
import { RecentTabProps } from 'app/navigators/LibraryTopNavigator'
// import { ColorSchemeE } from "app/styles/colorScheme";
import { resComicDetail_T } from 'app/types'
// import { Layout, StyleService, useStyleSheet } from "appui-kitten/components";
import React from 'react'
import {
  View,
  Text,
  Modal,
  ScrollView,
  Button,
  Center,
  VStack
} from 'native-base'

import LibraryList from './LibraryList'

interface Props {}

export const RecentTab: React.FunctionComponent<RecentTabProps> = (props) => {
  const history = useAppSelector(historySelector)
  const dispatch = useAppDispatch()

  const [modalVisible, setModalVisible] = React.useState(false)

  return (
    <View style={{ flex: 1 }}>
      <LibraryList
        data={
          (history.readComics
            .map((path) => history.comics[path])
            .filter((n) => n) as resComicDetail_T[]) || []
        }
        addonFieldName={'Lasted read: '}
        addonFieldExtractor={(item) => {
          return item.lastedReadChapter || ''
        }}
        onLongPress={
          (comic) => setModalVisible((v) => !v)
          // dispatch(
          //   historyAction.removeReadComic({
          //     path: comic.path
          //   })
          // )
        }
      />
      <>
        <Modal isOpen={modalVisible} onClose={setModalVisible} size={'sm'}>
          <Modal.Content maxH="212">
            <Modal.CloseButton />
            <Modal.Header>Return Policy</Modal.Header>
            <Modal.Body>
              <ScrollView>
                <Text>
                  Create a 'Return Request' under “My Orders” section of
                  App/Website. Follow the screens that come up after tapping on
                  the 'Return’ button. Please make a note of the Return ID that
                  we generate at the end of the process. Keep the item ready for
                  pick up or ship it to us basis on the return mode.
                </Text>
              </ScrollView>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setModalVisible(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    setModalVisible(false)
                  }}
                >
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Center>
          <VStack space={4}>
            {['xs', 'sm', 'md', 'lg', 'xl', 'full'].map((size) => {
              return (
                <Button
                  // onPress={() => handleSizeClick(size)}
                  key={size}
                >{`Open ${size} Modal`}</Button>
              )
            })}
          </VStack>
        </Center>
      </>
    </View>
  )
}
