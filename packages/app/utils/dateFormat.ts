import { formatDistance, differenceInDays } from 'date-fns'
import { vi } from 'date-fns/locale'

export function dateString2Distance(dateString: string | undefined | null) {
  try {
    if (typeof dateString === 'string') {
      const date = new Date(dateString)
      const diff = differenceInDays(new Date(), date)
      if (diff < 7)
        return formatDistance(date, new Date(), { addSuffix: true, locale: vi })
      else return date.toLocaleDateString('en-US')
    } else return null
  } catch (e) {
    console.log(e)
  }
}
