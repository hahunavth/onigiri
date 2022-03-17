import React from 'react'
import { OfflineComicScreenProps } from '../../navigators/StackNav'
import { useAppSelector } from '../../store/hooks'
import { historySelector } from '../../store/historySlice'
import useUpdateCurrentComic from '../../hooks/useUpdateCurrentComic'
import MemoCollapseHeader from '../../components/CollapseHeader/CollapseHeader'

export const OfflineComicScreen = (props: OfflineComicScreenProps) => {
  const { path } = props.route.params
  const { comics, downloadComics } = useAppSelector(historySelector)

  const {} = useUpdateCurrentComic(comics[path])
  console.log('OfflineComicScreen')

  return <MemoCollapseHeader comic={comics[path]} offline={true} />
}
