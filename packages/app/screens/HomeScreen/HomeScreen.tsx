import { FlatList, ScrollView } from "native-base";
import {
  ListRenderItemInfo,
  Alert,
  BackHandler,
  Dimensions,
  LayoutAnimation,
  InteractionManager
} from "react-native";
import React, { useEffect } from "react";
import { ListHeader } from "app/components/ListHeader";
import { FlatlistBanner } from "app/components/Banner";
import { ComicGridGap3 } from "app/components/Comics/ComicGridGap3";
import {
  useApiFindByGenresName,
  useApiFindComic,
  useApiHot,
  useApiTopWeek
} from "app/store/api";
import { ComicGridGap2 } from "app/components/Comics/ComicGridGap2";
import { ComicHorizontalList } from "app/components/Comics/ComicHorizontalList";
import { navigate } from "app/navigators";
import Categories from "app/components/Categories";

import I18n from "i18n-js";
import { ComicHorizontalList2 } from "app/components/Comics/ComicHorizontalList2/ComicHorizontalList2";
import i18n from "i18n-js";
import { useFocusEffect } from "@react-navigation/native";
import { Loading, TryAgain } from "../../components/EmptyPage";
import useInteraction from "../../hooks/useInteraction";
import FadeInView from "../../components/AnimationWrapper/FadeInView";

export const HomeScreen = () => {
  // const [isNewOrientation, setIsNewOrientation] = React.useState(false);

  // useEffect(() => {
  //   Dimensions.addEventListener("change", () => {
  //     setIsNewOrientation(true);
  //   });
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (isNewOrientation) {
  //       InteractionManager.runAfterInteractions(() => {
  //         LayoutAnimation.configureNext({
  //           duration: 500,
  //           update: { type: "easeInEaseOut" }
  //           // create: { type: "easeInEaseOut" }
  //           // delete: { type: "easeInEaseOut" }
  //         });
  //         setIsNewOrientation(false);
  //       });
  //     }
  //   }, [isNewOrientation])
  // );

  const { loading } = useInteraction();

  // return <>{!loading && <HomeScreenContent />}</>;
  return <HomeScreenContent />;
  return (
    <FadeInView>
      {
        // !loading ? (
        //  && !isNewOrientation
        <HomeScreenContent />
        // ) : (
        //   <Loading />
        // )
      }
    </FadeInView>
  );
};

const data = [
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
      onPressMore={() => navigate("home-session-detail-list", { type: "week" })}
    />
  ),
  () => <ComicList2 />,
  // TODO: I18N
  () => (
    <ListHeader
      name={"New comic"}
      subtitle={"Todo: i18n"}
      color=""
      onPressMore={() => navigate("home-session-detail-list", { type: "week" })}
    />
  ),
  () => <NewComicList />
  // () => (
  //   <ListHeader
  //     name={"Completed comics"}
  //     subtitle={"Todo: i18n"}
  //     color=""
  //     onPressMore={() =>
  //       navigate("home-session-detail-list", {
  //         type: "week"
  //       })
  //     }
  //   />
  // ),
  // () => <CompletedComicList />,
  // () => (
  //   <ListHeader
  //     name={"Manga"}
  //     subtitle={"Todo: i18n"}
  //     color=""
  //     onPressMore={() =>
  //       navigate("home-session-detail-list", {
  //         type: "find-comic-by-genres-name",
  //         genresName: "manga-112"
  //       })
  //     }
  //   />
  // ),
  // () => <MangaList />,
  // () => (
  //   <ListHeader
  //     name={"Tensei"}
  //     subtitle={"Todo: i18n"}
  //     color=""
  //     onPressMore={() =>
  //       navigate("home-session-detail-list", {
  //         type: "find-comic-by-genres-name",
  //         genresName: "chuyen-sinh-213"
  //       })
  //     }
  //   />
  // ),
  // () => <TenseiList />,
  // () => (
  //   <ListHeader
  //     name={"Manhwa"}
  //     subtitle={"Todo: i18n"}
  //     color=""
  //     onPressMore={() =>
  //       navigate("home-session-detail-list", {
  //         type: "find-comic-by-genres-name",
  //         genresName: "manhwa-1140"
  //       })
  //     }
  //   />
  // ),
  // () => <ManhwaList />,
  // () => (
  //   <ListHeader
  //     name={"Manhua"}
  //     subtitle={"Todo: i18n"}
  //     color=""
  //     onPressMore={() =>
  //       navigate("home-session-detail-list", {
  //         type: "find-comic-by-genres-name",
  //         genresName: "manhua"
  //       })
  //     }
  //   />
  // ),
  // () => <ManhuaList />
];

