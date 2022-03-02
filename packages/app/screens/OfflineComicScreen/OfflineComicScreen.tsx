import { View, Text, InteractionManager } from 'react-native'
import React from 'react'
import { CollapseHeader } from '../../components/CollapseHeader'
import { OfflineComicScreenProps } from '../../navigators/StackNav'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { historySelector } from '../../store/historySlice'
import { homeActions } from '../../store/homeSlice'
import useUpdateCurrentComic from '../../hooks/useUpdateCurrentComic'
import { PropsChecker } from '../../utils/PropsChecker'
import MemoCollapseHeader from '../../components/CollapseHeader/CollapseHeader'

export const OfflineComicScreen = (props: OfflineComicScreenProps) => {
  const { path } = props.route.params
  const { comics, downloadComics } = useAppSelector(historySelector)
  // TODO: HANDLE NOT IN DOWNLOAD COMIC

  // const dispatch = useAppDispatch()

  const {} = useUpdateCurrentComic(comics[path])
  console.log('OfflineComicScreen')

  return <MemoCollapseHeader comic={comics[path]} offline={true} />
}

// export const OfflineComicScreen = (props: any) => {
//   console.log('MemoOfflineComicScreen')
//   return (
//     <PropsChecker childrenProps={props}>
//       {(props) => <OfflineComicScreenX {...props} />}
//     </PropsChecker>
//   )
// }
