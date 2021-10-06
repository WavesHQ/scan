import enUS from 'date-fns/locale/en-US'

const formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a sec',
    other: 'less than {{count}} secs'
  },

  xSeconds: {
    one: '1 sec',
    other: '{{count}} secs'
  },

  halfAMinute: 'half a min',

  lessThanXMinutes: {
    one: 'less than a min',
    other: 'less than {{count}} mins'
  },

  xMinutes: {
    one: '1 min',
    other: '{{count}} mins'
  },

  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },

  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },

  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },

  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },

  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },

  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },

  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },

  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },

  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },

  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },

  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
}

function formatDistance (
  token: string,
  count: number,
  options: {
    addSuffix?: boolean
    comparison?: -1 | 0 | 1
  }): string {
  let result: string

  const tokenValue = formatDistanceLocale[token]
  if (typeof tokenValue === 'string') {
    result = tokenValue
  } else if (count === 1) {
    result = tokenValue.one
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString())
  }

  if (options.comparison !== undefined && options.comparison > 0) {
    return 'in ' + result
  }

  return result + ' ago'
}

export const enUSShort = {
  ...enUS,
  formatDistance
}
