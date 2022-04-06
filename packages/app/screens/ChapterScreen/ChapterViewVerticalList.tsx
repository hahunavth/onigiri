import React from "react";
import { ListRenderItemInfo, FlatList, Dimensions } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context";
import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  View,
  VStack
} from "native-base";
// @ts-ignore
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

import { ScaledImage } from "app/components/ScaledImage";
import { AntDesign } from "@expo/vector-icons";
import ChapterFooterBtn from "app/components/ChapterFooterBtn";
import PinchWrapper from "app/components/PinchWrapper";
import { ChapterContext } from "./ChapterContext";
import { useAppSelector } from "app/store/hooks";
import { homeSelector } from "app/store/homeSlice";
import { ChapterViewListProps } from "./type";
import TFastImage from "app/components/Typo/TFastImage";

const { width, height } = Dimensions.get("screen");

const ChapterViewVerticalList = React.forwardRef<
  FlatList,
  ChapterViewListProps
>((props, ref) => {
  // console.log(props.imgs)
  const { setImgs, handleScroll, imgs } = props;
  const { top } = useSafeAreaInsets();
  const { ctxId, changeChapter } = React.useContext(ChapterContext);
  const { currentComic } = useAppSelector(homeSelector);

  const renderItem = React.useCallback(
    ({ item, index }: ListRenderItemInfo<{ uri: string; h: number }>) => {
      // console.log(
      //   'https://hahunavth-express-api.herokuapp.com/api/v1/cors/' + item.uri
      // )
      return (
        <ScaledImage
          source={{
            uri:
              "https://hahunavth-express-api.herokuapp.com/api/v1/cors/" +
              item.uri
          }}
          id={index}
          h={item.h}
          setImgs={setImgs}
        />
      );
    },
    []
  );
  const keyExtractor = React.useCallback((item, id) => item.uri, []);

  const flatlistRef = React.useRef<FlatList>();
  // console.log(
  //   // Object.keys(
  //   flatlistRef.current?.getScrollResponder()?.type || {}
  //   // )
  // )

  return (
    // <PinchWrapper>
    <ReactNativeZoomableView
      style={{ width, height }}
      maxZoom={1.4}
      minZoom={1}
      // zoomStep={0.5}
      initialZoom={1}
      doubleTapDelay={0}
      // bindToBorders={true}
      pinchToZoomInSensitivity={2}
      doubleTapZoomToCenter={false}
      zoomCenteringLevelDistance={1}
      movementSensibility={1}
      // onZoomAfter={this.logOutZoomState}
      // style={{
      // padding: 10,
      // backgroundColor: 'red'
      // }}
      // onStartShouldSetPanResponder={(e, s, z, b) => {
      //   // console.log('pan should set', z)
      //   return false
      // }}
      // onMoveShouldSetPanResponder={(e, s, z, b) => {
      //   // console.log('pan should set', z)
      //   flatlistRef.current?.scrollToOffset(-z?.lastY || undefined)
      //   return true
      // }}
      // onPanResponderGrant={(e, s, z) => console.log(z)}
    >
      <View
        marginTop={-top}
        // edges={["bottom"]}
        // horizontal={true}
        // style={{ width, height }}
        // scrollEnabled={false}
      >
        <FlatList
          // scrollEnabled={false}
          ref={(fref) => {
            if (fref) {
              flatlistRef && (flatlistRef.current = fref);
              // @ts-ignore
              ref && (ref.current = fref);
            }
          }}
          data={imgs || []}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onScroll={handleScroll}
          initialNumToRender={4}
          maxToRenderPerBatch={5}
          removeClippedSubviews={true}
          // FIXME: SCROLL OVER FOOTER -> OPEN
          onEndReachedThreshold={1.1}
          onEndReached={(e) => props.onEndReach && props.onEndReach(e)}
          nestedScrollEnabled
          ListHeaderComponent={() => {
            return <View w={"full"} h={75}></View>;
          }}
          // ListFooterComponent={() => {
          //   return (
          //     <ScrollView my={24}>
          //       <Center>
          //         <Text fontSize={24}>END</Text>
          //         <Text>Chapter 0</Text>
          //       </Center>
          //       <Divider my={12} />
          //       <ChapterFooterBtn
          //         onPress={() => {
          //           const length = currentComic?.chapters.length || -1;
          //           const list = currentComic?.chapters || [];
          //           const id = ctxId || -1;
          //           console.log(length, id);
          //           if (
          //             id < length - 1 &&
          //             id > 0 &&
          //             list[id + 1] &&
          //             changeChapter
          //           ) {
          //             changeChapter({
          //               ctxId: id + 1,
          //               ctxName: list[id + 1].name,
          //               ctxPath: list[id + 1].path
          //             });
          //           }
          //         }}
          //       />
          //       <ChapterFooterBtn
          //         type="next"
          //         onPress={() => {
          //           const length = currentComic?.chapters.length || -1;
          //           const list = currentComic?.chapters || [];
          //           const id = ctxId || -1;
          //           console.log(length, id);
          //           if (
          //             id < length &&
          //             id >= 0 &&
          //             list[id - 1] &&
          //             changeChapter
          //           ) {
          //             changeChapter({
          //               ctxId: id - 1,
          //               ctxName: list[id - 1].name,
          //               ctxPath: list[id - 1].path
          //             });
          //           }
          //         }}
          //       />
          //       <Divider my={12} />
          //       <Center>
          //         <Text fontSize={24}>COMMENT</Text>
          //         <Text>Open comment BottomSheet</Text>
          //       </Center>
          //     </ScrollView>
          //   );
          // }}
        />
      </View>
    </ReactNativeZoomableView>
    // </PinchWrapper>
  );
});

export default React.memo(ChapterViewVerticalList);
