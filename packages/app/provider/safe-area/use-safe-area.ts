import { useSafeAreaInsets } from "react-native-safe-area-context";

const useAppSafeAreaInsets = useSafeAreaInsets;

// `export { useSafeAreaInsets as useSafeArea }` breaks autoimport, so do this instead
export { useAppSafeAreaInsets };
