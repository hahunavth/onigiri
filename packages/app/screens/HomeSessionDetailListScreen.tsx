import HomeSessionDetailList from '../components/HomeSessionDetailList'
import { HomeSessionDetailListScreenProps } from '../navigators/StackNav'

export const HomeSessionDetailListScreen = (
  props: HomeSessionDetailListScreenProps
) => {
  const { type } = props.route.params
  return <HomeSessionDetailList type={type} />
}
