const yargs = require('yargs')
const convert = require('./index.js')

const argv = yargs // eslint-disable-line
  .usage('Usage: $0 -config [relative_path] -destination [relative_path]')
  .option('config', {
    alias: 'c',
    describe: 'Tailwind config file path',
    type: 'string', /* array | boolean | string */
    nargs: 1,
    demand: true
  })
  .option('destination', {
    alias: 'd',
    describe: 'Path to save Sass config file to',
    type: 'string', /* array | boolean | string */
    nargs: 1,
    demand: true
  })
  .option('format', {
    alias: 'f',
    describe: 'SASS or SCSS format',
    type: 'string', /* array | boolean | string */
    nargs: 1,
    demand: true
  })
  .option('prefix', {
    describe: 'variable prefix',
    type: 'string', /* array | boolean | string */
    nargs: 1
  })
  .option('flat', {
    describe: 'Variable style (flat or nested map)',
    type: 'boolean', /* array | boolean | string */
    nargs: 1
  })
  .argv

convert({
  config: argv.config,
  destination: argv.destination,
  format: argv.format,
  prefix: argv.prefix,
  flat: argv.flat
})
