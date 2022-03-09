import React from 'react'
import { StyleSheet } from 'react-native'
import { Pagination, PaginationProps } from 'react-native-swiper-flatlist'
import { ITEM_PADDING } from './size'

const styles = StyleSheet.create({
  paginationContainer: {
    bottom: 0,
    left: ITEM_PADDING * 4,
    padding: 0,
    margin: 0,
    height: ITEM_PADDING * 4
  },
  pagination: {
    marginHorizontal: 2,
    width: 10,
    height: 10
  }
})

export const CustomPagination = (props: PaginationProps) => {
  return (
    <Pagination
      {...props}
      paginationStyle={styles.paginationContainer}
      paginationStyleItem={styles.pagination}
      paginationDefaultColor="gray"
      paginationActiveColor="#225eac"
    />
  )
}
