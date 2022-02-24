import { View, Text } from 'native-base'
import React from 'react'
import { InteractionManager } from 'react-native'
import { FindByNameResultScreenProps } from '../../navigators/StackNav'
import { useApiFindComic, useApiFindComicByName } from '../../store/api'
import { ComicListVertical } from '../../components/ComicListVertical/ComicListVertical'
import { Loading } from '../../components/Loading'

export const FindByNameResultScreen = (props: FindByNameResultScreenProps) => {
  const { name } = props.route.params

  // FIXME: RESPONSE DATA SHAPE IS UNKNOWN, CHANGE THE SERVER
  const { isLoading, data } = useApiFindComicByName(name)
  // console.log(data?.data ? data?.data[0][0] : null)

  // Interaction
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      setLoading(false)
    })
    return () => {
      interaction.cancel()
    }
  })

  return (
    <View flex={1} bg={'red.100'}>
      <Text>{name}</Text>
      {/* FIXME: ANY HERE */}
      {isLoading || loading ? (
        <Loading text="Fetching" />
      ) : (
        <ComicListVertical list={(data?.data[0] as any) || []} />
      )}
    </View>
  )
}
