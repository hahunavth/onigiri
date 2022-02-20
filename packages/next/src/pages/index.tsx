import { ListHeader } from 'app/components/ListHeader'
import {View } from 'native-base'
import {FlatlistBanner} from 'app/components/Banner'
import  {NavBar} from 'app/components/NavBar.web'
import  {ComicGridGap3} from 'app/components/ComicGridGap3'
import {useApiHot} from 'app/store/api'

export default function Page() {

  const {data} = useApiHot("1")

  return (
    <View>
      <NavBar/>
      <ListHeader name={'Recently'}/>
      <FlatlistBanner/>
      // <ComicGridGap3 list={data?.data || []}/>
    </View>
    )
}
