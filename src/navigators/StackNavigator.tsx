import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { BottomMenu } from "./BottomMenu";

//  Screen Props Type
export type ComicListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ComicList"
>;
export type MainScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Main"
>;

//  Stack Navigation Type
type RootStackParamList = {
  Main: undefined;
  ComicList: undefined;
  ComicDetails: undefined;
  Chapter: undefined;
  Find: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomMenu}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ComicList" component={ComicListScreen} />
    </Stack.Navigator>
  );
}

function ComicListScreen({ navigation }: ComicListScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Main")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Main")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      {/* <TabBar navigation={navigation} /> */}
    </View>
  );
}
