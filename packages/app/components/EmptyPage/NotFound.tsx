import { View, Text } from "native-base";
import React from "react";
import LottieView from "lottie-react-native";

type Props = {};

export const NotFound = (props: Props) => {
  return (
    <View flex={2}>
      <LottieView
        // ref={animation => {
        //   this.animation = animation;
        // }}
        // style={{
        //   width: 1,
        //   height: 1
        //   // backgroundColor: '#eee'
        // }}
        source={require("app/assets/404-2.json")}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        autoPlay
        loop
        // style={{ marginBottom: 24 }}
        autoSize
        resizeMode="contain"
        renderMode="HARDWARE"
      />
    </View>
  );
};

// FIXME: CHANGE CAUSE RELOAD CRASH
// import { View, Text } from "native-base";
// import { useWindowDimensions, Dimensions, LayoutAnimation } from "react-native";
// import React from "react";
// import LottieView from "lottie-react-native";

// type Props = {};

// const { width, height } = Dimensions.get("window");

// //
// export const NotFound = (props: Props) => {
//   const [h, setH] = React.useState(height);
//   const [w, setW] = React.useState(width);
//   // const { height, width } = useWindowDimensions();

//   React.useEffect(() => {
//     const e = Dimensions.addEventListener("change", ({ screen, window }) => {
//       LayoutAnimation.easeInEaseOut();
//       setH(window.height);
//       setW(window.width);
//     });
//   });

//   return (
//     <View
//       // flex={1}
//       justifyContent={"center"}
//       alignItems={"center"}
//       w={w}
//       h={h}
//     >
//       <LottieView
//         // ref={animation => {
//         //   this.animation = animation;
//         // }}
//         // style={{
//         //   width: 1,
//         //   height: 1
//         //   // backgroundColor: '#eee'
//         // }}
//         source={require("../../assets/404-2.json")}
//         // OR find more Lottie files @ https://lottiefiles.com/featured
//         // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
//         autoPlay
//         loop
//         style={{
//           width: Math.min(width, height),
//           padding: 10,
//           marginBottom: 50,
//           alignSelf: "center"
//         }}
//       />
//     </View>
//   );
// };
