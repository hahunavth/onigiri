import {
  resChapterDetail_T,
  resComicDetailChapterItem_T,
  resComicDetail_T,
  resComicItem_T,
} from "@/types/api";
import { addMultipleImgs } from "@/utils/Download/ImgManager";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  scheduleCustomNotification,
  schedulePushNotification,
} from "./notification";
import { RootState } from "./store";

type saveChapterT = {
  state: "saved" | "unsaved" | "error";
};

type downloadComicChapterItemT = resComicDetailChapterItem_T & saveChapterT;

type downloadComicT = resComicDetail_T;

type downloadChapterDetailT = resChapterDetail_T & {
  // splitPath: string[];
  fileUrls: string[];
  state: "idle" | "loading" | "success";
};

interface initialStateT {
  comics: {
    [comicPath: string]: downloadComicT & {
      savedChapter?: {
        [chapterPath: string]: downloadChapterDetailT;
      };
    };
  };
}

/**
 * Params:
 *   chapterPath: /truyen-tranh/abcd-12345/chapter-XX/HASH
 */
export const downloadComicThunk = createAsyncThunk(
  "downloadComicThunk",
  async (
    chapterPath: string,
    { getState, dispatch,signal }
  )=> {
    // get state
    const state = getState() as RootState;

    // get comic and chapter path
    const comicPath = state.home.currentComic?.path;

    // fetch comic and chapter
    const chapterRes = await fetch(
      `https://hahunavth-express-api.herokuapp.com/api/v1${chapterPath}`
    );
    const chapter = (await chapterRes.json())?.data;
    const comicRes = await fetch(
      `https://hahunavth-express-api.herokuapp.com/api/v1${comicPath}`
    );
    const comic = (await comicRes.json());

    console.log(comic, comicRes)

    // handle request error
    if (!comic) throw Error("Can't get comic");
    if (!chapter) throw Error("Can't get chapter");

    // console.log("🚀 ~ file: downloadSlice.ts ~ line 49 ~ chapter", chapter);
    await scheduleCustomNotification({
      content: {
        title: "Download comic",
        body: "Start download",
        data: { data: "goes here" },
      },
      trigger: { seconds: 1 },
    });

    // save image
    const fileUrls = chapter ? await addMultipleImgs(chapter?.images) : [];

    // change state 
    dispatch(downloadSlice.actions.newComic(comic))
    dispatch(downloadSlice.actions.saveChapter({chapter, fileUrls: fileUrls || []}))

    // Success
    await scheduleCustomNotification({
      content: {
        title: "Download comic",
        body: "Done",
        data: { data: "goes here" },
      },
      trigger: { seconds: 1 },
    });
    
    return {
      fileUrls: fileUrls || [],
      chapter: chapter,
    };
  }
);

const initialState: initialStateT = {
  comics: {},
};

const downloadSlice = createSlice({
  name: "download",
  initialState,
  reducers: {
    newComic: function (state, action: PayloadAction<resComicDetail_T | null>) {
      if (!action.payload) {
        console.log(
          "!Ignore action ~ file: downloadSlice.ts ~ line 44 ~ !action.payload",
          !action.payload
        );
        return state;
      }

      const data: resComicDetail_T = action.payload;
      const comicPath: string = data.path?.slice(
        0,
        data.path?.lastIndexOf("-")
      );
      console.log(
        "🚀 ~ file: downloadSlice.ts ~ line 45 ~ comicPath",
        comicPath
      );

      if (state.comics[comicPath]) {
        console.log("🚀 ~ file: downloadSlice.ts ~ line 48 ~ comicPath: ezsts");
      }

      if (comicPath) {
        state = { ...state, comics: { ...state.comics, [comicPath]: data } };
      }

      return state;
    },

    saveChapter: (
      state,
      action: PayloadAction<{
        chapter: resChapterDetail_T | undefined;
        fileUrls: string[];
      }>
    ) => {
      // Check Params
      // if fileUrl is empty
      if (action.payload.fileUrls.length === 0) {
        console.log(
          "!!! ~ file: downloadSlice.ts ~ line 64 ~ fileUrls empty ???"
        );
        return state;
      }
      // if not have chapter params
      if (!action.payload.chapter) return state;

      // combine data
      const data: downloadChapterDetailT = {
        ...action.payload.chapter,
        fileUrls: action.payload.fileUrls,
        state: "success",
      };

      // get comic and chapter path
      const chapterPath = data?.path;
      const comicPath = chapterPath?.slice(0, chapterPath.indexOf("/chap-"));

      // check if comic is saved -> add chapter
      if (state.comics[comicPath]) {
        state.comics[comicPath].savedChapter = {
          ...state.comics[comicPath].savedChapter,
          [chapterPath]: data,
        };
      } else {
        console.log("state.comics[" + comicPath + "]" + "not found");
      }

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(downloadComicThunk.fulfilled, (state, action) => {
      console.log(action.payload)
      return state;
    });
    builder.addCase(downloadComicThunk.rejected, (state, action) => {
      return state;
    });
    builder.addCase(downloadComicThunk.pending, (state, action) => {
      return state;
    });
  },
});

export default downloadSlice.reducer;

export const downloadAction = downloadSlice.actions;

export const downloadSelector = (state: RootState) => state.download;

// const data: downloadComicT = {
//   ...action.payload,
//   chapters,
//   splitPath: action.payload.path?.split("/").filter((a) => a),
// };
// // console.log(data)
// const id = state.comics.findIndex(
//   (comic) =>
//     comic.path?.split("/").filter((a) => a)[2] === data.splitPath[2]
// );
// if (id !== -1) {
//   state.comics[id] = data;
// } else {
//   state.comics.push(data);
// }
// console.log(state.comics.length);
// return { ...state };

// const chapter: downloadChapterDetailT = {
//   ...action.payload.chapter,
//   state: "success",
//   fileUrls: action.payload.fileUrls,
//   splitPath: action.payload.chapter.path?.split("/").filter((a) => a),
// };

// if (chapter.splitPath.length === 4) {
//   const id = state.chapters.findIndex((item) => {
//     return (
//       item?.splitPath[2] === chapter?.splitPath[2] &&
//       item?.splitPath[1] === chapter?.splitPath[1]
//     );
//   });

//   if (id > -1) state.chapters[id] = chapter;
//   else
//     state = {
//       ...state,
//       chapters: [...state.chapters, chapter],
//     };
// }
