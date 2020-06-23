import Converter from './Converter'
import { indentWith } from './utils'

class SassConverter extends Converter {
  format = 'sass'

  mapOpener = '('
  mapCloser = ')'

  _buildVar (name, value) {
    return `$${name}: ${value}\n`
  }

  _buildObjectEntry (key, value, indent, index, metricIndex = 0) {
    return indentWith(`${this._objectEntryKeySanitizer(key)}: ${this._sanitizePropValue(value)},`, indent + ((!index && !metricIndex) ? 0 : 1))
  }
}

export default SassConverter
