import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'next/router'
import { useApiComicDetail, useApiChapter } from 'app/store/api'
import ChapterViewListScreen from 'app/screens/ChapterScreen/ChapterViewListScreen'
import useInteraction from 'app/hooks/useInteraction'

type Props = {}

const chapter = (props: Props) => {
  const router = useRouter()

  const { comicPath, cptId } = router.query
  const { isSuccess, data } = useApiComicDetail(comicPath?.toString() || '', {})
  const curCpt = React.useMemo(() => {
    // FIXME: Add -1 wien navigate from comic-detail
    return data?.chapters[Number.parseInt(cptId?.toString() || '0') - 1]
  }, [isSuccess, comicPath, cptId])

  const [imgs, setImgs] = React.useState<{ uri: string; h: number }[]>([])

  const {
    isSuccess: isSuccess2,
    data: data2,
    refetch
  } = useApiChapter(curCpt?.path || '', {
    // skip: true,
    refetchOnMountOrArgChange: true
  })
  console.log(
    '🚀 ~ file: chapter.tsx ~ line 25 ~ chapter ~ curCpt?.path',
    curCpt?.path
  )
  // console.log(data?.chapters.length, Number.parseInt(cptId?.toString() || '0') - 1)
  React.useEffect(() => {
    refetch()
  }, [data, isSuccess, curCpt])

  // useInteraction({
  //   callback: () => {
  //     setImgs(data2?.data?.images.map((uri) => ({ uri, h: 0 })) || [])
  //   },
  //   dependencyList: [data2, comicPath, cptId]
  // })

  React.useEffect(() => {
    const imm = setImmediate(() => {
      setImgs(data2?.data?.images.map((uri) => ({ uri, h: 0 })) || [])
    })
    return () => {
      clearImmediate(imm)
    }
  }, [data2, comicPath, cptId])

  return (
    <View>
      <Text>chapter</Text>
      {/* ComicView */}
      {isSuccess2 ? (
        <View style={{ flex: 1 }}>
          <ChapterViewListScreen
            // ref={flatListRef as any}
            // handleScroll={handleScroll}
            imgs={imgs || []}
            setImgs={setImgs}
            // onEndReach={expandSheet}
          />
        </View>
      ) : null}
    </View>
  )
}

export default chapter
