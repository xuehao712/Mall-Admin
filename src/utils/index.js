export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  }
  
  export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()
  
    const diff = (now - d) / 1000
  
    if (diff < 30) {
      return 'Just now'
    } else if (diff < 3600) { // less 1 hour
      return Math.ceil(diff / 60) + 'minutes ago'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + 'hours ago'
    } else if (diff < 3600 * 24 * 2) {
      return 'One day ago'
    }
    if (option) {
      return parseTime(time, option)
    } else {
      return d.getMonth() + 1 + 'month' + d.getDate() + 'day' + d.getHours() + 'hour' + d.getMinutes() + 'minute'
    }
  }