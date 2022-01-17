import React from "react";
import { StyleSheet } from "react-native";
import { Pagination, PaginationProps } from "react-native-swiper-flatlist";

const styles = StyleSheet.create({
  paginationContainer: {
    bottom: 0,
    left: 18,
    padding: 0,
    margin: 0,
    // width: 70,
  },
  pagination: {
    // borderRadius: 2,
    marginHorizontal: 2,
    width: 10,
    height: 10,
  },
});

export const CustomPagination = (props: PaginationProps) => {
  return (
    <Pagination
      {...props}
      paginationStyle={styles.paginationContainer}
      paginationStyleItem={styles.pagination}
      paginationDefaultColor="gray"
      paginationActiveColor="#225eac"
    />
  );
};
