export const API_URL =  "https://hahunavth-express-api.herokuapp.com/api/v1/"

export type ApiRespone_T<T> = {
  data: T,
  success?: string;
  paginate?: {
    page: number,
    limit: number
  }
}

// "https://hahunavth-express-api.herokuapp.com/api/v1/recently"

export type resComicItem_T = {
  kind?: string[];
  author?: string;
  anotherName?: string;
  status?: string;
  views?: string;
  follows?: string;
  updateAt?: string;
  updatedDistance?: string;
  name?: string;
  posterUrl?: string;
  path?: string;
  id?: string;
  lastedChapters?: [
    {
      chapterName: string;
      chapterUrl: string;
      updatedAt: string;
      updatedDistance: string;
    }
  ];
};

// "https://hahunavth-express-api.herokuapp.com/api/v1/" + params.path

export type resComicDetail_T = {
  title: string;
  posterUrl: string;
  status: string;
  author: string;
  kind: string[];
  info: string;
  rate: string;
  views: string;
  follows: string;
  detail: string;
  id?: string;
  chapters: resComicDetailChapterItem_T[],
};

export type resComicDetailChapterItem_T = {
  name: string;
  updatedAt: string;
  url: string;
  path: string;
  updatedDistance: string;
  updatedVew: string; // NOTE: api forgot name
}

// "https://hahunavth-express-api.herokuapp.com/api/v1/" + path.path
