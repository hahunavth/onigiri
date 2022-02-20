import { historySelector } from 'app/store/historySlice'
import { useAppSelector } from 'app/store/hooks'
import { navigate } from 'app/navigators'
import { resComicDetailChapterItem_T } from 'app/types'
import React, { FC, memo, useMemo } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableNativeFeedback,
  TouchableNativeFeedbackBase,
  TouchableOpacityProps,
  View,
  ViewProps
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import QuicksandText, { QFontFamily } from "../Common/QuicksandText";

export const PHOTO_SIZE = 40

//
type Props = Pick<TouchableOpacityProps, 'style'> & {
  chapter: resComicDetailChapterItem_T
  id: number
  // visited?: boolean;
  readCptObj?: {
    [path: string]: number
  }
}

const ConnectionItem: FC<Props> = ({
  style,
  chapter: connection,
  id,
  // visited,
  readCptObj
}) => {
  const { path, updatedDistance, name } = connection

  const mergedStyle = useMemo(() => [styles.container, style], [style])

  // const visited = useMemo(() => readCptObj && readCptObj[path], [path]);

  const visited = !!useAppSelector(historySelector).readCpt[path]

  return (
    <TouchableNativeFeedback
      style={mergedStyle}
      onPress={() =>
        navigate('chapter', {
          id: id,
          path: connection.path,
          name: connection.name
        })
      }
    >
      <View style={mergedStyle}>
        {/* <Image style={styles.image} source={{ uri: photo }} /> */}
        <Text style={[styles.name, visited ? { color: 'purple' } : null]}>
          {name}
        </Text>
        <Text style={{ color: '#ccc' }}>{updatedDistance}</Text>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between'
  },
  image: {
    height: PHOTO_SIZE,
    width: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2
  },
  name: {
    marginLeft: 8,
    fontSize: 15
    // fontFamily: QFontFamily.Quicksand_600SemiBold,
  }
})

export default memo(ConnectionItem)
