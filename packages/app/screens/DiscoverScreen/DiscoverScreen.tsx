import { View, Text, Select, CheckIcon, Button, ScrollView } from "native-base";
import React from "react";
// NOTE: This lib does not have type declaration
// @ts-ignore
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
// TODO: Use this instead
import { Dropdown } from "react-native-element-dropdown";
import { Picker } from "@react-native-picker/picker";

import {
  FOR_USER,
  GENRES_LIST,
  OptionT,
  NUM_CHAPTER,
  STATUS,
  SORT_BY,
  toIdListStr,
  FindOptionT
} from "app/utils/findOption";
import { navigate } from "app/navigators";
import { SelectOne } from "app/components/DropdownSelect";
import { AntDesign } from "@expo/vector-icons";
import i18n from "i18n-js";

// TODO: Optimize using useCallback
export const DiscoverScreen = () => {
  const [selectedForUser, setSelectedForUser] = React.useState<
    Partial<OptionT>
  >(FOR_USER[2] || {});
  const [selectedNumChapter, setSelectedNumChapter] = React.useState<
    Partial<OptionT>
  >(NUM_CHAPTER[0] || {});
  const [selectedSortBy, setSelectedSortBy] = React.useState<Partial<OptionT>>(
    SORT_BY[0] || {}
  );
  const [selectedStatus, setSelectedStatus] = React.useState<Partial<OptionT>>(
    STATUS[0] || {}
  );

  const [selectedGenres, setSelectedGenres] = React.useState([]);

  console.log("rerender2");

  function onForUserChange() {
    return (val: any) => setSelectedForUser(val);
  }
  function onNumChapterChange() {
    return (val: any) => setSelectedNumChapter(val);
  }
  function onSortByChange() {
    return (val: any) => setSelectedSortBy(val);
  }
  function onStatusChange() {
    return (val: any) => setSelectedStatus(val);
  }
  function onMultiChange() {
    return (item: any) =>
      // @ts-ignore
      setSelectedGenres(xorBy(selectedGenres, [item], "id"));
  }

  const getFindPath = () => {
    // Ex: http://www.nettruyenpro.com/tim-truyen-nang-cao?genres=&notgenres=&gender=-1&status=2&minchapter=1&sort=5
    return `/tim-truyen-nang-cao?genres=${toIdListStr(
      selectedGenres.map((g) => g.id)
    )}&gender=${selectedForUser?.id || -1}&status=${
      selectedStatus?.id || -1
    }&minchapter=${selectedNumChapter?.id || -1}&sort=${
      selectedSortBy?.id || 0
    }`;
    // console.log(selectedForUser)
  };
  const getFindOption = (): FindOptionT => ({
    forUser: selectedForUser,
    genres: selectedGenres,
    numChapter: selectedNumChapter,
    sortBy: selectedSortBy,
    status: selectedStatus
  });

  // const [selectedLanguage, setSelectedLanguage] = React.useState()

  return (
    <View flex={1} p={2} bg={"warmGray.50"} _dark={{ bg: "warmGray.900" }}>
      <SelectBoxMultiple
        label={i18n.t("discover.genres.title")}
        options={GENRES_LIST}
        selectedValues={selectedGenres}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
        labelStyle={{
          fontSize: 12
        }}
      />
      <SelectBoxSingle
        label={i18n.t("discover.user.title")}
        options={FOR_USER}
        value={selectedForUser}
        onChange={onForUserChange()}
        hideInputFilter={true}
      />
      <SelectBoxSingle
        label={i18n.t("discover.maxCpts.title")}
        options={NUM_CHAPTER}
        value={selectedNumChapter}
        onChange={onNumChapterChange()}
        hideInputFilter={true}
      />
      <SelectBoxSingle
        label={i18n.t("discover.status.title")}
        options={STATUS}
        value={selectedStatus}
        onChange={onStatusChange()}
        hideInputFilter={true}
      />
      <SelectBoxSingle
        label={i18n.t("discover.sortBy.title")}
        options={SORT_BY}
        value={selectedSortBy}
        onChange={onSortByChange()}
        hideInputFilter={true}
      />
      {/* <SelectOne /> */}
      <Button
        mx={4}
        my={8}
        colorScheme={"orange"}
        bg={"$light.backgroundButton"}
        _text={{ color: "$light.textButton" }}
        onPress={() =>
          navigate("shared", {
            // path: 'shared/find-result',
            params: {
              findOption: getFindOption(),
              path: getFindPath()
            },
            screen: "shared/find-result"
          })
        }
      >
        Find
      </Button>
    </View>
  );
};

function SelectBoxMultiple(props: any) {
  console.log("rerender");
  // useColorModeValue("#fbecdf", "#643318")
  return (
    <SelectBox
      // label="Select genres"
      // options={GENRES_LIST}
      // selectedValues={selectedTeams}
      // onMultiSelect={onMultiChange()}
      // onTapClose={onMultiChange()}
      selectIcon={
        <AntDesign
          name="down"
          size={18}
          color="black"
          style={{ padding: 4, marginRight: -8 }}
        />
      }
      isMulti
      containerStyle={{
        height: 40,
        backgroundColor: "white",
        borderRadius: 4,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,

        elevation: 2
      }}
      labelStyle={{
        marginTop: 10
      }}
      inputFilterStyle={{
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: "bold",
        // color: '#555',
        opacity: 0.5
      }}
      inputFilterContainerStyle={{
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "#ddd"
        // padding: 0
        // margin: 0
        // display: 'hidden'
      }}
      optionContainerStyle={{
        // backgroundColor: 'red',
        flex: 1,
        // marginHorizontal: 8,
        marginVertical: 0,
        padding: 0
      }}
      optionsLabelStyle={{
        flex: 1,
        width: 300,
        paddingLeft: 8
      }}
      {...props}
    />
  );
}

function SelectBoxSingle(props: any) {
  return (
    <SelectBox
      // label="For user"
      // options={FOR_USER}
      // value={selectedForUser}
      // onChange={onForUserChange()}
      hideInputFilter={false}
      selectIcon={
        <AntDesign
          name="down"
          size={18}
          color="black"
          style={{ padding: 4, marginRight: -8 }}
        />
      }
      containerStyle={{
        // NOTE: PREV STYLE
        // paddingRight: 12,
        // paddingLeft: 12,
        // borderRadius: 4,
        // borderWidth: 1,
        // borderColor: '#ddd',

        height: 40,
        backgroundColor: "white",
        borderRadius: 4,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,

        elevation: 2
      }}
      labelStyle={{
        fontSize: 12,
        marginTop: 10
      }}
      inputFilterStyle={{
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: "bold",
        // color: '#555',
        opacity: 0.5
      }}
      inputFilterContainerStyle={{
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "#ddd"
        // padding: 0
        // margin: 0
        // display: 'hidden'
      }}
      optionContainerStyle={{
        // backgroundColor: 'red',
        flex: 1,
        // marginHorizontal: 8,
        marginVertical: 0,
        padding: 0
      }}
      optionsLabelStyle={{
        flex: 1,
        width: 300,
        paddingLeft: 8
      }}
      {...props}
    />
  );
}
