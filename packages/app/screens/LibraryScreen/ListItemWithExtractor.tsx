import {
  TouchableOpacity,
  Image,
  ImageStyle,
  StyleSheet,
  ListRenderItemInfo
} from 'react-native'
import { View, Text } from 'native-base'
import React from 'react'
import { HistoryComicT, historySelector } from 'app/store/historySlice'
import { useAppSelector } from 'app/store/hooks'
import { navigate } from 'app/navigators'
import { resComicDetail_T } from 'app/types'
import { useColorModeStyle } from '../../hooks/useColorModeStyle'
import { Box } from 'native-base'

type Param = {
  onPress?: (comic: HistoryComicT) => any
  onLongPress?: (comic: HistoryComicT) => any
  addonFieldName?: string
  addonFieldExtractor?: (comic: HistoryComicT) => string
}
/**
 * NOTE: Function return renderItem component for listView
 * u can customize addonField
 */
const ListWithExtractor = (param: Param) => {
  const { addonFieldExtractor, addonFieldName, onPress, onLongPress } = param
  // Return render item function
  return (props: ListRenderItemInfo<resComicDetail_T>) => {
    // Return Function component
    return <ListItem {...props} />
  }

  function ListItem({ item, index }: ListRenderItemInfo<resComicDetail_T>) {
    const { boxStyle, textStyle } = useColorModeStyle('', 'Primary')

    if (!item) return null
    return (
      <TouchableOpacity
        onLongPress={() => onLongPress && onLongPress(item)}
        onPress={() =>
          onPress
            ? onPress(item)
            : navigate('comic-detail', { preloadItem: item, path: item.path })
        }
      >
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: item.posterUrl }}
            style={styles.poster as ImageStyle}
          />

          <View style={styles.infoContainer}>
            <Box _text={textStyle}>
              <Text
                style={[
                  styles.titleText,
                  { color: textStyle.color, fontWeight: 'bold' }
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.detailText} numberOfLines={1}>
                Author: {item.author}
              </Text>
              <Text style={styles.detailText} numberOfLines={1}>
                Status: {item.status}
              </Text>
            </Box>

            <View>
              {!!addonFieldExtractor && (
                <View style={styles.bottomContainer}>
                  <Text style={styles.detailText}>{addonFieldName}</Text>
                  <Text style={styles.bottomText} numberOfLines={1}>
                    {addonFieldExtractor(item)}
                  </Text>
                </View>
              )}
              <View style={styles.bottomContainer}>
                <Text style={styles.detailText}>Lasted chapter:</Text>
                <Text style={styles.bottomText} numberOfLines={1}>
                  {item.chapters[0].name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1
  },
  poster: {
    width: 100,
    height: 142,
    borderRadius: 4,
    marginLeft: 10
  },
  infoContainer: {
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 16
  },
  titleText: {
    fontSize: 15
  },
  detailText: {
    fontSize: 13,
    paddingRight: 8
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 12
  },
  bottomText: {
    fontSize: 13,
    opacity: 0.7
  }
})

export default ListWithExtractor
