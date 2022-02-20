import { historySelector } from 'app/store/historySlice'
import { useAppSelector } from 'app/store/hooks'
// import QuicksandText, { QFontFamily } from "app/components/Common/QuicksandText";
// import { navigate } from "app/navigators";
import { RecentTabProps } from 'app/navigators/LibraryTopNavigator'
// import { ColorSchemeE } from "app/styles/colorScheme";
import { resComicDetail_T } from 'app/types'
// import { Layout, StyleService, useStyleSheet } from "appui-kitten/components";
import React from 'react'
import { View, Text } from 'native-base'

import LibraryList from './LibraryList'

interface Props {}

export const RecentTab: React.FunctionComponent<RecentTabProps> = (props) => {
  const history = useAppSelector(historySelector)

  return (
    <View style={{ flex: 1 }}>
      <LibraryList
        data={
          (history.readComics
            .map((path) => history.comics[path])
            .filter((n) => n) as resComicDetail_T[]) || []
        }
        addonFieldName={'Lasted read: '}
        addonFieldExtractor={(item) => {
          return item.lastedReadChapter || ''
        }}
      />
    </View>
  )
}
