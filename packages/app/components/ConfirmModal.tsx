import React from "react";
import { Text, Modal, ScrollView, Button } from "native-base";
import i18n from "i18n-js";

type ConfirmModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
  onSubmit?: () => any;
};

const ConfirmModal = ({
  modalVisible,
  setModalVisible,
  message,
  onSubmit
}: ConfirmModalProps) => {
  return (
    <>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={"sm"}>
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Confirm</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Text>{message || "Do you want to delete?"}</Text>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                {i18n.t("button.cancel")}
              </Button>
              <Button
                onPress={() => {
                  setModalVisible(false);
                  onSubmit && onSubmit();
                }}
              >
                OK
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ConfirmModal;
