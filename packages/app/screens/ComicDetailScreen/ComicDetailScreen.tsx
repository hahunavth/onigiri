import React from 'react'
import  { CollapseHeader } from 'app/components/CollapseHeader'
import MemoCollapseHeader from 'app/components/CollapseHeader/CollapseHeader'
import { ComicDetailScreenProps } from 'app/navigators/StackNav'
import { useApiComicDetail } from 'app/store/api'
import useUpdateCurrentComic from 'app/hooks/useUpdateCurrentComic'
import usePrevious from 'react-use/esm/usePrevious'

export const ComicDetailScreen = (props: ComicDetailScreenProps) => {
  const { path, preloadItem } = props.route.params
  const { data } = useApiComicDetail(path || '')
  // const prev = usePrevious(props.route)
  // console.log('ComicDetailScreen', prev === props.route)

  useUpdateCurrentComic(data)

  return <MemoCollapseHeader
   comic={data} routeParam={preloadItem}
   />
}

/**
  * FIX: Rerender when navigate in tabbar?
  */
