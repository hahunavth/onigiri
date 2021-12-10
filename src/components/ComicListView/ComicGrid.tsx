import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  ListRenderItemInfo,
  Pressable,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HomeNavigationProps } from "src/navigators/Main/BottomMenu";
import { RootStackParamList } from "src/navigators/StackNavigator";
import { ComicProps, comicListProps } from "./ComicList";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";
import { endAncestor, endNode } from "@/screens/ComicDetailsScreen";
// import { Icon } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/FontAwesome";
import { QuicksandText } from "../Common/QuicksandText";

const numColumns = 3;
const ratio = 1.5;
const itemMargin = 5;
const containerMargin = 6;

const size = Dimensions.get("window").width / numColumns;
const styles = StyleSheet.create({
  container: {
    margin: containerMargin,
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
  },
  itemContainer: {
    width: size - itemMargin * 2 - (2 * containerMargin) / numColumns,
    height: size * ratio,
    margin: itemMargin,
  },
  item: {
    flex: 1,
    // backgroundColor: "lightblue",
    fontSize: 12,
    fontWeight: "600",
  },
  poster: {
    width: size - itemMargin * 2 - (2 * containerMargin) / numColumns,
    height: size * ratio - 50,
    borderRadius: 8,
  },
});

let startAncestor: any;
let startNode: any;

export function ComicGrid({ list, name, limit, onPressMore }: comicListProps) {
  // console.log("🚀 ~ file: ComicIconList.tsx ~ line 50 ~ Grid ~ list", list);
  const navigation = useNavigation<HomeNavigationProps>();
  let data = list;
  if (limit) data = list.filter((item, id) => id < limit);

  const ComicGridRenderItem = ({
    item,
  }:
    | ListRenderItemInfo<ComicProps>
    | SectionListRenderItemInfo<ComicProps>
    | {
        item: ComicProps;
      }) => {
    // const navigation = useNavigation<HomeNavigationProps>();

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ComicDetails", {
            path: item.path,
            comic: item,
            // ComicDetails: item,
          })
        }
      >
        <View
          style={styles.itemContainer}
          ref={(ref) => (startAncestor = nodeFromRef(ref))}
        >
          <SharedElement onNode={(node) => (startNode = node)}>
            <Image
              style={styles.poster}
              source={{
                uri:
                  item.posterPath ||
                  "http://st.imageinstant.net/data/comics/32/vo-luyen-dinh-phong.jpg",
              }}
            />
          </SharedElement>
          <QuicksandText numberOfLines={2} style={styles.item}>
            {item.name}
          </QuicksandText>
        </View>
      </TouchableOpacity>
    );
  };

  // TODO: Use common SessionHeader
  const RenderHeader = ({
    name,
    onPressMore,
    list,
  }: comicListProps): JSX.Element => {
    const HeaderHeight = 40;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 10,
        }}
      >
        <QuicksandText
          style={{
            fontSize: 20,
            marginLeft: 10,
            fontFamily: "Quicksand_600SemiBold",
          }}
        >
          {name}
        </QuicksandText>
        <Pressable
          onPress={() => {
            onPressMore && onPressMore();
          }}
          style={{
            // width: HeaderHeight,
            // height: HeaderHeight,
            // flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <QuicksandText
            style={{
              // width: HeaderHeight, height: HeaderHeight,
              fontSize: 14,
              color: "#837d7d",
            }}
          >
            More
          </QuicksandText>
          <Icon
            name="angle-right"
            style={{
              fontSize: 20,
              color: "#837d7d",
              marginLeft: 4,
              marginRight: 16,
            }}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <RenderHeader name={name} onPressMore={onPressMore} list={list} />
      <FlatList
        initialNumToRender={6}
        style={styles.container}
        data={data}
        renderItem={ComicGridRenderItem}
        keyExtractor={(item) => item.index}
        numColumns={numColumns}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
    </>
  );
}

// Render overlay in front of screen
const position = new Animated.Value(0);
<View style={StyleSheet.absoluteFill}>
  <SharedElementTransition
    start={{
      node: startNode,
      ancestor: startAncestor,
    }}
    end={{
      node: endNode,
      ancestor: endAncestor,
    }}
    position={position}
    animation="move"
    resize="auto"
    align="auto"
  />
</View>;
