// import Realm from "realm";
// // import ComicItem from "./ComicItem";

// // // Returns the shared instance of the Realm app.
// // export function getRealmApp() {
// //   const appId = "<enter your Realm app ID here>"; // Set Realm app ID here.
// //   const appConfig = {
// //     id: appId,
// //     timeout: 10000,
// //   };
// //   return new Realm.App(appConfig);
// // }

// const RealmOpen = async () => {
//   try {
//     const realm = await Realm.open({
//       schema: [ComicItem],
//     });
//     realm.close();
//   } catch (err: any) {
//     console.error("Failed to open the realm", err.message);
//   }
// };
