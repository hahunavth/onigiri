import { BlurView } from "app/components/BlurView";
import React, { useEffect, useState } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ViewStyle,
  InteractionManager,
  Text
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { homeActions, homeSelector } from "app/store/homeSlice";
import { useNavigation } from "@react-navigation/native";
import { ComicDetailScreenProps } from "app/navigators/StackNav";
import { usePrefetch } from "app/store/api";
import Animated from "react-native-reanimated";
import { navigate } from "app/navigators/index";
import { useColorModeStyle } from "../../hooks/useColorModeStyle";
import { resComicDetailChapterItem_T } from "../../types";
import { ChapterContext } from "./ChapterContext";
import { chapterActions, selectCptId } from "../../store/chapterSlice";
import { Entypo } from "@expo/vector-icons";

interface Props {
  style?: ViewStyle;
  onCommentClick?: () => void;
  // id?: number
}
// FIXME: CHAPTER BAR CHANGE CHAPTER
const ChapterBar = (props: Props) => {
  // const { ctxId } = React.useContext(ChapterContext);

  const home = useAppSelector(homeSelector);
  const id = useAppSelector(selectCptId);
  const list = home.currentComic?.chapters;
  const LEN = list?.length || 0;
  // const { changeChapter } = React.useContext(ChapterContext);
  // Prefetch next and prev chapter if exists
  const prefetchChapter = usePrefetch("getChapterByPath", {});
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id !== -1) {
      if (id > 0) {
        prefetchChapter((id - 1).toString());
      }
      if (id < LEN - 1) {
        prefetchChapter((id + 1).toString());
      }
    }
  }, [id]);

  // const [nextChapter, setNextChapter] = useState<resComicDetailChapterItem_T>()
  // const [prevChapter, setPrevChapter] = useState<resComicDetailChapterItem_T>()

  // useEffect(() => {
  //   // const interaction = InteractionManager.runAfterInteractions(() => {
  //   const length = home.currentComic?.chapters.length
  //   const id = ctxId
  //   console.log(id, list?.length)
  //   function findAndSetChapterById(
  //     id: number,
  //     length: number,
  //     list: resComicDetailChapterItem_T[]
  //   ) {
  //     if (id < length - 1) {
  //       setNextChapter(() => list[id + 1])
  //       if (list[id + 1].path) prefetchChapter(list[id + 1].path)
  //     }
  //     if (id > 0) {
  //       setPrevChapter(() => list[id - 1])
  //       if (list[id - 1].path) prefetchChapter(list[id - 1].path)
  //     }
  //   }

  //   if (length && list) {
  //     if (typeof id === 'number' && id > -1) {
  //       findAndSetChapterById(id, length, list)
  //     } else {
  //       let curId = -1
  //       list.every((item, id) => {
  //         if (item?.path === home.currentChapter?.path) {
  //           curId = id
  //           return false
  //         }
  //         return true
  //       })
  //       if (curId > -1) {
  //         findAndSetChapterById(curId, length, list)
  //       }
  //     }
  //   }
  //   // })

  //   return () => {
  //     // interaction.cancel()
  //   }
  // }, [home.currentChapter?.chapterName])

  const { boxStyle, textStyle } = useColorModeStyle("", "Secondary");

  // const nextStyle = React.useMemo(() => {
  //   return {
  //     opacity:
  //       typeof ctxId === "number" && ctxId < (list?.length || 0) - 1 ? 1 : 0.5
  //   };
  // }, [ctxId]);

  // const prevStyle = React.useMemo(() => {
  //   return {
  //     opacity: typeof ctxId === "number" && ctxId > 0 ? 1 : 0.5
  //   };
  // }, [ctxId]);

  return (
    <>
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 64,
            marginBottom: 0,
            backgroundColor: boxStyle.backgroundColor
            // marginHorizontal: PADDING / 2,
            // width: width - PADDING,
            // backgroundColor: "transparent",
          },
          props.style
        ]}
      >
        {/* <BlurView
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 0
              // backgroundColor: '#1e282b83'
              // justifyContent: "center",
              // padding: 20,
              // backgroundColor: "red",
              // borderBottomLeftRadius: 20,
            },
            StyleSheet.absoluteFill
          ]}
          intensity={60}
          tint={'dark'}
          // blurType="light"
          // blurAmount={20}
          // blurRadius={15}
          // downsampleFactor={4}
          // overlayColor="transparent"
        /> */}
        <View
          style={{
            position: "relative",
            flex: 1,
            backgroundColor: "transparent",
            // borderBottomLeftRadius: 20,
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 0,
            marginTop: 0
          }}
        >
          <TouchableOpacity
            // disabled={!nextChapter}
            // style={nextStyle}
            // disabled={
            //   typeof ctxId === 'number' && ctxId < (list?.length || 0) - 1
            //     ? true
            //     : false
            // }
            onPress={() => {
              if (id !== -1 && id < LEN - 1) {
                dispatch(chapterActions.setCurrentChapter(id + 1));
              }
              // if (nextChapter && typeof ctxId === 'number' && ctxId > -1) {
              //   {
              //     /* setCId((cid) => cid+1)
              //   navigate('chapter', {
              //     path: nextChapter.path,
              //     id: home.currentChapter?.id + 1,
              //     name: nextChapter.name
              //   }) */
              //   }
              //   changeChapter &&
              //     changeChapter({
              //       ctxName: nextChapter.name,
              //       ctxPath: nextChapter.path,
              //       ctxId: (ctxId || 0) + 1
              //     })
              //   {
              //     /* dispatch(homeActions.setCurrentChapter(
              //     {
              //       ...home.currentChapter,
              //       chapterName: nextChapter.name,
              //       path: nextChapter.path,
              //       id : home.currentChapter?.id + 1
              //     }
              //   )) */
              //   }
              // }
            }}
          >
            <AntDesign name={"arrowleft"} size={32} color={textStyle.color} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name={"like2"} size={32} color={textStyle.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onCommentClick}>
            <AntDesign name={"message1"} size={28} color={textStyle.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("chapter-list")}>
            <Entypo name={"list"} size={32} color={textStyle.color} />
          </TouchableOpacity>
          <TouchableOpacity
            // style={prevStyle}
            onPress={() => {
              if (id !== -1 && id > 0) {
                dispatch(chapterActions.setCurrentChapter(id - 1));
              }
              // if (!!prevChapter && typeof ctxId === 'number' && ctxId > -1) {
              //   {
              //     /* setCId((cid) => cid+1)
              //   navigate('chapter', {
              //     ctxPath: prevChapter.path,
              //     namexId: home.currentChapter?.id - 1,
              //     idame: prevChapter.name
              //   }) */
              //   }
              //   changeChapter &&
              //     changeChapter({
              //       ctxPath: prevChapter.path,
              //       ctxId: (ctxId || 0) - 1,
              //       ctxName: prevChapter.name
              //     })
              // }
            }}
          >
            <AntDesign name={"arrowright"} size={32} color={textStyle.color} />
          </TouchableOpacity>
        </View>
        {/* <Text
          style={[{ alignSelf: "center", color: "white" }, textStyle]}
          numberOfLines={1}
        >
          {home.currentChapter?.chapterName}
        </Text> */}
      </Animated.View>
    </>
  );
};

export default ChapterBar;
