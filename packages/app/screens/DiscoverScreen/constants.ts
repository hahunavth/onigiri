export const LIMIT = 24

// FindChapterPage
// Ex: http://www.nettruyenpro.com/tim-truyen-nang-cao?genres=&notgenres=&gender=-1&status=2&minchapter=1&sort=5

export const GENRES_LIST = [
  { id: 1, item: 'Action' },
  { id: 2, item: 'Adult' },
  { id: 3, item: 'Adventure' },
  { id: 4, item: 'Anime' },
  { id: 5, item: 'Chuyển Sinh' },
  { id: 6, item: 'Comedy' },
  { id: 7, item: 'Comic' },
  { id: 8, item: 'Cooking' },
  { id: 9, item: 'Cổ Đại' },
  { id: 10, item: 'Doujinshi' },
  { id: 11, item: 'Drama' },
  { id: 12, item: 'Đam Mỹ' },
  { id: 13, item: 'Ecchi' },
  { id: 14, item: 'Fantasy' },
  { id: 15, item: 'Gender Bender' },
  { id: 16, item: 'Harem' },
  { id: 17, item: 'Lịch sử' },
  { id: 18, item: 'Horror' },
  { id: 20, item: 'Josei' },
  { id: 21, item: 'Live action' },
  { id: 23, item: 'Manga' },
  { id: 24, item: 'Manhua' },
  { id: 25, item: 'Manhwa' },
  { id: 26, item: 'Martial Arts' },
  { id: 27, item: 'Mature' },
  { id: 28, item: 'Mecha' },
  { id: 30, item: 'Mystery' },
  { id: 32, item: 'Ngôn Tình' },
  { id: 33, item: 'One shot' },
  { id: 34, item: 'Psychological' },
  { id: 35, item: 'Romance' },
  { id: 36, item: 'School Life' },
  { id: 37, item: 'Sci-fi' },
  { id: 38, item: 'Seinen' },
  { id: 39, item: 'Shoujo' },
  { id: 40, item: 'Shoujo Ai' },
  { id: 41, item: 'Shounen' },
  { id: 42, item: 'Shounen Ai' },
  { id: 43, item: 'Slice of Life' },
  { id: 44, item: 'Smut' },
  { id: 45, item: 'Soft Yaoi' },
  { id: 46, item: 'Soft Yuri' },
  { id: 47, item: 'Sports' },
  { id: 48, item: 'Supernatural' },
  { id: 49, item: 'Tạp chí truyện tranh' },
  { id: 50, item: 'Thiếu Nhi' },
  { id: 51, item: 'Tragedy' },
  { id: 52, item: 'Trinh Thám' },
  { id: 53, item: 'Truyện Màu' },
  { id: 54, item: 'Truyện scan' },
  { id: 55, item: 'Việt Nam' },
  { id: 56, item: 'Webtoon' },
  { id: 57, item: 'Xuyên Không' },
  { id: 58, item: 'Yaoi' },
  { id: 59, item: 'Yuri' },
  { id: 60, item: '16+' },
  { id: 61, item: '18+' }
]

// minchapter=50
export const NUM_CHAPTER = [
  { id: 1, item: '0' },
  { id: 50, item: '50' },
  { id: 100, item: '100' },
  { id: 20, item: '200' },
  { id: 300, item: '300' },
  { id: 400, item: '400' },
  { id: 500, item: '500' }
]

export type OptionT = {
  id: number
  item: string
}
// status=2
export const STATUS: OptionT[] = [
  { id: -1, item: 'All' },
  { id: 1, item: 'Ogging' },
  { id: 2, item: 'Completed' }
]

// gender=-1
export const FOR_USER: OptionT[] = [
  { id: 2, item: 'Male' },
  { id: 1, item: 'Female' },
  { id: -1, item: 'All' }
]

// sort=5
export const SORT_BY: OptionT[] = [
  { id: 0, item: 'New Chapter' },
  { id: 5, item: 'Alphabet' },
  { id: 10, item: 'Most Viewer' },
  { id: 11, item: 'Most Viewer In Month' },
  { id: 12, item: 'Most Viewer In Week' },
  { id: 13, item: 'Most Viewer In Today' },
  { id: 15, item: 'New Comic' },
  { id: 20, item: 'Most Subscribe' },
  { id: 25, item: 'Most Comment' },
  { id: 30, item: 'Most Chapter' }
]

/**
 * Format array in url for multi select value
 * Ex: [1, 2, 3] -> genres=1,2,3
 */
export function toIdListStr(ids: number[]) {
  return ids.reduce((prev, id) => (prev ? prev + ',' + id : prev + id), '')
}

export type FindOptionT = {
  genres: Partial<OptionT>[]
  numChapter: Partial<OptionT>
  status: Partial<OptionT>
  forUser: Partial<OptionT>
  sortBy: Partial<OptionT>
}
