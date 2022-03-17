import { TouchableOpacity, ToastAndroid } from 'react-native'
import { View, Text, Toast } from 'native-base'
import React from 'react'
import { useAppDispatch } from '../../store/hooks'
import { fetchNewChapterNotificationThunk } from '../../store/notificationSlice'

type Props = {}

export const NotificationHeaderRefreshBtn = (props: Props) => {
  const dispatch = useAppDispatch()

  return (
    <TouchableOpacity
      onPress={() => {
        ToastAndroid.show('Refreshing', 300)
        dispatch(fetchNewChapterNotificationThunk()).then(() =>
          ToastAndroid.show('Done!', 300)
        )
      }}
    >
      <Text color={'$light.textPrimary'} fontFamily={'mono'}>
        Refresh
      </Text>
    </TouchableOpacity>
  )
}
