#!/usr/bin/env node

const yargs = require('yargs')
const ConvertTo = require('./dist')
const chalk = require('chalk').default
const log = console.log
const error = (msg) => chalk.bold.bgRed('\n' + chalk.white(msg) + '\n')
const path = require('path')

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
    describe: 'Format to generate - sass,less,stylus',
    type: 'string',
    choices: ['sass', 'scss', 'less', 'styl'],
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
    boolean: true,
    nargs: 1
  })
  .argv

try {
  const converter = new ConvertTo({
    config: path.join(process.cwd(), argv.config),
    destination: argv.destination,
    format: argv.format,
    prefix: argv.prefix,
    flat: argv.flat
  })
  converter.writeToFile()
    .then((options) => {
      log(chalk.bold.bgGreen(`\n Config file written successfully to ${options.destination} `))
    })
    .catch((e) => {
      log(error(e.message))
    })
} catch (e) {
  log(error(e.message))
  throw e
}


