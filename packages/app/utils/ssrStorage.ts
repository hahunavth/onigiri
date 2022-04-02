import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/**
 * Using local storage for ssr backend
 * Instead of localStorage or AsyncStorage
 * TODO: change in notification slice and fetch background fn
 */
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    }
  };
};

const storage =
  // @ts-ignore
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
