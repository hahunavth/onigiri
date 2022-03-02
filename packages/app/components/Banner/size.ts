import { Dimensions } from 'react-native'

export const { width, height } = Dimensions.get('window')

export const NUM_COLUMN = Number.parseInt((width / 540).toFixed()) || 1
export const ITEM_HEIGHT = height / 4
export const ITEM_PADDING = 4

export const ITEM_WIDTH =
  (width - (2 * NUM_COLUMN + 2) * ITEM_PADDING) / NUM_COLUMN

export const HEIGHT = 800

/**
 *
 * ..|          |..|           |..|
 *   |          |  |           |
 *   |          |  |           |
 *   |          |  |           |
 *
 */

/*
  1: with - 4 padding
  2: with - 6 padding
  3: with - 8 padding
  n: with - (2n+2) padding
  item width = W(n)/num
*/
