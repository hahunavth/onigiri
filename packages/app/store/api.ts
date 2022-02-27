import { FindOptionT, toIdListStr } from './../screens/DiscoverScreen/constants'
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
      }
    }),
    findComicByName: builder.query<ApiResponse_T<resComicItem_T[]>, string>({
      query: (path) => {
        console.log('🚀🚀🚀 ~api.ts`', `${path}`)
        return `/find-by-name?name=${path}`
      }
    })
  })
})

export const useApiRecently = comicApi.endpoints.getRecentlyByPage.useQuery
export const useApiTopMonth = comicApi.endpoints.getTopMonthByPage.useQuery

export const useApiHot = comicApi.endpoints.getHotByPage.useQuery

export const useApiComicDetail =
  comicApi.endpoints.getComicDetailByPath.useQuery

export const useApiChapter = comicApi.endpoints.getChapterByPath.useQuery

export const useApiFindComic = comicApi.endpoints.findComic.useQuery
export const useApiFindComicByName = comicApi.endpoints.findComicByName.useQuery

export const usePrefetch = comicApi.usePrefetch
