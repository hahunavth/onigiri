import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  InteractionManager,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
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
import FadeInView from "@/components/Common/FadeInView";

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

  const getQuery = useCallback(() => {
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
  }, []);
  const [isReady, setIsReady] = useState(false);

  const submitForm = useCallback(() => {
    const query = getQuery();
    navigation.navigate("FindComicResult", {
      query: query,
    });
  }, [navigation, getQuery]);

  const STATUS_VALUES = useMemo(
    () => STATUS.map((item) => item.value),
    [STATUS]
  );
  const SORT_BY_VALUES = useMemo(
    () => SORT_BY.map((item) => item.value),
    [SORT_BY]
  );
  const FOR_USER_VALUES = useMemo(
    () => FOR_USER.map((item) => item.value),
    [FOR_USER]
  );

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => setIsReady(true));
  }, []);

  return (
    <Layout style={{ flex: 1 }}>
      {isReady ? (
        <>
          <MemoHeader onSubmit={submitForm} />

          <FadeInView>
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
                  list={STATUS_VALUES}
                  onChange={handleStatusChange}
                  selectedId={status}
                  isMultiSelect={false}
                />
              </Layout>
              <Layout>
                <QuicksandText style={styles.headerText}>Sort</QuicksandText>
                <BtnRadio
                  list={SORT_BY_VALUES}
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
                  list={FOR_USER_VALUES}
                  onChange={handleForUserChange}
                  selectedId={forUser}
                  isMultiSelect={false}
                />
              </Layout>
            </ScrollView>
          </FadeInView>
        </>
      ) : null}
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
  console.log("render Header");
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

const MemoHeader = React.memo(Header);

export type FindComicProps = {
  genres: number | string;
  minchapter: number | string;
  status: number | string;
  gender: number | string;
  sort: number | string;
};

// export {FindComicProps} from "./constants";
