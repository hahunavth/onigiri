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

type ConfirmModalProps = {
  modalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  message?: string
  onSubmit?: () => any
}

const ConfirmModal = ({
  modalVisible,
  setModalVisible,
  message,
  onSubmit
}: ConfirmModalProps) => {
  return (
    <>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={'sm'}>
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Confirm</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Text>{message || 'Do you want to delete?'}</Text>
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
                  onSubmit && onSubmit()
                }}
              >
                OK
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default ConfirmModal
