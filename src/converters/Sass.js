const reduce = require('lodash.reduce')
const foreach = require('lodash.foreach')

const Converter = require('./Converter')

class SassConverter extends Converter {
  constructor (opts) {
    super(opts)
  }

  _convertObjectToMap (prop, data) {
    let buffer = '(\n'
    foreach(data, (v, p) => {
      buffer += `  ${p}: ${this._sanitizePropValue(v)},\n`
    })
    buffer += ')'
    return `$${this.prefix}${prop}: ${buffer}`
  }

  _convertObjectToVar (prop, data) {
    return reduce(data, (all, v, p) => {
      all += `$${this.prefix}${prop}-${p.replace('/', '\\/')}: ${this._sanitizePropValue(v)}\n`
      return all
    }, '')
  }

  getFormat () {
    return 'sass'
  }
}

module.exports = SassConverter
