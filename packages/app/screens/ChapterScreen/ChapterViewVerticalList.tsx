import { Text, View } from "native-base";
import React, { useEffect } from "react";
import {
  FlatList,
  Image as RNImage,
  LayoutAnimation,
  ListRenderItemInfo,
  useWindowDimensions
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// @ts-ignore
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

import { ScaledImage } from "app/components/ScaledImage";
import { MediumBanner } from "../../components/AdMob";
import { ChapterViewListProps } from "./type";

import TAutoHeightImage from "app/components/Typo/AutoHeightImage/TAutoHeightImage";
import { ScrollView } from "native-base";

// const { width, height } = Dimensions.get("screen");

const ChapterViewVerticalList = React.forwardRef<
  FlatList,
  ChapterViewListProps
>((props, ref) => {
  // console.log(props.imgs)
  const { handleScroll, imgs } = props;
  const { height, width } = useWindowDimensions();
  const [w, setW] = React.useState(0);
  const { top } = useSafeAreaInsets();
  // console.log(width);
  // const { ctxId, changeChapter } = React.useContext(ChapterContext);
  // const { currentComic } = useAppSelector(homeSelector);

  // useEffect(() => {
  //   TFastImage?.preload(
  //     imgs.map((i) => {
  //       return {
  //         ...i,
  //         headers: {
  //           referer: "https://www.nettruyenpro.com"
  //         }
  //       };
  //     })
  //   );
  // }, [imgs]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setW(width);
    }
    return () => {
      isMounted = false;
    };
  }, [width]);

  const renderItem = React.useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => {
      // console.log(
      //   'https://hahunavth-express-api.herokuapp.com/api/v1/cors/' + item.uri
      // )

      return <ChapterAutoHeightImage url={item} width={w} />;

      // return (
      //   <ScaledImage
      //     source={{
      //       uri:
      //         // "https://hahunavth-express-api.herokuapp.com/api/v1/cors/" +
      //         item
      //     }}
      //     id={index}
      //     // h={item.h}
      //     w={w}
      //     // setImgs={setImgs}
      //   />
      // );
    },
    [w]
  );
  const keyExtractor = React.useCallback(
    (item: string, id: number) => item,
    []
  );

  // useEffect(() => {
  //   let preFetchTasks: Promise<boolean>[] = [];

  //   imgs.forEach((p) => {
  //     preFetchTasks.push(RNImage.prefetch(p));
  //   });

  //   Promise.all(preFetchTasks).then(() => {
  //     console.log("Fetch done");
  //   });
  // }, [props.imgs]);

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
      // marginTop={-top}
      // fix render bottom of screen
      // flex={1}
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
          // initialNumToRender={10}
          // maxToRenderPerBatch={10}
          // windowSize={16}
          // fix render bottom of screen
          contentContainerStyle={{ paddingBottom: 100, flexGrow: 0 }}
          // disableVirtualization
          // removeClippedSubviews={true}
          // FIXME: SCROLL OVER FOOTER -> OPEN
          onEndReachedThreshold={1.1}
          onEndReached={(e) => props.onEndReach && props.onEndReach(e)}
          // onContentSizeChange={(contentWidth, contentHeight) => {
          //   // flatlistRef.current?.scrollToEnd({ animated: false });
          //   // flatlistRef.current?.scrollToOffset({
          //   //   offset: contentHeight - width,
          //   //   animated: false
          //   // });
          //   flatlistRef.current.scroll
          // }}
          // nestedScrollEnabled
          ListHeaderComponent={() => {
            return <View w={"full"} h={75 - top}></View>;
          }}
          ListFooterComponent={() => <MediumBanner size={"mediumRectangle"} />}
        />
        {/* <ScrollView
          ref={(fref) => {
            if (fref) {
              flatlistRef && (flatlistRef.current = fref);
              // @ts-ignore
              ref && (ref.current = fref);
            }
          }}
        >
          {imgs.map((i, index) => {
            return <ChapterAutoHeightImage url={i} width={w} key={index} />;
          })}
        </ScrollView> */}
      </View>
    </ReactNativeZoomableView>
    // </PinchWrapper>
  );
});

const ChapterAutoHeightImage = React.memo(
  ({ url, width }: { url: string; width: number }) => {
    const [loading, setLoading] = React.useState(true);
    console.log(url);
    // useEffect(() => {
    // }, []);

    return (
      <>
        {loading && (
          <View
            style={{
              minHeight: width
            }}
          >
            <Text
              style={{
                textAlign: "center",
                position: "absolute",
                flex: 1,
                // backgroundColor: "red",
                width: "100%"
              }}
            >
              {url}
            </Text>
          </View>
        )}

        <TAutoHeightImage
          source={{
            uri: url,
            // @ts-ignore
            headers: {
              referer: "https://www.nettruyenpro.com"
            }
          }}
          width={width}
          loadingIndicatorSource={require("@onigiri/expo/assets/splash.png")}
          progressiveRenderingEnabled={true}
          fadeDuration={0}
          accessibilityLabel={url}
          onLoadEnd={() => setLoading(false)}
        />
      </>
    );
  }
);

export default React.memo(ChapterViewVerticalList);
