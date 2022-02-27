import { View, Text } from 'native-base'
import React from 'react'
import { InteractionManager } from 'react-native'
import { FindByNameResultScreenProps } from '../../navigators/StackNav'
import { useApiFindComic, useApiFindComicByName } from '../../store/api'
import { ComicListVertical } from '../../components/ComicListVertical/ComicListVertical'
import { Loading } from '../../components/Loading'
import useInteraction from '../../hooks/useInteraction'

export const FindByNameResultScreen = (props: FindByNameResultScreenProps) => {
  const { name } = props.route.params

  // FIXME: RESPONSE DATA SHAPE IS UNKNOWN, CHANGE THE SERVER
  const { isLoading, data } = useApiFindComicByName(name)
  // console.log(data?.data ? data?.data[0][0] : null)

  const { loading } = useInteraction({})

  return (
    <View flex={1}
       >
      {/* <Text>{name}</Text> */}
      {isLoading || loading ? (
        <Loading text="Fetching" />
      ) : (
        <ComicListVertical list={(data?.data) || []} />
      )}
    </View>
  )
}
