import React, { useEffect, useRef, useContext } from "react";
import {
  Dimensions,
  StyleSheet,
  FlatList as FlatListT,
  useWindowDimensions
} from "react-native";
import { View, Text, FlatList, HStack, Pressable, Button } from "native-base";
import BottomSheet from "@gorhom/bottom-sheet";
import { goBack } from "app/navigators";
import SheetHandle from "app/components/ChapterListBottomSheet/SheetHandle";
import { TextLgP, TextMdP, TextXsS } from "app/components/Typo";
import { Rating, AirbnbRating } from "react-native-ratings";
import { TextInput } from "react-native-gesture-handler";

type RatingBottomSheetProps = {
  title: string;
  subtitle?: string;
  onSubmit?: (rating: number, comment: string) => any;
};

export const RatingBottomSheet = React.memo(
  React.forwardRef<BottomSheet, RatingBottomSheetProps>(
    (props, bottomSheetRef) => {
      const { width, height } = useWindowDimensions();

      const [rating, setRating] = React.useState(3);
      const [comment, setComment] = React.useState("");

      const snapPoints = React.useMemo(() => ["60%"], []);
      // callbacks
      const handleSheetChanges = React.useCallback((index: number) => {
        // console.log('handleSheetChanges', index)
      }, []);

      // const { loading } = useInteraction();
      return (
        <Pressable flex={1} bg={"#04040413"} onPress={() => goBack()}>
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            onClose={() => goBack()}
            handleComponent={SheetHandle}
            enableContentPanningGesture
            enableHandlePanningGesture
            enableOverDrag
            enablePanDownToClose
            detached={true}
            keyboardBehavior="extend"
            style={
              {
                // margin: width / 10
              }
            }
            // bottomInset={height / 3}
          >
            <View
              style={{
                flex: 1,
                marginBottom: 12,
                paddingHorizontal: 24
              }}
            >
              <TextLgP>{props.title}</TextLgP>
              <TextXsS>{props.subtitle}</TextXsS>
              {/* <TextXsS>Rate your experience: </TextXsS> */}

              {/* <HStack justifyContent={"center"}>
              <Rating
                type="heart"
                ratingCount={5}
                imageSize={48}
                // showRating
                // onFinishRating={this.ratingCompleted}
              />
            </HStack> */}
              <AirbnbRating
                count={5}
                size={32}
                onFinishRating={(v) => setRating(v)}
                reviewSize={16}
              />
              <TextInput
                numberOfLines={10}
                textAlignVertical={"top"}
                placeholder={"Type something..."}
                onChangeText={(v) => setComment(v)}
                // onFocus={() => console.log(bottomSheetRef)}
                style={{
                  // borderColor: "#444444",
                  flex: 1,
                  minHeight: 80,
                  borderRadius: 4,
                  marginVertical: 12,
                  marginTop: 8,
                  marginBottom: 10,
                  // borderRadius: 10,
                  fontSize: 16,
                  lineHeight: 20,
                  padding: 12,
                  backgroundColor: "rgba(151, 151, 151, 0.25)",
                  marginHorizontal: 2

                  // alignSelf: "stretch",
                  // marginHorizontal: 12,
                  // marginBottom: 12,
                  // padding: 12,
                  // borderRadius: 12,
                  // backgroundColor: "grey",
                  // color: "white"
                  // textAlign: "center"
                }}
              ></TextInput>
              <HStack justifyContent={"flex-end"} space={4}>
                <Button onPress={() => goBack()}>Cancel</Button>
                <Button
                  onPress={() =>
                    props.onSubmit && props.onSubmit(rating, comment)
                  }
                >
                  OK
                </Button>
              </HStack>
            </View>
          </BottomSheet>
        </Pressable>
      );
    }
  )
);
