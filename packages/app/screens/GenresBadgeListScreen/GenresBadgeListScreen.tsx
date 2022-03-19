import { View, Text, FlatList, Badge } from 'native-base'
import React from 'react'
import { GenresBadge } from '../../components/GenresBadge'
import { TNFlatlist } from 'app/components/Typo'

import { LIST } from './data'

export const GenresBadgeListScreen = () => {
  return (
    <TNFlatlist
      data={LIST}
      style={{ marginTop: 12 }}
      columnWrapperStyle={{
        justifyContent: 'space-around',
        marginVertical: 8
      }}
      numColumns={2}
      renderItem={({ item }) => {
        return <GenresBadge name={item.name} imageUrl={item.imageUrl} />
      }}
      keyExtractor={(item) => item.name}
    />
  )
}
