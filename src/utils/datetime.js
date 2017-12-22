export function getDate(date) {
  const realDate = new Date(date)
  return `${realDate.getFullYear()}-${realDate.getMonth() +
    1}-${realDate.getDate()}`
}

export function getTime(date) {
  const realDate = new Date(date)
  return `${realDate.getHours()}:${realDate.getMinutes()}`
}
