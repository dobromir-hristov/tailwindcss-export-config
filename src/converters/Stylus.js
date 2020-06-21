import Converter from './Converter'

class StylusConverter extends Converter {
  format = 'styl'

  mapOpener = '{\n'
  mapCloser = '}'

  _buildVar (name, value) {
    return `$${name} = ${value};\n`
  }

  _objectEntryKeySanitizer (prop) {
    if (/\d/.test(prop) || this.quotedKeys) return `"${prop}"`
    return prop
  }
}

export default StylusConverter
