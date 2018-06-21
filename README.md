<p align="center">
  <a align="center" href="https://www.npmjs.com/package/tailwindcss-export-config" target="_blank">
    <img alt="Tailwindcss-export-config" src="https://raw.githubusercontent.com/dobromir-hristov/tailwindcss-export-config/master/assets/tailwindcss-export-config.png">
  </a>
</p>

<h2 align="center">Export Tailwind config options like a pro</h2>

<p align="center">

[![npm package](https://img.shields.io/npm/v/tailwindcss-export-config.svg)](https://www.npmjs.com/package/tailwindcss-export-config)

</p>


## Features

* :rocket: Exports Tailwindcss config options to SASS, SCSS, LESS and Stylus.
* :boom: CLI and Node api support
* :muscle: Unit Tested

## Getting started
1. Using npm:
`npm install tailwindcss-export-config`

or with yarn:
 
`yarn add tailwindcss-export-config`

2. Make a package.json script and run it for convenience
```json
{
  "scripts": {
    "export-tailwind-config": "tailwindcss-export-config --config=src/styles/tailwind/tailwind.config.js --destination=src/styles/scss/tailwind-configs --format=scss"
  }
}
```

or import inside your own node script

```js
import TailwindExportConfig from 'tailwindcss-export-config'
const converter = new TailwindExportConfig({
  config: 'path/to/tailwind.config.js',
  destination: 'converted/file/destination',
  format: 'scss',
  prefix: 'tw',
  flat: true
})
// writeToFile returns a promise so we can chain off it
converter.writeToFile().then(() => {
  console.log('Success')
}).catch((error) => {
  console.log('Oops', error.message)
})
```

## Config Options
All options are available to the CLI and node package. Type `tailwindcss-export-config --h` for help.

Prop|Type|Required|Description
 ---|---|---|---
config|String,Object|true| Tailwindcss config path or config object to transform
destination|String|true| Destination to save converted file
format|String|true| The format in which to convert the file
prefix|String|false| An optional prefix for each variable name
flat|Boolean|false| Optionally transforms the variables from nested maps to flat level variables. Less does not support nested maps so we default to flat for them always.

## Example export
Lets get a portion of the Tailwind config
```js
module.exports = {
  colors: {
    'transparent': 'transparent',
    'black': '#22292f',
    'grey-darkest': '#3d4852',
    'grey-darker': '#606f7b',
    'grey-dark': '#8795a1',
    'grey': '#b8c2cc',
    'grey-light': '#dae1e7',
    'grey-lighter': '#f1f5f8',
    'grey-lightest': '#f8fafc',
    'white': '#ffffff',
  }
}
```
How would this look in the various preprocessors? Whats does the flat param do?

### SCSS
Using the flat param we get:
```scss
$colors-transparent: transparent;
$colors-black: #22292f;
$colors-grey-darkest: #3d4852;
$colors-grey-darker: #606f7b;
$colors-grey-dark: #8795a1;
$colors-grey: #b8c2cc;
$colors-grey-light: #dae1e7;
$colors-grey-lighter: #f1f5f8;
$colors-grey-lightest: #f8fafc;
$colors-white: #ffffff;
```
or without with the flat param set to false

```scss
$colors: (
  transparent: transparent,
  black: #22292f,
  grey-darkest: #3d4852,
  grey-darker: #606f7b,
  grey-dark: #8795a1,
  grey: #b8c2cc,
  grey-light: #dae1e7,
  grey-lighter: #f1f5f8,
  grey-lightest: #f8fafc,
  white: #ffffff
);
```

The second (nested map) approach is a bit more annoying to work with as you have to do `map_get($colors, black)`  but things are easier to loop if you need to.

Sass is almost the same and you can import both sass and scss vars into the same project. We support them both if someone prefers one syntax over the other.

### LESS
```less
@colors-transparent: transparent;
@colors-black: #22292f;
@colors-grey-darkest: #3d4852;
@colors-grey-darker: #606f7b;
@colors-grey-dark: #8795a1;
@colors-grey: #b8c2cc;
@colors-grey-light: #dae1e7;
@colors-grey-lighter: #f1f5f8;
@colors-grey-lightest: #f8fafc;
@colors-white: #ffffff;
```

Less does not have nested maps so passing the `flat` param will not do anything

### Stylus
```stylus
$colors-transparent = transparent
$colors-black = #22292f
$colors-grey-darkest = #3d4852
$colors-grey-darker = #606f7b
$colors-grey-dark = #8795a1
$colors-grey = #b8c2cc
$colors-grey-light = #dae1e7
$colors-grey-lighter = #f1f5f8
$colors-grey-lightest = #f8fafc
$colors-white = #ffffff
```

or with the flat param to false 

```stylus
$colors = {
  transparent: transparent,
  black: #22292f,
  grey-darkest: #3d4852,
  grey-darker: #606f7b,
  grey-dark: #8795a1,
  grey: #b8c2cc,
  grey-light: #dae1e7,
  grey-lighter: #f1f5f8,
  grey-lightest: #f8fafc,
  white: #ffffff
}
```

Using the colors is a matter of reaching using dot notation `$colors.black` or `$colors[black]`.

### Prefix
You can prefix the colors to escape naming collisions by using the `prefix` param

`--prefix=tw`

```scss
$tw-colors-transparent: transparent;
$tw-colors-black: #22292f;
$tw-colors-grey-darkest: #3d4852;
$tw-colors-grey-darker: #606f7b;
$tw-colors-grey-dark: #8795a1;
$tw-colors-grey: #b8c2cc;
$tw-colors-grey-light: #dae1e7;
$tw-colors-grey-lighter: #f1f5f8;
$tw-colors-grey-lightest: #f8fafc;
$tw-colors-white: #ffffff;
```
