import React from 'react'
import { CollapseHeader } from 'app/components/CollapseHeader'
import { ComicDetailScreenProps } from 'app/navigators/StackNav'
import { useApiComicDetail } from 'app/store/api'
import useUpdateCurrentComic from 'app/hooks/useUpdateCurrentComic'

export const ComicDetailScreen = ({ route }: ComicDetailScreenProps) => {
  const { data } = useApiComicDetail(route.params.path || '')

  useUpdateCurrentComic(data)

  return <CollapseHeader comic={data} routeParam={route.params.preloadItem} />
}
