const fse = require('fs-extra')
const path = require('path')
const converters = require('./converters/index')

const allowedFormatsMap = {
  stylus: converters.Stylus,
  styl: converters.Stylus,
  sass: converters.Sass,
  scss: converters.Scss,
  less: converters.Less,
  css: 'css'
}
/**
 * Converts tailwind config into desired format
 * @name convertToFormat
 * @param options
 * @param {string} options.config - Tailwindcss config path
 * @param {string} options.format - Format we are after
 * @param {string} options.destination - Converted file target destination
 * @param {boolean} options.flat - Should it convert to a flat structure
 * @param {string} options.prefix - Variable prefix
 */
module.exports = function convertToFormat (options) {
  const Converter = allowedFormatsMap[options.format]
  const config = require(path.join(process.cwd(), options.config))

  const convertor = new Converter({ config, prefix: options.prefix, flat: options.flat })
  let buffer = `/** Converted Tailwind Config to ${options.format} **/`
  buffer += convertor.convert()
  writeFile(buffer, { destination: options.destination, format: convertor.getFormat() })
}

function writeFile (data, { destination, format }) {
  // If destination ends with a slash, we append a name to the file
  if (destination.endsWith(path.sep)) destination += 'tailwind-config'
  const file = path.join(process.cwd(), `${destination}.${format}`)
  fse.outputFile(file, data, function (err) {
    if (err) throw err

    console.log('The file was saved!')
  })
}



