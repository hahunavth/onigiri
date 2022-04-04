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
// import DomParser from "react-native-html-parser";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
// @ts-ignore
// import cheerio from "cheerio-without-node-native";

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
          // host: "www.nettruyenone.com"
          // 'user-agent':
          // 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36'
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "Accept-Encoding": "gzip, deflate",
          "Accept-Language":
            "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5,fr-FR;q=0.4,fr;q=0.3",
          "Cache-Control": "no-cache",
          Host: "www.nettruyenone.com",
          Pragma: "no-cache"
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
    baseUrl: "http://www.nettruyenone.com"
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

          // const $ = cheerio.load(html);
          // console.log($);
          return html;
        }
      }),
      getChapterDetail: builder.query<string, any>({
        query: (a) => {
          return {
            url: `/truyen-tranh/tinh-yeu-duy-nhat-cua-toi-43848`,
            method: "GET"
          };
        }
        // transformResponse: (html: string) => {
        //   // console.log(html)
        //   // let doc = new DomParser().parseFromString(html, 'text/html')
        //   // var DOMParser = require('react-native-html-parser').DOMParser
        //   // let doc = new DOMParser().parseFromString(html, 'text/html')
        //   // console.log(doc)

        //   // const $ = cheerio.load(html);
        //   // console.log($);
        //   return html;
        // }
      })
    };
  }
});

//
export const useApiOriginRecently =
  originApi.endpoints.getRecentlyByPage.useQuery;
export const useApiOriginComicDetail =
  originApi.endpoints.getChapterDetail.useQuery;
