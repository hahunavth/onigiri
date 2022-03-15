import { FlatList, Text, View } from 'native-base'
import React from 'react'
import { TouchableNativeFeedback, ListRenderItemInfo } from 'react-native'
import { ComicListVertical } from 'app/components/ComicListVertical'
import {
  useApiLazyRecently,
  useApiLazyHot,
  useApiLazyTopWeek
} from 'app/store/api'
import { resComicItem_T } from 'app/types'

const genHookFn = (hook: typeof useApiLazyRecently) => {
  return () => {
    const shouldReset = React.useRef(true)
    const maxPage = React.useRef(0)
    const [results, setResults] = React.useState<resComicItem_T[]>([])
    const [trigger, result] = hook()

    React.useEffect(() => {
      trigger('1')
    }, [])

    // useEffect(() => {
    // shouldReset.current = true;
    // trigger({ query, page: 1 });
    // }, [query]);

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
      page: result.data?.pagination?.page,
      maxPage,
      results,
      fetchNextPage
    }
  }
}

//
export const useApiInfinityRecently = genHookFn(useApiLazyRecently)
export const useApiInfinityHot = genHookFn(useApiLazyHot)
export const useApiInfinityTopWeek = genHookFn(useApiLazyTopWeek)

//
