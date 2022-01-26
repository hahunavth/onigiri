import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageStyle,
} from "react-native";
import React from "react";
import { HistoryComicT, historySelector } from "@/app/historySlice";
import { useAppSelector } from "@/app/hooks";
import QuicksandText, { QFontFamily } from "@/components/Common/QuicksandText";
import { navigate } from "@/navigators";
import { RecentTabProps } from "@/navigators/LibraryTopNavigator";
import { ColorSchemeE } from "@/styles/colorScheme";
import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";
import { resComicDetail_T } from "@/types";

type Props = {
  data: HistoryComicT[];
  addonFieldName: string;
  addonFieldExtractor: (comic: HistoryComicT) => string;
};

const LibraryList = ({ addonFieldExtractor, addonFieldName, data }: Props) => {
  const styles = useStyleSheet(themedStyle);

  return (
    <FlatList
      style={{ flex: 1 }}
      data={data}
      renderItem={({ item, index }) => {
        if (!item) return null;
        return (
          <TouchableOpacity
            onPress={() =>
              navigate("ComicDetails", { comic: item, path: item.path })
            }
          >
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.posterUrl }}
                style={styles.poster as ImageStyle}
              />
              <View style={styles.infoContainer}>
                <View>
                  <QuicksandText style={styles.titleText}>
                    {item.title}
                  </QuicksandText>
                  <QuicksandText style={styles.detailText}>
                    Author: {item.author}
                  </QuicksandText>
                  <QuicksandText style={styles.detailText}>
                    Status: {item.status}
                  </QuicksandText>
                </View>

                <View>
                  {!!addonFieldExtractor && (
                    <View style={styles.bottomContainer}>
                      <QuicksandText style={styles.detailText}>
                        {addonFieldName}
                      </QuicksandText>
                      <QuicksandText style={styles.bottomText}>
                        {addonFieldExtractor(item)}
                      </QuicksandText>
                    </View>
                  )}
                  <View style={styles.bottomContainer}>
                    <QuicksandText style={styles.detailText}>
                      Lasted chapter:
                    </QuicksandText>
                    <QuicksandText style={styles.bottomText}>
                      {item.chapters[0].name}
                    </QuicksandText>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const themedStyle = StyleService.create({
  itemContainer: {
    borderColor: ColorSchemeE["border-basic-color-3"],
    flex: 1,
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
  },
  poster: {
    width: 100,
    height: 142,
    borderRadius: 4,
    marginLeft: 10,
  },
  infoContainer: {
    justifyContent: "space-between",
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  titleText: { fontFamily: QFontFamily.Quicksand_600SemiBold, fontSize: 15 },
  detailText: {
    fontFamily: QFontFamily.Quicksand_500Medium,
    fontSize: 13,
    color: ColorSchemeE["text-hint-color"],
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 12,
  },
  bottomText: {
    fontFamily: QFontFamily.Quicksand_500Medium,
    fontSize: 13,
    // color: ColorSchemeE["text-disabled-color"],
    opacity: 0.7,
  },
});

export default LibraryList;
