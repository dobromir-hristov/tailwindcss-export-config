import TWResolveConfig from 'tailwindcss/lib/util/resolveConfig'
import defaultConfig from 'tailwindcss/stubs/defaultConfig.stub'

export function indentWith (value, size) {
  return ' '.repeat(size) + value
}

export function resolveConfig (config) {
  if (typeof config === 'string') {
    config = require(config)
  }
  return TWResolveConfig([config, defaultConfig])
}

export function isObject (value) {
  return !Array.isArray(value) && typeof value === 'object'
}
