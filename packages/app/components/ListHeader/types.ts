import { resComicItem_T } from 'app/types'

export type comicListProps = {
  list?: resComicItem_T[] | undefined
  name?: string
  subtitle?: string
  limit?: number
  onPressMore?: () => any
  color?: '' | 'Blue' | 'Green' | 'Teal' | 'Yellow'
}
