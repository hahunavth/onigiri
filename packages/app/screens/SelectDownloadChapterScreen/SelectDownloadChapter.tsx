import {
  View,
  Text,
  HStack,
  VStack,
  FlatList,
  Spinner,
  Box,
  Button,
  Divider
} from 'native-base'
import React from 'react'
import { InteractionManager, ListRenderItemInfo } from 'react-native'
import { cptName2Num } from 'app/utils/helper'
import { SelectableBadge } from 'app/components/SelectableBadge'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import type { SelectDownloadChapterProps } from 'app/navigators/StackNav'
import { historySelector } from 'app/store/historySlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { downloadComicThunk } from 'app/store/historySlice'

export type SelectChapterListItem = {
  name: string | number
  status: 't' | 'f' | 'd'
  path?: string
}

export function SelectDownloadChapter(props: SelectDownloadChapterProps) {
  const dispatch = useAppDispatch()
  const { downloadCpt, downloadComics, comics } =
    useAppSelector(historySelector)
  const { comic } = props.route.params

  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedCount, setSelectedCount] = React.useState(0)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [isDownloading, setIsDownloading] = React.useState(false)
  const [selectChapterList, setSelectChapterList] = React.useState<
    SelectChapterListItem[]
  >([])

  const onPress = React.useCallback((id: number) => {
    return new Promise(() => {
      setSelectChapterList((state) => {
        const newState = [...state]
        const changeItem = newState[id]
        if (changeItem.status === 't') {
          changeItem.status = 'f'
          newState[id] = changeItem
          setSelectedCount((count) => count - 1)
          return newState
        }
        if (changeItem.status === 'f') {
          changeItem.status = 't'
          newState[id] = changeItem
          setSelectedCount((count) => count + 1)
          return newState
        }
        return state
      })
    })
  }, [])

  React.useEffect(() => {
    let isMounted = true
    const interaction = InteractionManager.runAfterInteractions(() => {
      if (isMounted) {
        setSelectChapterList(
          comic?.chapters.map((cpt) => {
            return {
              name: cptName2Num(cpt.name),
              status: !downloadCpt[cpt?.path] ? 'f' : 'd',
              path: cpt?.path
            }
          }) || []
        )
      }
      console.log('done')
      setIsLoading(false)
    })

    return () => {
      isMounted = false
      interaction.cancel()
    }
  }, [comic?.chapters, downloadCpt])

  React.useEffect(() => {
    if (isProcessing) {
      Promise.resolve(
        new Promise(() => {
          if (selectedCount === selectChapterList.length) {
            setSelectChapterList((list) =>
              list.map((item) =>
                item.status !== 'd' ? { ...item, status: 'f' } : item
              )
            )
            setSelectedCount(0)
          } else {
            setSelectChapterList((list) =>
              list.map((item) =>
                item.status !== 'd' ? { ...item, status: 't' } : item
              )
            )
            setSelectedCount(selectChapterList.length)
          }
        })
      )
    }
    setIsProcessing(false)
  }, [isProcessing])

  React.useEffect(() => {
    let isMounted = true
    if (isDownloading) {
      dispatch(
        downloadComicThunk({
          comic: props.route.params.comic,
          chapterPaths: selectChapterList
            .filter((item) => item.status === 't')
            .map((item) => item.path)
            .filter((s) => s) as string[]
        })
      ).then(() => {
        // console.log('DONE'
        if (isMounted) setIsDownloading(false)
      })
    }

    return () => {
      isMounted = false
    }
  }, [isDownloading])

  const renderItem = React.useCallback(
    ({ item, index }) => {
      return (
        <SelectableBadge
          id={index}
          collapsable={true}
          onPress={onPress}
          name={item.name}
          variant={
            item.status === 'd'
              ? 'solid'
              : // : isSelectAll
              // ? 'subtle'
              item.status === 't'
              ? // selected.includes(item.name)
                'subtle'
              : 'outline'
          }
        ></SelectableBadge>
      )
    },
    [downloadComics, comics[comic?.path]?.downloadCount]
  )

  return (
    <VStack flex={1} maxW={1000} bg={'$light.backgroundPrimary'}>
      {/*  */}
      <HStack
        px={3}
        mb={2}
        justifyContent={'space-between'}
        bg={'$light.backgroundPrimary'}
        _text={{ color: '$light.textBluePrimary' }}
      >
        <Text color={'$light.textBlueSecondary'}>
          All: {selectChapterList.length} chapters
        </Text>
        <Text color={'$light.textBlueSecondary'}>Sort</Text>
      </HStack>

      {/*  */}
      <View flex={1}>
        {isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            data={selectChapterList}
            style={{
              flex: 1
            }}
            columnWrapperStyle={{
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
            renderItem={renderItem}
            numColumns={3}
            getItemLayout={(data, index) => {
              return {
                length: 40,
                offset: Math.floor(40 / 3),
                index
              }
            }}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            keyExtractor={(item) => item.name.toString()}
          />
        )}
      </View>
      {/*  */}

      <VStack
        // FIXME: SHADOW NOT WORKING
        shadow={'9'}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 10,
            height: 50
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: -10
        }}
      >
        <View pt={4} pb={4}>
          <Text alignSelf={'center'}>Selected: {selectedCount}</Text>
          <Text alignSelf={'center'}>
            Download: {comics[comic?.path]?.downloadCount}
          </Text>
        </View>
        <HStack
          h={10}
          mb={2}
          flexDirection={'row'}
          justifyContent={'space-evenly'}
        >
          <Button
            onPress={() => {
              setIsProcessing(true)
              // Set false in next render
              // Long job in use effect
            }}
            isLoading={isProcessing}
          >
            Select all
          </Button>
          <Divider orientation="vertical" />
          <Button
            onPress={() => {
              setIsDownloading(true)
            }}
            isLoading={isDownloading}
          >
            Download
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}
