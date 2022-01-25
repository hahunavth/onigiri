import * as SQLite from "expo-sqlite";
export const db = SQLite.openDatabase("db.testDb");

export const CREATE_TABLE = `

CREATE IF NOT EXISTS TABLE "ComicItems" (
	"name"	TEXT NOT NULL,
	"path"	TEXT NOT NULL PRIMARY KEY,
	"kind"	TEXT,
	"author"	TEXT,
	"anotherName"	TEXT,
	"status"	TEXT,
	"views"	INTEGER,
	"follows"	INTEGER,
	"updateAt"	TEXT,
	"updateDistance"	TEXT,
	"posterUrl"	TEXT,
  "_createdAt" TIMESTAMP
  DEFAULT CURRENT_TIMESTAMP,
  "_updatedAt" TIMESTAMP
  DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "ComicDetails" (
  "path" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "posterUrl" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "author" TEXT NOT NULL,
  "info" TEXT NOT NULL,
  "rate" INTEGER NOT NULL,
  "views" INTEGER NOT NULL,
  "follows" INTEGER NOT NULL,
  "detail" TEXT NOT NULL,
  "_createdAt" TIMESTAMP
  DEFAULT CURRENT_TIMESTAMP,
  "_updatedAt" TIMESTAMP
  DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS "ComicDetailsChapterItem" (
  "comicPath" TEXT NOT NULL,
  "path" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "updatedDistance" TEXT NOT NULL,
  "_createdAt" TIMESTAMP
  DEFAULT CURRENT_TIMESTAMP,
  "_updatedAt" TIMESTAMP
  DEFAULT CURRENT_TIMESTAMP
);

`;

const INSERT_COMIC_ITEM = `
  INSERT INTO "main"."ComicItem"
    ("name","path","kind","author","anotherName","status","views","follows","updateAt","updateDistance","posterUrl") 
  VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
