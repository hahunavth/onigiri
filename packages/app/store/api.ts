import { resCommentT } from './../types/api'
import { FindOptionT, toIdListStr } from '../utils/findOption'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  ApiResponse_T,
  resChapterDetail_T,
  resComicDetail_T,
  resComicItem_T
} from 'app/types/api'
import fetch from 'isomorphic-fetch'

export const comicApi = createApi({
  reducerPath: 'fetchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hahunavth-express-api.herokuapp.com/api/v1',
    fetchFn: fetch
  }),
  tagTypes: ['FIND_COMIC'],
  endpoints: (builder) => ({
    getRecentlyByPage: builder.query<ApiResponse_T<resComicItem_T[]>, string>({
      query: (page) => {
        console.log('🚀🚀🚀 ~api.ts', `/recently?page=${page}`)
        return `/recently?page=${page}`
      }
    }),
    getTopMonthByPage: builder.query<ApiResponse_T<resComicItem_T[]>, string>({
      query: (page) => {
        console.log('🚀🚀🚀 ~api.ts', `/recently?page=${page}`)
        return `/hot?page=${page}`
      }
    }),
    getTopWeekByPage: builder.query<ApiResponse_T<resComicItem_T[]>, string>({
      query: (page) => {
        return `/find?genres=&notgenres=&gender=-1&status=-1&minchapter=1&sort=12&page=${page}`
      }
    }),
    getHotByPage: builder.query<ApiResponse_T<resComicItem_T[]>, string>({
      query: (page) => {
        console.log('🚀🚀🚀 ~api.ts`', `/hot?page=${page}`)
        return `/hot?page=${page}`
      }
    }),
    getComicDetailByPath: builder.query<resComicDetail_T, string>({
      query: (path) => {
        console.log('🚀🚀🚀 ~api.ts`', `${path}`)
        return `${path}`
      }
    }),
    getChapterByPath: builder.query<ApiResponse_T<resChapterDetail_T>, string>({
      query: (path) => {
        console.log('🚀🚀🚀 ~api.ts`', `${path}`)
        return `${path}`
      }
    }),
    findComic: builder.query<ApiResponse_T<resComicItem_T[]>, FindOptionT>({
      query: (param: FindOptionT) => {
        const getFindPath = () => {
          // Ex: http://www.nettruyenpro.com/tim-truyen-nang-cao?genres=&notgenres=&gender=-1&status=2&minchapter=1&sort=5
          return `genres=${toIdListStr(
            param.genres.map((g) => g.id) as number[]
          )}&gender=${param.forUser?.id || -1}&status=${
            param.status?.id || -1
          }&minchapter=${param.numChapter?.id || -1}&sort=${
            param.sortBy?.id || 0
          }&page=${param.page || 1}`
          // console.log(param.selectedForUser)
        }

        console.log(`🚀  ${getFindPath()}`)
        return `/find?${getFindPath()}`
      },
      providesTags: (result, error, arg) =>
        result?.pagination?.page
          ? [{ type: 'FIND_COMIC', id: result?.pagination.page }, 'FIND_COMIC']
          : ['FIND_COMIC']
    }),
    findByGenres: builder.query<
      ApiResponse_T<resComicItem_T[]>,
      { genres: string | number; page: string | number }
    >({
      query: (param) => {
        return `/find?genres=${param.genres}&notgenres=&gender=-1&status=-1&minchapter=1&sort=0&page=${param.page}`
      }
    }),
    findComicByName: builder.query<ApiResponse_T<resComicItem_T[]>, string>({
      query: (path) => {
        const name = path?.replace(/ /g, '%20')
        console.log('🚀🚀🚀 ~api.ts`', `/find-by-name?name=${name}`)
        return `/find-by-name?name=${name}`
      }
    }),
    getComicComment: builder.query<ApiResponse_T<resCommentT[]>, string>({
      query: (comicPath) => {
        // NOTE: PATH WITHOUT /truyen-tranh
        const comicSlug = comicPath.replace('/truyen-tranh', '')
        console.log('🚀 ~ file: api.ts ~ ', `/comic-comment${comicSlug}`)
        return `/comic-comment${comicSlug}`
      }
    })
  })
})

export const useApiRecently = comicApi.endpoints.getRecentlyByPage.useQuery
export const useApiTopMonth = comicApi.endpoints.getTopMonthByPage.useQuery
export const useApiTopWeek = comicApi.endpoints.getTopWeekByPage.useQuery

export const useApiHot = comicApi.endpoints.getHotByPage.useQuery

export const useApiComicDetail =
  comicApi.endpoints.getComicDetailByPath.useQuery

export const useApiChapter = comicApi.endpoints.getChapterByPath.useQuery

export const useApiFindComic = comicApi.endpoints.findComic.useQuery
export const useApiFindComicByName = comicApi.endpoints.findComicByName.useQuery

export const useApiFindByGenres = comicApi.endpoints.findByGenres.useQuery

export const useApiComicComment = comicApi.endpoints.getComicComment.useQuery

export const usePrefetch = comicApi.usePrefetch
