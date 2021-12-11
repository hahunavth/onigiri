import { ApiRespone_T, resComicItem_T } from '@/types/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const comicApi = createApi({
  reducerPath: 'fetchRe',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hahunavth-express-api.herokuapp.com/api/v1' }),
  endpoints: (builder) => ({
    getRecentlyByPage: builder.query<ApiRespone_T<resComicItem_T[]>, string>({
      query: (page) => `/recently?page=${page}`,
    }),
    getHotByPage: builder.query<ApiRespone_T<resComicItem_T[]>, string>({
      query: (page) => `/hot?page=${page}`,
    }),
  }),
})

export const useApiRecently = comicApi.endpoints.getRecentlyByPage.useQuery;