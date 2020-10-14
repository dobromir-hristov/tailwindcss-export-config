<p align="center">
  <a align="center" href="https://www.npmjs.com/package/tailwindcss-export-config" target="_blank">
    <img alt="Tailwindcss-export-config" src="https://raw.githubusercontent.com/dobromir-hristov/tailwindcss-export-config/master/assets/tailwindcss-export-config.png">
  </a>
</p>

<h2 align="center">Export Tailwind config options like a pro</h2>

<p align="center">
<a href="https://www.npmjs.com/package/tailwindcss-export-config" target="_blank"><img src="https://img.shields.io/npm/v/tailwindcss-export-config.svg"></a>
</p>

## Features

* 🚀 Exports Tailwindcss config options to SASS, SCSS, LESS and Stylus.
* 💥 CLI and Node api support
* 💪 Unit Tested

## Getting started

Using npm:

```bash
npm install tailwindcss-export-config
```

or with yarn:

```bash
yarn add tailwindcss-export-config
```

Make a package.json script and run it for convenience

```json
{
  "scripts": {
    "export-tailwind-config": "tailwindcss-export-config --config=path/to/tailwind.config.js --destination=destination/of/generated/tailwind-variables --format=scss --quoted-keys=true"
  }
}
```

You can also use the Node API

```js
import TailwindExportConfig from 'tailwindcss-export-config'

const converter = new TailwindExportConfig({
  config: 'path/to/tailwind.config.js',
  destination: 'converted/file/destination',
  format: 'scss',
  prefix: 'tw',
  flat: true,
  quotedKeys: true,
  preserveKeys: ['colors', 'screens'],
})

// writeToFile returns a promise so we can chain off it
converter.writeToFile()
  .then(() => {
    console.log('Success')
  })
  .catch((error) => {
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
flat|Boolean|false| Optionally transforms the variables from nested maps to flat level variables. Less does not support nested maps so we default to flat for them always. Defaults to `false`.
quoted-keys|Boolean|false| (`quotedKeys` in the Node API) - Whether keys in maps should be quoted or not. We recommend to have this set to `true`. Defaults to `false`.
flatten-maps-after|Number|false| (`flattenMapsAfter` in the Node API) - After what level should it start flattening deeply nested maps. Defaults to `-1` (always flatten).
preserve-keys|Array|false|(`preserveKeys` in the Node API) - Always keep those keys in export. Defaults to `[]`.

## Example export
Lets get a portion of the Tailwind config
```js
module.exports = {
  theme: {
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    extend: {
      colors: {
        cyan: '#9cdbff',
      }
    }
  }
}
```

Using the CLI command

```bash
tailwindcss-export-config --config=tailwind.config.js --destination=tailwind-variables --format=scss --flat
```

### How would this look when generated?

### SCSS

Using the flat param we get:

```scss
$screens-sm: 640px;
$screens-md: 768px;
$screens-lg: 1024px;
$screens-xl: 1280px;

$fontFamily-display: (Gilroy,sans-serif);
$fontFamily-body: (Graphik,sans-serif);

//... other vars
$colors-pink-800: #97266d;
$colors-pink-900: #702459;
$colors-cyan: #9cdbff;

```
or without with the flat param set to false

```scss
$fontFamily: (
  display: (Gilroy,sans-serif),
  body: (Graphik,sans-serif),
);

$colors: (
  //... other vars
  pink-700: #b83280,
  pink-800: #97266d,
  pink-900: #702459,
  cyan: #9cdbff,
);

```

When working with SASS, the second (nested map) approach is a bit more annoying to work with as you have to do `map-get($colors, black)`  but things are easier to loop if you need to.

Sass is almost the same and you can import both sass and scss vars into the same project. We support them both if someone prefers one syntax over the other.

### LESS

```less
@fontFamily-display: Gilroy, sans-serif;
@fontFamily-body: Graphik, sans-serif;

// other vas
@colors-pink-600: #d53f8c;
@colors-pink-700: #b83280;
@colors-pink-800: #97266d;
@colors-pink-900: #702459;
@colors-cyan: #9cdbff;
```

**Note:** Less does not have nested maps, so passing the `flat` param will not do anything

### Stylus
```stylus
$fontFamily-display = (Gilroy,sans-serif);
$fontFamily-body = (Graphik,sans-serif);

// ...other vars

$colors-pink-800 = #97266d;
$colors-pink-900 = #702459;
$colors-cyan = #9cdbff;
```

or with the flat param to false

```stylus
$fontFamily = {
  display: (Gilroy,sans-serif),
  body: (Graphik,sans-serif),
};

// ...other vars

$colors = {
   // ...other vars
  "pink-600": #d53f8c,
  "pink-700": #b83280,
  "pink-800": #97266d,
  "pink-900": #702459,
  cyan: #9cdbff,
}
```

With stylus, using nested maps is a matter of reaching using dot notation `$colors.black` or `$colors[black]`. JavaScript anyone?

### Prefix
You can prefix variables to escape naming collisions by using the `prefix` param

```bash
tailwindcss-export-config --config=tailwind.config.js --destination=tailwind-variables --format=scss --flat --prefix=tw
```

```scss
$tw-fontFamily-display: (Gilroy,sans-serif);
$tw-fontFamily-body: (Graphik,sans-serif);

$tw-colors-pink-600: #d53f8c;
$tw-colors-pink-700: #b83280;
$tw-colors-pink-800: #97266d;
$tw-colors-pink-900: #702459;
$tw-colors-cyan: #9cdbff;
```

### Quoted Keys

SASS and other preprocessors recommend defining map keys in quotes. It is possible comply with that, by using the optional `quotedKeys` setting.

```bash
tailwindcss-export-config --config=tailwind.config.js --destination=tailwind-variables --format=scss --quoted-keys=true
```

```scss
$fontFamily: (
  "display": (Gilroy,sans-serif),
  "body": (Graphik,sans-serif),
);

$colors: (
  //... other vars
  "pink-700": #b83280,
  "pink-800": #97266d,
  "pink-900": #702459,
  "cyan": #9cdbff,
);

```

### Flattening deep maps

If your tailwind config has a deeply nested object, it can be converted to a deeply nested map, in SASS or Stylus, or a flattened, single level map.

Given the object below:

```js
module.exports = {
  theme: {
    customForms: {
      colors: {
        blue: 'blue',
        green: 'green',
      },
      somethingElse: {
        level1: {
          color: 'pink',
          arrayValue: ['a', 'b', 'c'],
        }
      }
    }
  }
}
```

By default it will convert to:

```scss
$customForms: (
  colors-blue: blue,
  colors-green: green,
  somethingElse-level1-color: pink,
  somethingElse-level1-arrayValue: (a,b,c),
);
```

If we want to keep the nested structure, similar to the tailwind config, we can set a high number for the `flattenMapsAfter` parameter.

```bash
tailwindcss-export-config --config=tailwind.config.js --destination=tailwind-variables --format=scss --flatten-maps-after=10
```

```scss
$customForms: (
  colors: (
    blue: blue,
    green: green,
  ),
  somethingElse: (
    level1: (
      color: pink,
      arrayValue: (a,b,c),
    ),
  ),
);
```

### Preserve keys

You can explicitly preserve some tailwind config keys using the `preserveKeys` parameter.

```
tailwindcss-export-config --config=tailwind.config.js --destination=tailwind-variables --format=scss --preserveKeys=colors --preserveKeys=screens
```

## Notice

This branch works with v1.x of Tailwindcss. If you are using the older 0.x version, please use `legacy` version

```bash
npm install tailwindcss-export-config@legacy
```
