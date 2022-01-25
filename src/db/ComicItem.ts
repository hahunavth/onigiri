import { resComicItem_T } from "@/types/api";
import Realm from "realm";
import { ObjectId } from "bson";

export const COMIC_ITEM = "ComicItem";

export const ComicItem: Realm.ObjectSchema = {
  name: COMIC_ITEM,
  primaryKey: "path",
  properties: {
    // _id: "int",
    path: {
      type: "string",
      indexed: true,
    },
    name: "string",
    status: "string?",
    kind: "string?",
    author: "string?",
    anotherName: "string?",
    views: "string",
    follows: "string",
    updatedAt: "string?",
    updatedDistance: "string?",
    posterUrl: "string",
    _lastedChapter: "string?",
  },
};

/**
 * Database option
 */
export const dbOption: Realm.Configuration = {
  path: "comicnetdb",
  schema: [ComicItem],
  schemaVersion: 0,
};

export const insertComicItem = (item: resComicItem_T) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOption)
      .then((realm) =>
        realm.write(() => {
          realm.create(COMIC_ITEM, item);
          resolve(item);
        })
      )
      .catch((err) => reject(err));
  });

export const updateComicItem = (item: resComicItem_T) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOption)
      .then((realm) =>
        realm.write(() => {
          // realm.create(COMIC_ITEM, item);
          let updatingCI = realm.objectForPrimaryKey(
            COMIC_ITEM,
            item.path || ""
          ) as resComicItem_T;
          updatingCI.status = item.status;
          resolve(undefined);
        })
      )
      .catch((err) => reject(err));
  });

export const deleteComicItem = (path: string) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOption)
      .then((realm) =>
        realm.write(() => {
          let deletingCI = realm.objectForPrimaryKey(
            COMIC_ITEM,
            path || ""
          ) as resComicItem_T;
          realm.delete(deletingCI);
          resolve(undefined);
        })
      )
      .catch((err) => reject(err));
  });

export const deleteAllComicItem = (path: string) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOption)
      .then((realm) =>
        realm.write(() => {
          let allCI = realm.objects(COMIC_ITEM);
          realm.delete(allCI);
          resolve(undefined);
        })
      )
      .catch((err) => reject(err));
  });

export const queryAllComicItem = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOption)
      .then((realm) => {
        let allCI = realm.objects(COMIC_ITEM);
        resolve(allCI);
      })
      .catch((err) => reject(err));
  });

export default new Realm(dbOption);
