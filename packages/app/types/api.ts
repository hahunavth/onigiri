export const API_URL = 'https://hahunavth-express-api.herokuapp.com/api/v1/'

export type ApiResponse_T<T> = {
  data: T
  success?: string | boolean
  pagination?: {
    page: number
    limit?: number
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
  views?: number
  follows?: number
  updatedAt?: string
  updatedDistance?: string
  posterUrl?: string
  id?: string
  description: string
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
  info: number
  rate: number
  views: number
  follows: number
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
  updatedVew: number
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

// NOTE: EXAMPLE
// {
//   "id": "jid-5950793",
//   "username": "Người đàn ông tốt",
//   "avatarUrl": "//s.nettruyenmoi.com/Data/SiteImages/anonymous.png",
//   "abbr": "9/2/2019 9:40:50 AM",
//   "datednf": "09:40 02/09/19",
//   "chapterName": "Chapter 1",
//   "content": "á đù truyện này có cậu Vàng à?",
//   "reply": [
//     {
//       "id": "cmt-5950821",
//       "username": "Mun",
//       "abbr": "9/2/2019 9:44:26 AM",
//       "datednf": "09:44 02/09/19",
//       "content": ""
//     },
//     {
//       "id": "cmt-5950832",
//       "username": "Mun",
//       "abbr": "9/2/2019 9:45:25 AM",
//       "datednf": "09:45 02/09/19",
//       "content": "Cậu Vàng đóng phim ko đủ tiền nên nhập truyện thêm lương =))))"
//     }
//   ]
// }

export type resCommentReplyT = {
  id: string
  username: string
  avatarUrl: string
  abbr: string
  datednf: string
  content: string
}

export type resCommentT = {
  id: string
  username: string
  avatarUrl: string
  abbr: string
  datednf: string
  chapterName?: string
  content: string
  reply: resCommentReplyT[]
}

// {
//   path: '/truyen-tranh/saigo-ni-hitotsu-dake-onegaishite-mo-yoroshii-desu-ka-23510',
//   posterUrl: 'https://st.nettruyenmoi.com/data/comics/214/saigo-ni-hitotsu-dake-onegaishite-mo-yor-8089.jpg',
//   name: 'Saigo ni Hitotsu Dake Onegaishite mo Yoroshii Desu ka?',
//   lastedChapter: 'Chapter 1',
//   detail: 'May I Please Ask You Just One Last Thing? -',
//   author: 'HOONOKI Sora - Nana Otori',
//   kind: [ 'Comedy', 'Drama', 'Martial Arts', 'Romance' ]
// }

export type resComicSuggestSearchT = {
  path: string
  posterUrl: string
  name: string
  lastedChapter: string
  detail: string
  author: string
  kind: string[]
}
