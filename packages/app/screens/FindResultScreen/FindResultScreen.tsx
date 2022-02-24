import { View, Text } from 'native-base'
import { FindResultScreenProps } from '../../navigators/StackNav'
import { API_URL } from '../../types'
import axios from 'axios'
import { useApiFindComic } from '../../store/api'
import { ComicListVertical } from '../../components/ComicListVertical/ComicListVertical'
import { useColorModeStyle } from '../../hooks/useColorModeStyle'
import { Loading } from '../../components/Loading'
import React from 'react'
import { InteractionManager } from 'react-native'

export const FindResultScreen = (props: FindResultScreenProps) => {
  const { findOption, path } = props.route.params

  // const result = axios
  //   .get(
  //     `http://www.nettruyengo.com${path}`
  //     // {
  //     //   headers: { referer: 'http://www.nettruyenpro.com' }
  //     // }
  //   )
  //   // .then((res) => res.json())
  //   .then((data) => console.log(data.data))
  // console.log(`http://www.nettruyenpro.com${path}`)
  // const colorStyled = useColorModeStyle('', 'Secondary')

  const [page, setPage] = React.useState(1)

  const { isSuccess, isLoading, data } = useApiFindComic({
    ...findOption,
    page: 1
  })

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      // console.log('object')
      setLoading(false)
    })
    return () => {
      interaction.cancel()
    }
  })

  return (
    <View flex={1}>
      {isLoading || loading ? (
        <Loading text="Fetching" />
      ) : (
        <ComicListVertical list={data?.data || []} />
      )}
    </View>
  )
}
