import TWResolveConfig from 'tailwindcss/resolveConfig'

export function indentWith (value, size) {
  return ' '.repeat(size) + value
}

export function resolveConfig (config) {
  if (typeof config === 'string') {
    config = require(config)
  }
  return TWResolveConfig(config)
}

export function isObject (value) {
  return !Array.isArray(value) && typeof value === 'object'
}
