import { resChapterDetail_T } from './../types/api'
import { homeActions, homeSelector } from '../store/homeSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import useInteraction from './useInteraction'
import { historyAction } from '../store/historySlice'

type Param = {
  chapterDetail: resChapterDetail_T | undefined
  isFetching: boolean
  id: number | undefined
  callback?: () => any
  cleanupCallback?: () => any
}

export default function useUpdateCurrentChapter(param: Param) {
  const { chapterDetail, isFetching, id } = param
  const home = useAppSelector(homeSelector)
  const dispatch = useAppDispatch()
  const { loading } = useInteraction({
    dependencyList: [isFetching, chapterDetail],
    callback: () => {
      if (!isFetching && chapterDetail) {
        dispatch(
          homeActions.setCurrentChapter({
            ...chapterDetail,
            id: id !== undefined ? id : -1
          })
        )
        if (home.currentComic) {
          // console.log('setcomic')
          dispatch(historyAction.pushReadComic(home.currentComic))
          dispatch(
            historyAction.pushChapter({
              comicPath: home.currentComic?.path,
              chapterPath: chapterDetail.path
            })
          )
          console.log(home.currentComic?.path, chapterDetail?.path)

          // NOTE: SPLASH ANIMATION ON RENDER
        }
        param.callback && param.callback()
      }
    },
    cleanupCallback: () => {
      dispatch(homeActions.removeCurrentChapter())
      param.cleanupCallback && param.cleanupCallback()
    }
  })

  return { loading }
}

// NOTE: PREV
// const home = useAppSelector(homeSelector)

//   const { data, isLoading, isFetching } = useApiChapter(path)
//   const dispatch = useAppDispatch()
//   const chapterInfo = data?.data

//   const [imgs, setImgs] = React.useState<{ uri: string; h: number }[]>([])
//   useEffect(() => {
//     if (!imgs.length) {
//       setImgs(chapterInfo?.images.map((uri) => ({ uri, h: 0 })) || [])
//     }
//     // console.log(imgs)
//   }, [isFetching])

//   useEffect(() => {
//     const interaction = InteractionManager.runAfterInteractions(() => {
//       if (!isFetching && data) {
//         dispatch(homeActions.setCurrentChapter({ ...data?.data, id: id }))
//         if (home.currentComic) {
//           // console.log('setcomic')
//           dispatch(historyAction.pushReadComic(home.currentComic))
//           dispatch(
//             historyAction.pushChapter({
//               comicPath: home.currentComic?.path,
//               chapterPath: data?.data.path
//             })
//           )
//           console.log(home.currentComic?.path, data.data.path)

//           // NOTE: SPLASH ANIMATION ON RENDER
//         }
//         splashOffset.value = 1
//       }
//     })
//     return () => {
//       interaction.cancel()
//       dispatch(homeActions.removeCurrentChapter())
//     }
//   }, [isFetching, data])
