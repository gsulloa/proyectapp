import _ from "lodash"

export function getDate(date) {
  if (_.isString(date)) date = new Date(date)
  return `${addZero(date.getFullYear())}-${addZero(
    date.getMonth() + 1
  )}-${addZero(date.getDate())}`
}

export function getTime(date) {
  if (_.isString(date)) date = new Date(date)
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
}

export function getDatetime(date) {
  if (_.isString(date)) date = new Date(date)
  return `${getDate(date)} ${getTime(date)}`
}

export function addZero(i) {
  if (i < 10) {
    return `0${i}`
  }
  return `${i}`
}