/**
 * Home screen
 * @returns
 */
const HomeScreenContent = () => {
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

  useFocusEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go exit?", [
        {
          text: i18n.t("button.cancel"),
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "YES",
          onPress: () => BackHandler.exitApp(),
          style: "destructive"
        }
      ]);
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  });

  return (
    <ScrollView
      backgroundColor={"$light.backgroundPrimary"}
      _dark={{
        backgroundColor: "$dark.backgroundSecondary"
      }}
    >
      <ListHeader
        name={I18n.t("home.recently.title")}
        subtitle={I18n.t("home.recently.subtitle")}
        onPressMore={() => {
          navigate("home-session-detail-list", { type: "recently" });
        }}
      />
      <FlatlistBanner />
      <ListHeader
        name={I18n.t("home.categories.title")}
        subtitle={I18n.t("home.categories.subtitle")}
      />
      <Categories />
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
      <ComicHorizontalList />
      <ListHeader
        name={I18n.t("home.hot.title")}
        subtitle={I18n.t("home.hot.subtitle")}
        color=""
        onPressMore={() => {
          navigate("home-session-detail-list", { type: "hot" });
        }}
      />
      <ComicList1 />
      <ListHeader
        name={I18n.t("home.topWeek.title")}
        subtitle={I18n.t("home.topWeek.subtitle")}
        color=""
        onPressMore={() =>
          navigate("home-session-detail-list", { type: "week" })
        }
      />
      <ComicList2 />
      <ListHeader
        name={"New comic"}
        subtitle={"Todo: i18n"}
        color=""
        onPressMore={() =>
          navigate("home-session-detail-list", { type: "week" })
        }
      />
      <NewComicList />
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
      <CompletedComicList />
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
      <MangaList />
    </ScrollView>
  );

  return (
    <>
      <FlatList
        // bg={"warmGray.50"}
        bg={"white"}
        // @ts-ignore
        // _dark={{ bg: "trueGray.900" }}
        // TODO: WEB SPECIFIC STYLE
        // @ts-ignore
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={12}
        // initialNumToRender={0} // cause low performance
        maxToRenderPerBatch={2}
        updateCellsBatchingPeriod={1000}
        // decelerationRate="fast"
        // removeClippedSubviews={true}
        // disableVirtualization={true}
        windowSize={12}
      />
    </>
  );
};

// end

const ComicList1 = React.memo(function () {
  const list = useApiHot("1");
  return <ComicGridGap3 list={list.data?.data || []} />;
});

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

  return <ComicHorizontalList2 list={list.data?.data?.slice(0, 6) || []} />;
}

function CompletedComicList() {
  const list = useApiFindComic({
    status: { id: 2, item: "" },
    sortBy: { id: 15, item: "New Comic" },
    forUser: { id: -1, item: "All" },
    numChapter: { id: 1, item: "0" },
    page: 1
  });

  return <ComicHorizontalList2 list={list.data?.data?.slice(0, 6) || []} />;
}

const createListByGenresName = (genresName: string) => {
  return React.memo(function () {
    const { data, refetch, isError, error } = useApiFindByGenresName(
      {
        genresName,
        page: "1"
      },
      {}
    );

    const { loading } = useInteraction();

    return (
      <>
        {!isError || !loading || !data?.data ? (
          <ComicHorizontalList2 list={data?.data?.slice(0, 6) || []} />
        ) : (
          <TryAgain
            // TODO: SHOW ERROR MSG
            // msg={error}
            containerStyle={{
              justifyContent: "center",
              alignItems: "center",
              height: 180
            }}
          />
        )}
      </>
    );
  });
};

const MangaList = createListByGenresName("manga-112");
const TenseiList = createListByGenresName("chuyen-sinh-213");
const ManhwaList = createListByGenresName("manhwa-1140");
const ManhuaList = createListByGenresName("manhua");
