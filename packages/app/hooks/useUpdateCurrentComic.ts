import { homeActions } from 'app/store/homeSlice'
import { useAppDispatch } from '../store/hooks'
import { resComicDetail_T } from './../types/api'
import useInteraction from './useInteraction'

/**
 * Call hooks when visit comic detail information and this page has link to other page use common comicDetail in  store
 * @param comicDetail
 * @returns loadingState
 */
export default function useUpdateCurrentComic(comicDetail?: resComicDetail_T) {
  const dispatch = useAppDispatch()

  const { loading, setLoading, result } = useInteraction({
    dependencyList: [comicDetail],
    callback: () => {
      comicDetail && dispatch(homeActions.setCurrentComic(comicDetail))
    },
    cleanupCallback: () => dispatch(homeActions.removeCurrentComic())
  })

  return {
    loading
  }
}

// NOTE: PREV
// React.useEffect(() => {
//   const interaction = InteractionManager.runAfterInteractions(() => {
//     if (data) {
//       dispatch(homeActions.setCurrentComic(data))
//     }
//   })
//   return () => {
//     interaction.cancel()
//     dispatch(homeActions.removeCurrentComic())
//   }
// }, [data])
