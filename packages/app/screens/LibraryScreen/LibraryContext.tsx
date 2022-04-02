import React from "react";
import ConfirmModal from "app/components/ConfirmModal";
import useInteraction from "app/hooks/useInteraction";

type Props = {
  children: React.ReactNode;
};

type LibraryContextT = {
  modalVisible?: boolean;
  pressedComicPath?: string;
  onSubmit?: () => ((path: string) => any) | undefined;
  showModal?: (
    visible: boolean,
    path: string,
    onSubmit: () => ((path: string) => any) | undefined
  ) => any;
};

export const LibraryContext = React.createContext<LibraryContextT>({});
/**
 * TODO: CONTINUE
 */
const LibraryContextProvider = (props: Props) => {
  /**
   * Use modal state
   */
  const [modalVisible, setModalVisible] = React.useState(false);
  const [pressedComicPath, setPressedComicPath] = React.useState("");
  // USE () => FN to ignore lazy initial
  const [onSubmit, setOnSubmit] = React.useState<
    () => ((path: string) => any) | undefined
  >(() => undefined);

  const showModal = React.useCallback((visible, path, onSubmit) => {
    // console.log('show modal ', visible, path, onSubmit)
    setModalVisible(visible);
    setPressedComicPath(path);
    setOnSubmit(onSubmit);
  }, []);

  const { loading } = useInteraction();

  return (
    <LibraryContext.Provider
      value={{ modalVisible, pressedComicPath, onSubmit, showModal }}
    >
      {props.children}
      {loading ? null : (
        <ConfirmModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          // TODO: IGNORE THIS WARNING
          // @ts-ignore
          onSubmit={() => onSubmit && onSubmit(pressedComicPath)}
        />
      )}
    </LibraryContext.Provider>
  );
};

export default LibraryContextProvider;
