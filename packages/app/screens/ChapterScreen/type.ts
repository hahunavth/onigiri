export type ChapterViewListProps = {
  imgs: string[];
  handleScroll?: (e: any) => void;
  // Toggle BottomSheet
  onEndReach?: (e: any) => void;

  toggleFloatingVisible?: () => any;
  imgList?: string[];
};
