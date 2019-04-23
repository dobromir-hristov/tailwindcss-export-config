import Converter from './Converter'

/**
 * @extends Converter
 */
class ScssConverter extends Converter {
  format = 'scss'

  mapOpener = '(\n'
  mapCloser = ')'

  _buildVar (name, value) {
    return `$${name}: ${value};\n`
  }
}

export default ScssConverter
