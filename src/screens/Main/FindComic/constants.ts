export const LIMIT = 24;

// FindChapterPage
// http://www.nettruyenpro.com/tim-truyen-nang-cao?genres=&notgenres=&gender=-1&status=2&minchapter=1&sort=5
export const GENRES_LIST = [
  "Action",
  "Adult",
  "Adventure",
  "Anime",
  "Chuyển Sinh",
  "Comedy",
  "Comic",
  "Cooking",
  "Cổ Đại",
  "Doujinshi",
  "Drama",
  "Đam Mỹ",
  "Ecchi",
  "Fantasy",
  "Gender Bender",
  "Harem",
  "Lịch sử",
  "Horror",
  "Josei",
  "Live action",
  "Manga",
  "Manhua",
  "Manhwa",
  "Martial Arts",
  "Mature",
  "Mecha",
  "Mystery",
  "Ngôn Tình",
  "One shot",
  "Psychological",
  "Romance",
  "School Life",
  "Sci-fi",
  "Seinen",
  "Shoujo",
  "Shoujo Ai",
  "Shounen",
  "Shounen Ai",
  "Slice of Life",
  "Smut",
  "Soft Yaoi",
  "Soft Yuri",
  "Sports",
  "Supernatural",
  "Tạp chí truyện tranh",
  "Thiếu Nhi",
  "Tragedy",
  "Trinh Thám",
  "Truyện Màu",
  "Truyện scan",
  "Việt Nam",
  "Webtoon",
  "Xuyên Không",
  "Yaoi",
  "Yuri",
  "16+",
  "18+",
];

// minchapter=50
export const NUM_CHAPTER = [
0, 50, 100, 200, 300, 400, 500
]

type KV = {
  key: number;
  value: string;
}
// status=2
export const STATUS: KV[] = [
  {key: -1, value: 'All'},
  {key: 1, value: 'Ogging'},
  {key: 2, value: 'Completed'},
]

// gender=-1
export const FOR_USER : KV[]= [
  {key: 2, value: 'Male'},
  {key: 1, value: 'Female'},
  {key: -1, value: 'All'}
]
// sort=5
export const SORT_BY: KV[] = [
  {key: 0, value: 'New Chapter'},
  {key: 5, value: 'Alphabet'},
  {key: 10, value: 'Most Viewer'},
  {key: 11, value: 'Most Viewer In Month'},
  {key: 12, value: 'Most Viewer In Week'},
  {key: 13, value: 'Most Viewer In Today'},
  {key: 15, value: 'New Comic'},
  {key: 20, value: 'Most Subcribe'},
  {key: 25, value: 'Most Comment'},
  {key: 30, value: 'Most Chapter'},
]