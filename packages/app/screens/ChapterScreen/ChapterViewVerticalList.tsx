import React, { useEffect } from "react";
import {
  ListRenderItemInfo,
  FlatList,
  Dimensions,
  useWindowDimensions,
  LayoutAnimation
} from "react-native";
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
import { MediumBanner } from "../../components/AdMob";

// const { width, height } = Dimensions.get("screen");

const ChapterViewVerticalList = React.forwardRef<
  FlatList,
  ChapterViewListProps
>((props, ref) => {
  // console.log(props.imgs)
  const { setImgs, handleScroll, imgs } = props;
  const { height, width } = useWindowDimensions();
  const [w, setW] = React.useState(0);
  const { top } = useSafeAreaInsets();
  // console.log(width);
  // const { ctxId, changeChapter } = React.useContext(ChapterContext);
  // const { currentComic } = useAppSelector(homeSelector);

  useEffect(() => {
    TFastImage?.preload(
      imgs.map((i) => {
        return {
          ...i,
          headers: {
            referer: "https://www.nettruyenpro.com"
          }
        };
      })
    );
  }, [imgs]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setW(width);
  }, [width]);

  const renderItem = React.useCallback(
    ({ item, index }: ListRenderItemInfo<{ uri: string; h: number }>) => {
      // console.log(
      //   'https://hahunavth-express-api.herokuapp.com/api/v1/cors/' + item.uri
      // )

      return (
        <ScaledImage
          source={{
            uri:
              // "https://hahunavth-express-api.herokuapp.com/api/v1/cors/" +
              item.uri
          }}
          id={index}
          h={item.h}
          w={w}
          setImgs={setImgs}
        />
      );
    },
    [w]
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
      style={{ width: w }}
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
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews={true}
          // FIXME: SCROLL OVER FOOTER -> OPEN
          onEndReachedThreshold={1.1}
          onEndReached={(e) => props.onEndReach && props.onEndReach(e)}
          // nestedScrollEnabled
          ListHeaderComponent={() => {
            return <View w={"full"} h={75}></View>;
          }}
          ListFooterComponent={() => <MediumBanner size={"mediumRectangle"} />}
        />
      </View>
    </ReactNativeZoomableView>
    // </PinchWrapper>
  );
});

export default React.memo(ChapterViewVerticalList);
