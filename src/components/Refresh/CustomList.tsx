/**
 * demo of using FlatList with custom pull-to-refresh header
 */
import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Animated,
  PanResponder,
  ViewStyle,
  TextStyle,
  Alert,
} from "react-native";

// import LottieView from 'lottie-react-native';

import PullToRefresh, {
  PullToRefreshHeaderProps,
} from "react-native-pull-to-refresh-custom";
import Header from "./Header";

const { Component } = React;

interface DataItem {
  key: string;
  text: string;
  on: boolean;
}

const data: DataItem[] = [];
for (let i = 0; i < 500; i++) {
  data.push({
    key: `data-${i}`,
    text: `number: ${i}`,
    on: false,
  });
}

const pageStyle = {
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 0,
  } as ViewStyle,
  listCon: {
    flex: 1,
    backgroundColor: "blue",
  } as ViewStyle,
  item: {
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    paddingLeft: 15,
    backgroundColor: "pink",
  } as ViewStyle,
  itemOdd: {
    backgroundColor: "green",
  },
  itemText: {
    color: "#fff",
    textAlign: "left",
    fontSize: 28,
  } as TextStyle,
};

interface State {
  refreshing: boolean;
  data: DataItem[];
}

export default class CustomList extends React.Component<{}, State> {
  state = {
    data: data.slice(0, 50),
    refreshing: false,
  };

  _renderItem = (item: DataItem, index: number, prefix = "") => {
    const conStyles = [pageStyle.item];
    if (index % 2 === 1) {
      conStyles.push(pageStyle.itemOdd);
    }
    return (
      <View key={index} style={conStyles}>
        <Text
          // onPress={() => {
          //   Alert.alert("click", item.text);
          // }}
          style={pageStyle.itemText}
        >
          in page {prefix} {item.text}
        </Text>
      </View>
    );
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    setTimeout(() => {
      this.setState((prevState) => {
        return {
          refreshing: false,
          data: prevState.data.concat(
            data.slice(prevState.data.length, prevState.data.length + 50)
          ),
        };
      });
    }, 3000);
  };

  flatListTest() {
    return (
      <PullToRefresh
        HeaderComponent={Header}
        headerHeight={100}
        refreshTriggerHeight={140}
        refreshingHoldHeight={140}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        style={{ flex: 1, backgroundColor: "red" }}
      >
        <FlatList
          style={{ flex: 1 }}
          data={this.state.data}
          scrollEventThrottle={20}
          renderItem={({ item, index }: { item: DataItem; index: number }) => {
            return this._renderItem(item, index, "FlatList");
          }}
        />
      </PullToRefresh>
    );
  }

  render() {
    const { state } = this;
    return <View style={pageStyle.container}>{this.flatListTest()}</View>;
  }
}
