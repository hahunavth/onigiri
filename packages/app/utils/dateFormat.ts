import { formatDistance } from 'date-fns'
import { vi } from 'date-fns/locale'

export function dateString2Distance(dateString: string | undefined | null) {
  if (typeof dateString === 'string') {
    const date = new Date(dateString)
    return formatDistance(date, new Date(), { addSuffix: true, locale: vi })
  } else return 'DATE_ERR'
}
