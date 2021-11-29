export const API_URL =  "https://hahunavth-express-api.herokuapp.com/api/v1/"

// "https://hahunavth-express-api.herokuapp.com/api/v1/recently"

export type resComicItem_T = {
  kind?: string;
  author?: string;
  status?: string;
  views?: string;
  follows?: string;
  updateAt?: string;
  name?: string;
  posterPath?: string;
  path?: string;
  id?: string;
  lastedChapters?: [
    {
      chapterName: string;
      chapterUrl: string;
      updateAt: string;
    }
  ];
};

// "https://hahunavth-express-api.herokuapp.com/api/v1/" + params.path

export type resComicDetail_T = {
  author: string;
  chapterLinks: string[];
  chapterUpdateAt: string[];
  chapterViews: string[];
  chapters: string[];
  detail: string;
  follows: string;
  id: string;
  info: string;
  kind: string[];
  posterUrl: string;
  rete: string;
  status: string;
  title: string;
  views: string;
};

// "https://hahunavth-express-api.herokuapp.com/api/v1/" + path.path

