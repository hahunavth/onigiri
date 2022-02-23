import React from 'react'
import { View, Text, Image } from 'native-base'
import { TouchableOpacity, ImageStyle, StyleSheet } from 'react-native'
import { resComicItem_T } from '../../types'
import { navigate } from '../../navigators'

type Props = {
  item: resComicItem_T
}

export function ComicListItem({ item }: Props) {
  if (!item) return null
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('comic-detail', { preloadItem: item, path: item.path })
      }
    >
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.posterUrl }}
          style={styles.poster as ImageStyle}
          alt={'avatar'}
        />
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.titleText}>{item.name}</Text>
            <Text style={styles.detailText}>Author: {item.author}</Text>
            <Text style={styles.detailText}>Status: {item.status}</Text>
          </View>

          {/* <View>
            {!!addonFieldExtractor && (
              <View style={styles.bottomContainer}>
                <Text style={styles.detailText}>{addonFieldName}</Text>
                <Text style={styles.bottomText}>
                  {addonFieldExtractor(item)}
                </Text>
              </View>
            )}
            <View style={styles.bottomContainer}>
              <Text style={styles.detailText}>Lasted chapter:</Text>
              <Text style={styles.bottomText}>
                {item.chapters[0].name}
              </Text>
            </View>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    // borderColor: ColorSchemeE["border-basic-color-3"],
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
    fontSize: 13
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
