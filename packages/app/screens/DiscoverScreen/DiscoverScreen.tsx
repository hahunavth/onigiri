import { View, Text, Select, CheckIcon, Button } from 'native-base'
import React from 'react'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

import {
  FOR_USER,
  GENRES_LIST,
  OptionT,
  NUM_CHAPTER,
  STATUS,
  SORT_BY,
  toIdListStr,
  FindOptionT
} from './constants'
import { navigate } from '../../navigators'

type Props = {}

export const DiscoverScreen = (props: Props) => {
  const [selectedForUser, setSelectedForUser] = React.useState<
    Partial<OptionT>
  >(FOR_USER[2] || {})
  const [selectedNumChapter, setSelectedNumChapter] = React.useState<
    Partial<OptionT>
  >(NUM_CHAPTER[0] || {})
  const [selectedSortBy, setSelectedSortBy] = React.useState<Partial<OptionT>>(
    SORT_BY[0] || {}
  )
  const [selectedStatus, setSelectedStatus] = React.useState<Partial<OptionT>>(
    STATUS[0] || {}
  )

  const [selectedGenres, setSelectedGenres] = React.useState([])

  function onForUserChange() {
    return (val) => setSelectedForUser(val)
  }
  function onNumChapterChange() {
    return (val) => setSelectedNumChapter(val)
  }
  function onSortByChange() {
    return (val) => setSelectedSortBy(val)
  }
  function onStatusChange() {
    return (val) => setSelectedStatus(val)
  }
  function onMultiChange() {
    return (item) => setSelectedGenres(xorBy(selectedGenres, [item], 'id'))
  }

  const getFindPath = () => {
    // Ex: http://www.nettruyenpro.com/tim-truyen-nang-cao?genres=&notgenres=&gender=-1&status=2&minchapter=1&sort=5
    return `/tim-truyen-nang-cao?genres=${toIdListStr(
      selectedGenres.map((g) => g.id)
    )}&gender=${selectedForUser?.id || -1}&status=${
      selectedStatus?.id || -1
    }&minchapter=${selectedNumChapter?.id || -1}&sort=${
      selectedSortBy?.id || 0
    }`
    // console.log(selectedForUser)
  }

  const getFindOption = (): FindOptionT => ({
    forUser: selectedForUser,
    genres: selectedGenres,
    numChapter: selectedNumChapter,
    sortBy: selectedSortBy,
    status: selectedStatus
  })

  return (
    <View flex={1} p={2}>
      <SelectBoxMultiple
        label="Select genres"
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
        label="For user"
        options={FOR_USER}
        value={selectedForUser}
        onChange={onForUserChange()}
        hideInputFilter={true}
      />
      <SelectBoxSingle
        label="Max num chapter"
        options={NUM_CHAPTER}
        value={selectedNumChapter}
        onChange={onNumChapterChange()}
        hideInputFilter={true}
      />
      <SelectBoxSingle
        label="Status"
        options={STATUS}
        value={selectedStatus}
        onChange={onStatusChange()}
        hideInputFilter={true}
      />
      <SelectBoxSingle
        label="Sort by"
        options={SORT_BY}
        value={selectedSortBy}
        onChange={onSortByChange()}
        hideInputFilter={true}
      />
      <Button
        mx={4}
        my={8}
        onPress={() =>
          navigate('find-result', {
            findOption: getFindOption(),
            path: getFindPath()
          })
        }
      >
        Find
      </Button>
    </View>
  )
}

function SelectBoxMultiple(props: any) {
  return (
    <SelectBox
      // label="Select genres"
      // options={GENRES_LIST}
      // selectedValues={selectedTeams}
      // onMultiSelect={onMultiChange()}
      // onTapClose={onMultiChange()}

      isMulti
      containerStyle={{
        // backgroundColor: 'white',
        paddingRight: 4,
        paddingLeft: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd'
      }}
      labelStyle={{
        marginTop: 10
      }}
      {...props}
    />
  )
}

function SelectBoxSingle(props: any) {
  return (
    <SelectBox
      // label="For user"
      // options={FOR_USER}
      // value={selectedForUser}
      // onChange={onForUserChange()}
      hideInputFilter={false}
      containerStyle={{
        // backgroundColor: 'white',
        paddingRight: 12,
        paddingLeft: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd'
      }}
      labelStyle={{
        fontSize: 12,
        marginTop: 10
      }}
      inputFilterStyle={{
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: 'bold',
        // color: '#555',
        opacity: 0.5
      }}
      inputFilterContainerStyle={{
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#ddd'
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
      // isMulti
      {...props}
    />
  )
}
