import { View, Text, InteractionManager } from 'react-native'
import React from 'react'
import { CollapseHeader } from '../../components/CollapseHeader'
import { OfflineComicScreenProps } from '../../navigators/StackNav'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { historySelector } from '../../store/historySlice'
import { homeActions } from '../../store/homeSlice'

export const OfflineComicScreen = (props: OfflineComicScreenProps) => {
  const { path } = props.route.params
  const { comics, downloadComics } = useAppSelector(historySelector)
  // TODO: HANDLE NOT IN DOWNLOAD COMIC

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      if (comics[path]) {
        dispatch(homeActions.setCurrentComic(comics[path]))
      }
    })
    return () => {
      interaction.cancel()
      dispatch(homeActions.removeCurrentComic())
    }
  }, [path])

  return <CollapseHeader comic={comics[path]} offline={true} />
}
