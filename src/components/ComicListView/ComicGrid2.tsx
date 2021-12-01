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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HomeNavigationProps } from "@/navigator/Main/BottomMenu";
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
import { QuicksandText } from "../QuicksandText";

const numColumns = 2;
const ratio = 1;
const itemMargin = 5;
const containerMargin = 6;

const size = Dimensions.get("window").width / numColumns;
const styles = StyleSheet.create({
  container: {
    margin: containerMargin,
    // backgroundColor: "white",
  },
  itemContainer: {
    width: size - itemMargin * 2 - (2 * containerMargin) / numColumns,
    height: size * ratio,
    margin: itemMargin,
  },
  item: {
    flex: 1,
    // backgroundColor: "lightblue",
    fontSize: 13,
    fontFamily: "Quicksand_600SemiBold",
  },
  poster: {
    width: size - itemMargin * 2 - (2 * containerMargin) / numColumns,
    height: size * ratio - 50,
    borderRadius: 8,
  },
});

let startAncestor: any;
let startNode: any;

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
            // width: HeaderHeight, height: HeaderHeight,
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

export function ComicGrid2({ list, name, limit, onPressMore }: comicListProps) {
  // console.log("🚀 ~ file: ComicIconList.tsx ~ line 50 ~ Grid ~ list", list);
  let data = list;
  if (limit) data = list.filter((item, id) => id < limit);
  const navigation = useNavigation<HomeNavigationProps>();
  const ComicGridRenderItem2 = ({
    item,
  }:
    | ListRenderItemInfo<ComicProps>
    | {
        item: ComicProps;
      }) => {
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

  return (
    <>
      <RenderHeader list={list} name={name} onPressMore={onPressMore} />
      <FlatList
        style={styles.container}
        data={data}
        scrollEnabled={false}
        nestedScrollEnabled={true}
        renderItem={ComicGridRenderItem2}
        keyExtractor={(item) => item.index}
        numColumns={numColumns}
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
