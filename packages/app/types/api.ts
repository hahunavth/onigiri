export const API_URL = 'https://hahunavth-express-api.herokuapp.com/api/v1/'

export type ApiResponse_T<T> = {
  data: T
  success?: string
  pagination?: {
    page: number
    limit: number
    max: number
  }
}

// "https://hahunavth-express-api.herokuapp.com/api/v1/recently"
// ApiResponse_T<resComicItem_T>
export type resComicItem_T = {
  name?: string
  path?: string
  kind?: string[]
  author?: string
  anotherName?: string
  status?: string
  views?: string
  follows?: string
  updatedAt?: string
  updatedDistance?: string
  posterUrl?: string
  id?: string
  lastedChapters?: [
    {
      chapterName: string
      chapterUrl: string
      updatedAt: string
      updatedDistance: string
    }
  ]
}

// "https://hahunavth-express-api.herokuapp.com/api/v1/" + params.path

export type resComicDetail_T = {
  path: string
  title: string
  posterUrl: string
  status: string
  author: string
  kind: string[]
  info: string
  rate: string
  views: string
  follows: string
  detail: string
  id?: string
  chapters: resComicDetailChapterItem_T[]
}

export type resComicDetailChapterItem_T = {
  id?: number
  name: string
  updatedAt: string
  url: string
  path: string
  updatedDistance: string
  updatedVew: string // NOTE: api forgot name
}

// "https://hahunavth-express-api.herokuapp.com/api/v1/" + path.path
// /truyen-tranh/{id}/{chapterId}/{hash}
// ApiResponse_T<resChapterDetail_T>
export type resChapterDetail_T = {
  title: string
  chapterName: string
  updatedAt: string
  updatedDistance: string
  images: string[]
  chapterList: any[]
  path: string
}
