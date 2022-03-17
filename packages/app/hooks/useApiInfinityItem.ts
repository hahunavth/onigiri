import { useApiFindByGenres } from './../store/api'
import React from 'react'
import {
  useApiLazyRecently,
  useApiLazyHot,
  useApiLazyTopWeek,
  useApiLazyFindByGenres,
  useApiLazyFindComic,
  useApiLazyFindComicByName
} from 'app/store/api'

import type {
  UseQuery,
  UseLazyQuery,
  QueryHooks
} from '@reduxjs/toolkit/dist/query/react/buildHooks'
import type { QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import type { resComicItem_T } from 'app/types'
import { FindOptionT } from '../utils/findOption'

type genFNReturnT<T> = {
  page: string | number
  maxPage: string | number
  results: T[]
  fetchNextPage: () => any
}

type genCustomFNReturnT<T> = {
  page: string | number
  maxPage: string | number
  results: T[]
  fetchNextPage: () => any
}

// const [trigger, result, promiseInfo] = useApiLazyFindByGenres({})
// trigger({})
function genHookWithCustomParamFN<T, U>(
  useLazyHook: UseLazyQuery<any>
): (param: T) => genCustomFNReturnT<U> | null {
  return (param: T) => {
    const shouldReset = React.useRef(true)
    const maxPage = React.useRef(0)
    const [results, setResults] = React.useState<U[]>([])
    // @ts-ignore
    const [trigger, result] = useLazyHook()
    // @ts-ignore
    const p = result?.data.pagination as any
    // @ts-ignore
    const r = (result.data?.data || []) as unknown[]
    React.useEffect(() => {
      // @ts-ignore
      trigger({
        ...param,
        page: '1'
      })
    }, [])

    React.useEffect(() => {
      if (!result.isSuccess) return

      if (shouldReset.current) {
        shouldReset.current = false
        p?.max && (maxPage.current = p?.max)
        setResults(r as U[])
      } else {
        setResults([...results, ...(r as U[])])
      }
    }, [result.data])

    const fetchNextPage = React.useCallback(() => {
      const page = p?.page
      console.log('end', page)
      if (page && page < maxPage.current) {
        // @ts-ignore
        trigger({
          ...param,
          page: page + 1
        })
      }
    }, [result.data])

    return {
      page: p?.page || '',
      maxPage: maxPage.current,
      results,
      fetchNextPage
    }
  }
}

/**
 * GENERATE INFINITY SCROLL HOOKS
 * @param useLazyHook useLazyQuery with 1 param is page<string>
 * @returns infinity query hook
 */
const genHookFN = (
  useLazyHook: typeof useApiLazyRecently
): (() => genFNReturnT<resComicItem_T>) => {
  return () => {
    const shouldReset = React.useRef(true)
    const maxPage = React.useRef(0)
    const [results, setResults] = React.useState<resComicItem_T[]>([])
    const [trigger, result] = useLazyHook()

    React.useEffect(() => {
      trigger('1')
    }, [])

    React.useEffect(() => {
      if (!result.isSuccess) return

      if (shouldReset.current) {
        shouldReset.current = false
        result.data.pagination?.max &&
          (maxPage.current = result.data.pagination?.max)
        setResults(result.data?.data || [])
      } else {
        setResults([...results, ...result.data?.data])
      }
    }, [result.data])

    const fetchNextPage = React.useCallback(() => {
      const page = result.data?.pagination?.page
      console.log('end', page)
      if (page && page < maxPage.current) {
        trigger((page + 1).toString())
      }
    }, [result.data])

    return {
      page: result.data?.pagination?.page || '',
      maxPage: maxPage.current,
      results,
      fetchNextPage
    }
  }
}

// NOTE: EXPORT
export const useApiInfinityRecently = genHookFN(useApiLazyRecently)
export const useApiInfinityHot = genHookFN(useApiLazyHot)
export const useApiInfinityTopWeek = genHookFN(useApiLazyTopWeek)
//
export const useApiInfinityFindByGenres = genHookWithCustomParamFN<
  { genres: string | number; page: string | number },
  resComicItem_T[]
>(useApiLazyFindByGenres)
export const useApiInfinityFindComic = genHookWithCustomParamFN<
  FindOptionT,
  resComicItem_T[]
>(useApiLazyFindComic)
// FIXME: DATA SHAPE
export const useApiInfinityFindComicByName = genHookWithCustomParamFN<
  any,
  resComicItem_T[]
>(useApiLazyFindComicByName)
//
