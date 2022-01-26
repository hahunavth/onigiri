import { historySelector } from "@/app/historySlice";
import { useAppSelector } from "@/app/hooks";
import QuicksandText, { QFontFamily } from "@/components/Common/QuicksandText";
import { navigate } from "@/navigators";
import { RecentTabProps } from "@/navigators/LibraryTopNavigator";
import { ColorSchemeE } from "@/styles/colorScheme";
import { resComicDetail_T } from "@/types";
import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";
import React from "react";

import LibraryList from "./LibraryList";

interface Props {}

export const RecentTab: React.FunctionComponent<RecentTabProps> = (props) => {
  const history = useAppSelector(historySelector);

  return (
    <Layout style={{ flex: 1 }}>
      <LibraryList
        data={
          (history.readComics
            .map((path) => history.comics[path])
            .filter((n) => n) as resComicDetail_T[]) || []
        }
        addonFieldName={"Lasted read: "}
        addonFieldExtractor={(item) => {
          return item.lastedReadChapter || "";
        }}
      />
    </Layout>
  );
};
