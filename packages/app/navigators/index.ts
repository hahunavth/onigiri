import { createNavigationContainerRef } from '@react-navigation/native'
import { StackNavParamsList } from './StackNav'

export const navigationRef = createNavigationContainerRef<StackNavParamsList>()

// STUB: Wrap navigate function to use autocomplete prop
function wrap<T extends Function>(fn: T): T {
  return <any>function (...args: any) {
    if (navigationRef.isReady()) fn(...args)
  }
}

// STUB: If using js
// export function navigate(name, params) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate();
//   }
// }

// NOTE: Use navigate without call hook
export const navigate = wrap(navigationRef.navigate)
export const goBack = () => {
  navigationRef.canGoBack() && navigationRef.goBack()
}
