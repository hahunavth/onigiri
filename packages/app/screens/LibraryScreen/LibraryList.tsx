import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageStyle,
  StyleSheet
} from 'react-native'
import React from 'react'
import { HistoryComicT, historySelector } from 'app/store/historySlice'
import { useAppSelector } from 'app/store/hooks'
import { navigate } from 'app/navigators'
import { resComicDetail_T } from 'app/types'

type Props = {
  data: HistoryComicT[]
  addonFieldName: string
  addonFieldExtractor: (comic: HistoryComicT) => string
}

const LibraryList = ({ addonFieldExtractor, addonFieldName, data }: Props) => {
  // const styles = useStyleSheet(themedStyle);

  return (
    <FlatList
      style={{ flex: 1 }}
      data={data}
      renderItem={({ item, index }) => {
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
              />
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.detailText}>Author: {item.author}</Text>
                  <Text style={styles.detailText}>Status: {item.status}</Text>
                </View>

                <View>
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
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
      }}
      keyExtractor={(item, index) => index.toString()}
    />
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
    // fontFamily: QFontFamily.Quicksand_600SemiBold,
    fontSize: 15
  },
  detailText: {
    // fontFamily: QFontFamily.Quicksand_500Medium,
    fontSize: 13
    // color: ColorSchemeE["text-hint-color"],
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 12
  },
  bottomText: {
    // fontFamily: QFontFamily.Quicksand_500Medium,
    fontSize: 13,
    // color: ColorSchemeE["text-disabled-color"],
    opacity: 0.7
  }
})

export default LibraryList
