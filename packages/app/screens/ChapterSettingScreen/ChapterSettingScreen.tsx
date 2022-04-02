import { View, Text, Pressable, Button, HStack, Spacer } from "native-base";
import { Dimensions } from "react-native";
import React from "react";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetBackdrop,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import { CustomBackdrop } from "../ChapterScreen/CustomBackdrop";
import { goBack, navigate } from "app/navigators";
import { TextLgP } from "app/components/Typo";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ListDirection } from "./Options/ListDirection";
import { Theme } from "./Options/Theme";

type Props = {};

const ChapterSetting = React.memo(
  React.forwardRef<BottomSheet, any>((props, bottomSheetRef) => {
    // variables
    const snapPoints = React.useMemo(() => ["50%"], []);
    // callbacks
    const handleSheetChanges = React.useCallback((index: number) => {}, []);

    return (
      <>
        <View bg={"#0000001f"} flex={1}>
          <Pressable onPress={() => goBack()} flex={1}></Pressable>
          <BottomSheet
            ref={bottomSheetRef}
            // index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            onClose={() => goBack()}
            // footerComponent={BottomSheetCustomFooter}
            // enablePanDownToClose={false}
            // backdropComponent={(backdropProps) => (
            //   <BottomSheetBackdrop
            //     {...backdropProps}
            //     // style={{ backgroundColor: "gray" }}
            //     enableTouchThrough={true}
            //   />
            // )}
            // backdropComponent={(props) => {
            //   return (
            //     <CustomBackdrop
            //       {...props}
            //       style={{ flex: 1, backgroundColor: "red" }}
            //     />
            //   );
            // }}
            enableContentPanningGesture
            enableHandlePanningGesture
            enableOverDrag
            enablePanDownToClose
            detached={true}
            style={{
              zIndex: 10000,
              margin: 8,
              marginBottom: 240,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5
            }}
            bottomInset={36}
          >
            <BottomSheetView
              style={{
                marginHorizontal: 16,
                justifyContent: "space-between"
                // alignItems: "flex-end"
              }}
            >
              <BottomSheetView style={{ height: 320 }}>
                <TextLgP fontSize={28} mb={4}>
                  Setting
                </TextLgP>
                <ListDirection />
                <Theme />
              </BottomSheetView>
              <Button
                colorScheme="orange"
                rounded={8}
                size={"lg"}
                onPress={() => goBack()}
              >
                Close
              </Button>
            </BottomSheetView>
          </BottomSheet>
        </View>
      </>
    );
  })
);

export default ChapterSetting;
