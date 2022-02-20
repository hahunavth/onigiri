import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { Link } from 'expo-next-react-navigation'
import { LinkProps } from './types'
import { View } from 'native-base'

export const NextLink = (props: LinkProps) => {
  useEffect(() => console.log('rerender'))
  return (
    <TouchableNativeFeedback>
      <View style={props.style}>
        <Link
          {...props}
          touchableOpacityProps={{ activeOpacity: 1 }}
          style={props.linkStyle}
        />
      </View>
    </TouchableNativeFeedback>
  )
}

// import { TouchableNativeFeedback, View } from "react-native";
// import React from "react";
// import { NewLinkProps } from ".";

// // NOTE: LINK COMPONENT IN NEXTJS: NextLink.tsx
// // FOR EXPO, USE FILE: NextLink.native.tsx
// const NextLink = (props: NewLinkProps) => {
//   return (
//     <TouchableNativeFeedback
//       {...props.touchableProps}
//       // children={props.children}
//       // style={{ backgroundColor: "red", padding: 100 }}
//     >
//       <View {...props.viewProps} style={props.style}>
//         {props.children}
//       </View>
//     </TouchableNativeFeedback>
//   );
// };

// export default NextLink;
