import { View, Text, ScrollView, FlatList } from "native-base";
import { VirtualizedList, ListRenderItemInfo } from "react-native";
import React from "react";
import { NextLink } from "app/components/NextLink";
import { ListHeader } from "app/components/ListHeader";
import { FlatlistBanner } from "app/components/Banner";
import { ComicGridGap3 } from "../../components/Comics/ComicGridGap3";
import {
  useApiFindByGenresName,
  useApiFindComic,
  useApiHot,
  useApiTopMonth,
  useApiTopWeek
} from "../../store/api";
import { ComicGridGap2 } from "../../components/Comics/ComicGridGap2";
import { ComicHorizontalList } from "app/components/Comics/ComicHorizontalList";
import { navigate } from "../../navigators";
import Categories from "../../components/Categories";
import { Carousel } from "../../../next/src/components/Carousel";
import FadeInView, {
  FadeInWrapper
} from "../../components/AnimationWrapper/FadeInView";
import useInteraction from "../../hooks/useInteraction";
import I18n from "i18n-js";
import { ComicHorizontalList2 } from "../../components/Comics/ComicHorizontalList2/ComicHorizontalList2";

export const HomeScreen = () => {
  // console.log("rerender");
  // const { loading } = useInteraction();
  // return <>{!loading && <HomeScreenContent />}</>;
  return <HomeScreenContent />;
  // return <FadeInView>{!loading && <HomeScreenContent />}</FadeInView>;
};

const HomeScreenContent = () => {
  const data = React.useMemo(() => {
    return [
      () => (
        <ListHeader
          name={I18n.t("home.recently.title")}
          subtitle={I18n.t("home.recently.subtitle")}
          onPressMore={() => {
            navigate("home-session-detail-list", { type: "recently" });
          }}
        />
      ),
      () => <FlatlistBanner />,
      () => (
        <ListHeader
          name={I18n.t("home.categories.title")}
          subtitle={I18n.t("home.categories.subtitle")}
        />
      ),
      () => <Categories />,
      () => (
        <ListHeader
          name={I18n.t("home.history.title")}
          subtitle={I18n.t("home.history.subtitle")}
          color=""
          onPressMore={() => {
            navigate("main", {
              screen: "main/library"
            });
          }}
        />
      ),
      () => <ComicHorizontalList />,
      () => (
        <ListHeader
          name={I18n.t("home.hot.title")}
          subtitle={I18n.t("home.hot.subtitle")}
          color=""
          onPressMore={() => {
            navigate("home-session-detail-list", { type: "hot" });
          }}
        />
      ),
      () => <ComicList1 />,
      () => (
        <ListHeader
          name={I18n.t("home.topWeek.title")}
          subtitle={I18n.t("home.topWeek.subtitle")}
          color=""
          onPressMore={() =>
            navigate("home-session-detail-list", { type: "week" })
          }
        />
      ),
      () => <ComicList2 />,
      // TODO: I18N
      () => (
        <ListHeader
          name={"New comic"}
          subtitle={"Todo: i18n"}
          color=""
          onPressMore={() =>
            navigate("home-session-detail-list", { type: "week" })
          }
        />
      ),
      () => <NewComicList />,
      () => (
        <ListHeader
          name={"Completed comics"}
          subtitle={"Todo: i18n"}
          color=""
          onPressMore={() =>
            navigate("home-session-detail-list", {
              type: "week"
            })
          }
        />
      ),
      () => <CompletedComicList />,
      () => (
        <ListHeader
          name={"Manga"}
          subtitle={"Todo: i18n"}
          color=""
          onPressMore={() =>
            navigate("home-session-detail-list", {
              type: "find-comic-by-genres-name",
              genresName: "manga-112"
            })
          }
        />
      ),
      () => <MangaList />,
      () => (
        <ListHeader
          name={"Tensei"}
          subtitle={"Todo: i18n"}
          color=""
          onPressMore={() =>
            navigate("home-session-detail-list", {
              type: "find-comic-by-genres-name",
              genresName: "chuyen-sinh-213"
            })
          }
        />
      ),
      () => <TenseiList />
    ];
  }, []);

  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<() => React.ReactElement>) => {
      const Element = item;
      return <Element />;
    },
    []
  );

  const keyExtractor = React.useCallback((item, id) => {
    return id.toString();
  }, []);

  return (
    <>
      <FlatList
        // bg={"warmGray.100"}
        // // @ts-ignore
        // _dark={{
        //   backgroundColor: "$dark.backgroundSecondary"
        // }}
        bg={"warmGray.50"}
        // @ts-ignore
        _dark={{ bg: "trueGray.900" }}
        // TODO: WEB SPECIFIC STYLE
        // @ts-ignore
        _web={{ marginLeft: 200 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={1}
        // bgColor={"white"}
      ></FlatList>
    </>
  );
};

function ComicList1() {
  const list = useApiHot("1");
  return <ComicGridGap3 list={list.data?.data || []} />;
}

function ComicList2() {
  const list = useApiTopWeek("1");
  return (
    <>
      <ComicGridGap2 list={list.data?.data || []} />
      {/* <Carousel list={list.data?.data || []} /> */}
    </>
  );
}

function NewComicList() {
  const list = useApiFindComic({
    status: { id: -1, item: "All" },
    sortBy: { id: 15, item: "New Comic" },
    forUser: { id: -1, item: "All" },
    numChapter: { id: 1, item: "0" },
    page: 1
  });

  return <ComicHorizontalList2 list={list.data?.data || []} />;
}

function CompletedComicList() {
  const list = useApiFindComic({
    status: { id: 2, item: "" },
    sortBy: { id: 15, item: "New Comic" },
    forUser: { id: -1, item: "All" },
    numChapter: { id: 1, item: "0" },
    page: 1
  });

  return <ComicHorizontalList2 list={list.data?.data || []} />;
}

const _genListByGenresName = (genresName: string) => {
  return function () {
    const result = useApiFindByGenresName({
      genresName: genresName,
      page: "1"
    });

    return <ComicHorizontalList2 list={result.data?.data || []} />;
  };
};

const MangaList = _genListByGenresName("manga-112");
const TenseiList = _genListByGenresName("chuyen-sinh-213");
