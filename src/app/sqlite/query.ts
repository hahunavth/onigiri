import { resComicItem_T } from "@/types/api";
import { SQLTransaction } from "expo-sqlite";

export class SqlQuery {
  static insertComicItem(tx: SQLTransaction, item: resComicItem_T) {
    const query = `
      INSERT INTO "main"."ComicItem"
        ("name","path","kind","author","anotherName","status","views","follows","updateAt","updateDistance","posterUrl") 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    return tx.executeSql(
      query,
      [
        item.name || "",
        item.path || "",
        item.kind?.reduce((prev, curr, id) => prev + ", " + curr, "") || "",
        item.author || "",
        item.anotherName || "",
        item.status || "",
        Number.parseInt(item.views?.replace(".", "") || "") || 0,
        Number.parseInt(item.follows?.replace(".", "") || ""),
        item.updatedAt || "",
        item.updatedDistance || "",
      ],
      (txObj, rs) => {
        console.log(rs);
      },
      (txObj, error) => {
        console.log(error);
        return true;
      }
    );
  }

  static selectComicItem(tx: SQLTransaction) {
    const query = `SELECT * FROM "ComicItem"`;
    return tx.executeSql(
      query,
      undefined, // passing sql query and parameters:null
      // success callback which sends two things Transaction object and ResultSet Object
      (txObj, { rows: { _array } }) => console.log({ data: _array }),
      // failure callback which sends two things Transaction object and Error
      (txObj, error) => {
        console.log("Error ", error);
        return true;
      }
    );
  }
}
