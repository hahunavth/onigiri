import React from "react";
import { Dimensions, StyleSheet, FlatList as FlatListT } from "react-native";
import { View } from "native-base";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useAppSafeAreaInsets } from "app/provider/safe-area/use-safe-area";
import { goBack } from "app/navigators";
import InScreenHeader from "../NavigationHeader/InScreenHeader";
import SheetHandle from "./SheetHandle";
import ChapterList from "./ChapterList";

export const ChapterListBottomSheet = React.memo(
  React.forwardRef<BottomSheet, any>((props, bottomSheetRef) => {
    const { bottom, top } = useAppSafeAreaInsets();
    // Bottom sheet
    // console.log("pathhhhhhhhhhhhhhhhhhhhh", path);
    // variables
    const snapPoints = React.useMemo(
      () => [Dimensions.get("screen").height - top],
      []
    );
    // callbacks
    const handleSheetChanges = React.useCallback((index: number) => {
      // console.log('handleSheetChanges', index)
    }, []);

    // const { loading } = useInteraction();

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onClose={() => goBack()}
        handleComponent={SheetHandle}
        // footerComponent={BottomSheetCustomFooter}
        // enablePanDownToClose={false}

        enableContentPanningGesture
        enableHandlePanningGesture
        enableOverDrag
        enablePanDownToClose
        detached={true}
        style={{
          zIndex: 10000,
          margin: 1,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5
        }}
      >
        <View
          style={{
            flex: 1
          }}
        >
          <InScreenHeader
            title="Chapter list"
            onLeftPress={() => goBack()}
            style={{ marginTop: -24, borderRadius: 16 }}
            topEdge={false}
          />
          {/* <HStack justifyContent={"space-between"} mx={4}>
            <Text fontSize={18} fontWeight={"bold"}>
              Comment
            </Text>
            <HStack lineHeight={18}>
              <Text fontSize={18} mr={1}>
                12345
              </Text>
              <FontAwesome
                name="commenting-o"
                size={20}
                color="black"
                style={{ marginTop: 4 }}
              />
            </HStack>
          </HStack> */}

          {/*  */}
          <BottomSheetTextInput value="Search" style={styles.input} />
          {/*  */}
          {/* <CommentFLLoader path={path || ""} /> */}
          <ChapterList />
        </View>
      </BottomSheet>
    );
  })
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey"
  },
  contentContainer: {
    flex: 1,
    alignItems: "center"
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    marginHorizontal: 12
  }
});
