import React from 'react'
import { Link } from 'expo-next-react-navigation'
import { LinkProps } from './types'

export const NextLink = (props: LinkProps) => {
  return (
    // <TouchableNativeFeedback>
    <Link {...props} />
    // </TouchableNativeFeedback>
  )
}

// // REVIEW: OLD COMPONENT
// import { View, TouchableNativeFeedbackProps, ViewProps } from "react-native";
// import React from "react";
// import Link, { LinkProps } from "next/link";
// import { ViewStyle } from "react-native";

// // NOTE: COMMON TYPE
// export type NewLinkProps = {
//   // SPECIFIC .web FILE
//   viewProps?: ViewProps;
//   linkProps?: LinkProps;
//   href: string;
//   // SPECIFIC .native FILE
//   touchableProps?: TouchableNativeFeedbackProps;
//   // COMMON
//   children: React.ReactNode;
//   style?: ViewStyle;
// };

// // NOTE: LINK COMPONENT IN NEXTJS: NextLink.tsx
// // FOR EXPO, USE FILE: NextLink.native.tsx
// const NextLink = (props: NewLinkProps) => {
//   return (
//     <Link {...props.linkProps} href={props.href}>
//       <View
//         {...props.viewProps}
//         style={[
//           {
//             // @ts-ignore
//             cursor: "pointer",
//           },
//           props.style,
//         ]}
//       >
//         {props.children}
//       </View>
//     </Link>
//   );
// };

// export default NextLink;
