export type ChapterViewListProps = {
  setImgs: React.Dispatch<React.SetStateAction<{ uri: string; h: number }[]>>
  imgs: { uri: string; h: number }[]
  handleScroll?: (e: any) => void
  // Toggle BottomSheet
  onEndReach?: (e: any) => void

  toggleFloatingVisible?: () => any
  imgList: string[]
}
