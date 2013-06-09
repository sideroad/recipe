# Cook your javascript with recipe.js[![Build Status](https://api.travis-ci.org/sideroad/recipe.png?branch=master)](https://travis-ci.org/sideroad/recipe)


## Overview

- Resolving libraries dependencies (AMD)
- Avoiding browser cache without using cache manifest when you update libraries
- Multiple charset setting each script
- Parallel script downloads

I strongly recommend to use [grunt-recipe](https://github.com/sideroad/grunt-recipe/)

## Prepare to cook

### Preparing dependencies, version script
Before using this plugins, please setting grunt-recipe and make recipe.version.js, recipe.dependencies.js

### Preparing menu for each page

#### recipe(options)

|Key|Type|Value|
|---|----|-----|
|libraries|Array<String>|libraries namespace list|
|scripts|Array<String>|scripts URL list|

recipe function return `Deferred` object.
`then` function call after all libraries, scripts loaded

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

### Embedded on recipe.js
```html
<script charset="UTF-8" src="path/to/recipe.js" data-menu="path/to/menu.js" async="true" ></script>
```

## Loading Flow
- recipe.js get version file with random value parameter into request for avoiding cache.
- recipe.js get dependencies file with version parameter.
- recipe.js get menu file. After that, recipe.js resolve libraries dependencies by given options.
- recipe.js load libraries and scripts javascript files with version parameter.


