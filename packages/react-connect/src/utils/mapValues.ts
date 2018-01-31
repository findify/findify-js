// From https://github.com/acdlite/recompose/blob/master/src/packages/recompose/utils/mapValues.js
export default (obj, func) => {
  const result = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = func(obj[key], key)
    }
  }
  return result
}
