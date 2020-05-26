const formatValue = (item, value) => {
  if (typeof item.type === 'undefined' || typeof value === 'undefined') {
    return value
  }
  if (item.type === 'integer') {
    if (typeof value === 'number' || !value) {
      if (value === '') {
        return null
      }
      return value
    }
    return parseInt(value.replace(/\D/g, ''), 10)
  }
  if (
    typeof item.convertSheetBoolean !== 'undefined' &&
    item.convertSheetBoolean
  ) {
    return value === 'TRUE'
  }
  return value
}

module.exports = (spec, data) => {
  const result = {}
  let missingRequired = false
  spec.forEach((item) => {
    if (typeof item.sourceFunction === 'function') {
      return
    }
    Object.keys(data).forEach((name) => {
      if (name.trim() === item.source) {
        const value = data[name]

        result[item.target] = item.format
          ? item.format(value)
          : formatValue(item, value)
      }
    })
    if (!item.nullable && !result[item.target]) {
      missingRequired = true
    }
    if (item.nullable && typeof result[item.target] === 'undefined') {
      result[item.target] = null
    }
  })

  spec.forEach((item) => {
    if (typeof item.sourceFunction === 'function') {
      result[item.target] = item.sourceFunction(result)
    }
  })
  return missingRequired ? false : result
}
