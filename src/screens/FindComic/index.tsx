import React, { useCallback, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import {
  Button,
  Layout,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";

import {
  // FindComicProps,
  FOR_USER,
  GENRES_LIST,
  NUM_CHAPTER,
  SORT_BY,
  STATUS,
  toIdListStr,
} from "./constants";
import QuicksandText, { QFontFamily } from "@/components/Common/QuicksandText";
import { BtnRadio } from "@/components/Radio/BtnRadio";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MainNavigationProps } from "@/navigators/StackNavigator";

const initialGenresList = GENRES_LIST.map(() => false);

export const FindComicScreen = () => {
  const styles = useStyleSheet(themeStyle);
  const navigation = useNavigation<MainNavigationProps>();

  const [numChapters, setNumChapters] = useState(-1);
  const [genresIdList, setGenresIdList] = useState(initialGenresList);
  const [status, setStatus] = useState(-1);
  const [sort, setSort] = useState(-1);
  const [forUser, setForUser] = useState(-1);

  const handleNumChaptersChange = useCallback((value: number) => {
    setNumChapters(value);
  }, []);

  const handleGenresIdListChange = useCallback((value: boolean[]) => {
    setGenresIdList(value);
  }, []);

  const handleStatusChange = useCallback((value: number) => {
    setStatus(value);
  }, []);

  const handleSortChange = useCallback((value: number) => setSort(value), []);
  const handleForUserChange = useCallback(
    (value: number) => setForUser(value),
    []
  );

  const getQuery = () => {
    const res: FindComicProps = {
      minchapter: numChapters === -1 ? "1" : numChapters,
      genres: toIdListStr(
        genresIdList.reduce((prev: number[], val: boolean, id: number) => {
          if (val) prev.push(id);
          return prev;
        }, [])
      ),
      status: status === -1 ? "-1" : STATUS[status].key,
      sort: sort === -1 ? "0" : SORT_BY[sort].key,
      gender: forUser === -1 ? "-1" : FOR_USER[forUser].key,
    };
    return res;
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Header
        onSubmit={() => {
          const query = getQuery();
          navigation.navigate("FindComicResult", {
            query: query,
          });
        }}
      />

      <ScrollView>
        <Layout>
          <QuicksandText style={styles.headerText}>
            Chapter Numbers
          </QuicksandText>
          <BtnRadio
            list={NUM_CHAPTER}
            onChange={handleNumChaptersChange}
            selectedId={numChapters}
            isMultiSelect={false}
          />
        </Layout>
        <Layout>
          <QuicksandText style={styles.headerText}>Genres</QuicksandText>
          <BtnRadio
            list={GENRES_LIST}
            onChange={handleGenresIdListChange}
            selectedId={genresIdList}
            isMultiSelect={true}
          />
        </Layout>
        <Layout>
          <QuicksandText style={styles.headerText}>Status</QuicksandText>
          <BtnRadio
            list={STATUS.map((item) => item.value)}
            onChange={handleStatusChange}
            selectedId={status}
            isMultiSelect={false}
          />
        </Layout>
        <Layout>
          <QuicksandText style={styles.headerText}>Sort</QuicksandText>
          <BtnRadio
            list={SORT_BY.map((item) => item.value)}
            onChange={handleSortChange}
            selectedId={sort}
            isMultiSelect={false}
          />
        </Layout>
        <Layout>
          <QuicksandText style={styles.headerText}>
            For Users Group
          </QuicksandText>
          <BtnRadio
            list={FOR_USER.map((item) => item.value)}
            onChange={handleForUserChange}
            selectedId={forUser}
            isMultiSelect={false}
          />
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const themeStyle = StyleService.create({
  headerText: {
    fontSize: 16,
    fontFamily: QFontFamily.Quicksand_600SemiBold,
    backgroundColor: "#ddd",
    padding: 3,
  },
});

// ANCHOR: Header
type HeaderProps = {
  onSubmit: () => any;
};

function Header(props: HeaderProps) {
  return (
    <Layout
      style={{
        height: 48,
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Layout style={{ width: 90, alignContent: "center" }}></Layout>
      <Text style={{ flex: 1, textAlign: "center" }}>Find Comic</Text>
      <Layout style={{ width: 90, alignContent: "center" }}>
        <Button
          style={{ margin: 5 }}
          status={"success"}
          size={"small"}
          appearance={"ghost"}
          onPress={props.onSubmit}
        >
          Find
        </Button>
      </Layout>
    </Layout>
  );
}

export type FindComicProps = {
  genres: number | string;
  minchapter: number | string;
  status: number | string;
  gender: number | string;
  sort: number | string;
};

// export {FindComicProps} from "./constants";
