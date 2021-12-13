import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRespone_T, resComicDetail_T, resComicItem_T } from '@/types/api'


export const comicApi = createApi({
  reducerPath: 'fetchRe',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hahunavth-express-api.herokuapp.com/api/v1' }),
  endpoints: (builder) => ({
    getRecentlyByPage: builder.query<ApiRespone_T<resComicItem_T[]>, string>({
      query: (page) => {
        console.log("🚀🚀🚀 ~api.ts", `/recently?page=${page}`)
        return `/recently?page=${page}`
      },
    }),
    getHotByPage: builder.query<ApiRespone_T<resComicItem_T[]>, string>({
      query: (page) => {
        console.log("🚀🚀🚀 ~api.ts`", `/hot?page=${page}`)
        return `/hot?page=${page}`
      },
    }),
    getComicDetailByPath: builder.query<resComicDetail_T, string>({
      query: (path) => {
        console.log("🚀🚀🚀 ~api.ts`", `${path}`)
        return `${path}`
      }
    }),
    getChapterByPath: builder.query<any, string>({
      query: (path) => {
        console.log("🚀🚀🚀 ~api.ts`", `${path}`)
        return `${path}`
      }
    })
  }),
})

export const useApiRecently = comicApi.endpoints.getRecentlyByPage.useQuery;
export const useApiHot = comicApi.endpoints.getHotByPage.useQuery;
export const useApiComicDetail = comicApi.endpoints.getComicDetailByPath.useQuery;
export const useApiChapter = comicApi.endpoints.getChapterByPath.useQuery;