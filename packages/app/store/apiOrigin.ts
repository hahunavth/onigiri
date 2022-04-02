import { resCommentT } from "app/types/api";
import { FindOptionT, toIdListStr } from "app/utils/findOption";
import {
  fetchBaseQuery,
  createApi,
  BaseQueryFn
} from "@reduxjs/toolkit/query/react";
import fetch from "cross-fetch";
// import fetch from 'isomorphic-fetch'
// @ts-ignore
import DomParser from "react-native-html-parser";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
// @ts-ignore
// import cheerio from 'cheerio-without-node-native'

// REVIEW: AXIOS BASE QUERY
type QueryParamT = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
};

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<QueryParamT, unknown, unknown> =>
  async ({ url, method, data }: QueryParamT = { method: "GET", url: "" }) => {
    try {
      const result = await axios.request({
        url: baseUrl + url,
        method,
        data,
        // headers: { referer: 'www.nettruyenpro.com' }
        headers: {
          host: "www.nettruyenmoi.com"
          // 'user-agent':
          // 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36'
        }
      });
      // console.log(result.status)
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data }
      };
    }
  };

export const originApi = createApi({
  reducerPath: "fetchApiOrigin",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://www.nettruyenmoi.com',
  //   fetchFn: fetch,
  //   headers: {
  //     referer: 'https://www.nettruyenpro.com'
  //   }
  //   // // method: 'GET',
  //   // referrer: 'https://www.nettruyenpro.com'
  // }),
  baseQuery: axiosBaseQuery({
    baseUrl: "http://www.nettruyenmoi.com"
  }),
  endpoints: (builder) => {
    return {
      getRecentlyByPage: builder.query<string, string>({
        query: (page) => {
          // console.log('🚀 ~ file: apiOrigin.ts ~ line 18 ~ getRecentlyByPage')
          return {
            url: `/?page=${page}`,
            method: "GET"
          };
        },

        transformResponse: (html: string) => {
          // console.log(html)
          // let doc = new DomParser().parseFromString(html, 'text/html')
          // var DOMParser = require('react-native-html-parser').DOMParser
          // let doc = new DOMParser().parseFromString(html, 'text/html')
          // console.log(doc)

          // const $ = require('cheerio-without-node-native').load(html)
          // console.log($)
          return html;
        }
      })
    };
  }
});

//
export const useApiOriginRecently =
  originApi.endpoints.getRecentlyByPage.useQuery;
