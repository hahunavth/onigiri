import { createNavigationContainerRef } from "@react-navigation/native";
import { BottomTabNavigatorParamList } from "./Main/BottomMenu";
import { RootStackParamList } from "./StackNavigator";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// STUB: Wrap navigate function to use autocomplete prop
function wrap<T extends Function>(fn: T): T {
  return <any>function (...args: any) {
    if (navigationRef.isReady())
     fn(...args);
  };
}
// STUB: If use js
// export function navigate(name, params) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate();
//   }
// }

// NOTE: Use navigate without call hook
export const navigate = wrap(navigationRef.navigate);

export * from "./StackNavigator";
export * from "./Main/BottomMenu";
