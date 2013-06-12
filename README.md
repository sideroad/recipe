# Cook your javascript with recipe.js[![Build Status](https://api.travis-ci.org/sideroad/recipe.png?branch=master)](https://travis-ci.org/sideroad/recipe)


## Overview

- Resolving libraries dependencies (Such as AMD, But It does not use `define` API)
- Avoiding browser cache without using cache manifest when you update libraries
- Multiple charset setting for each script
- Parallel script downloads for web performance. This feature was realized by `head.js`

## Prepare to cook

### Preparing dependencies, version script
Before using this plugins, please install [grunt-recipe](https://github.com/sideroad/grunt-recipe/) then make recipe.version.js, recipe.dependencies.js

### Preparing menu for each page

#### recipe(options)

|Key|Type|Value|
|---|----|-----|
|libraries|Array<String>|libraries namespace list|
|scripts|Array<String>|scripts URL list|

recipe function return `Deferred` object.
`then` function call after all libraries, scripts were loaded

```js
recipe({
  libraries: [
    "fettuccine.alfredo",
    "acqua.pazza"
  ],
  scripts: [
    "path/to/script.js"
  ]
}).then(function(){
  console.log("Dig in!");
});
```
Please append `#${charset}` into scripts path, if you want to load script with specified charset.
example below
```js
recipe({
  libraries: [
    "fettuccine.alfredo",
    "acqua.pazza"
  ],
  scripts: [
    "path/to/script.js#utf-8"
  ]
}).then(function(){
  console.log("Dig in!");
});
```

### Deploy recipe, version, dependencies and menu scripts
|Name             |Role        |Notice                       |
|-----------------|------------|-----------------------------|
|recipe.js        |Core library|                             |
|recipe.version.js|Version file|Update version when you release libraries or script for avoiding browser cache |
|recipe.dependencies.js|Defining dependencies file|Update dependencies when adding library, changing dependencies |
Required: Release your menu files, recipe.js, recipe.version.js and recipe.dependecies.js onto same directory.


### Embedded on recipe.js
```html
<script charset="UTF-8" src="path/to/recipe.js" data-menu="${name_of_menu}" async="true" ></script>
```
Please set `data-menu` attribute with menu name without extention just like `fettuccine.alfredo`, if your menu file is `fettuccine.alfredo.js`.


## Loading Flow
![Loading Flow](https://github.com/sideroad/recipe/raw/master/img/recipe.js.png)
- recipe.js get version file with random value parameter into request for avoiding cache. this is single point always requested without cache.
- recipe.js get dependencies file with version parameter.
- recipe.js get menu file. After that, recipe.js resolve libraries dependencies by given options.
- recipe.js load libraries and scripts with version parameter.
- recipe.js call `then` function


