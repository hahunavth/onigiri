import { InteractionManager } from 'react-native'
import React from 'react'
import { CollapseHeader } from '../../components/CollapseHeader'
import { ComicDetailScreenProps } from 'app/navigators/StackNav'
import { useApiComicDetail } from '../../store/api'
import { useAppDispatch } from '../../store/hooks'
import { homeActions } from '../../store/homeSlice'
import useUpdateCurrentComic from '../../hooks/useUpdateCurrentComic'

//
export const ComicDetailScreen = ({ route }: ComicDetailScreenProps) => {
  const { data } = useApiComicDetail(route.params.path || '')
  const dispatch = useAppDispatch()

  const { loading } = useUpdateCurrentComic(data)

  return <CollapseHeader comic={data} routeParam={route.params.preloadItem} />
}
