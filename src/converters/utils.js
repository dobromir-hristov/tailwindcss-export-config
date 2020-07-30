import TWResolveConfig from 'tailwindcss/resolveConfig'

export function indentWith (value, size) {
  return ' '.repeat(size) + value
}

/**
 * Resolves a config.
 * If passed a string, imports it first.
 * @param {String | Object} config
 * @return {Object}
 */
export function resolveConfig (config) {
  if (typeof config === 'string') {
    config = require(config)
  }
  return TWResolveConfig(config)
}

export function isObject (value) {
  return !Array.isArray(value) && typeof value === 'object'
}

export function sanitizeKey (text) {
  return text.replace(/%/g, '').replace(/, /g, '-')
}
