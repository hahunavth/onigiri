import { InteractionManager } from 'react-native'
import React from 'react'
import { CollapseHeader } from '../../components/CollapseHeader'
import { ComicDetailScreenProps } from 'app/navigators/StackNav'
import { useApiComicDetail } from '../../store/api'
import { useAppDispatch } from '../../store/hooks'
import { homeActions } from '../../store/homeSlice'

//
export const ComicDetailScreen = ({ route }: ComicDetailScreenProps) => {
  const { data } = useApiComicDetail(route.params.path || '')
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      if (data) {
        dispatch(homeActions.setCurrentComic(data))
      }
    })
    return () => {
      interaction.cancel()
      dispatch(homeActions.removeCurrentComic())
    }
  }, [data])

  return <CollapseHeader comic={data} routeParam={route.params.preloadItem} />
}
