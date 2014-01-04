var recipe = (function(globals, head, Q){

  var base = '',
      method = '',
      cache = {},
      hasValue = function(value, array){
        var i, len;

        for(i = 0, len = array.length; i < len; i++){
          if(value === array[i]) {
            return true;
          }
        }
        return false;
      },
      dfd = {
        version: Q.defer(),
        dependencies: Q.defer()
      },
      uniq = function(array){
        var i,
            len,
            uniqued = [];
        for(i = 0, len = array.length; i < len; i++){
          if( !hasValue(array[i], uniqued) ){
           uniqued.push(array[i]);
          }
        }
        return uniqued;
      },
      define = function(dependencies, callback){
        var exports = recipe.exports,
            variables = [],
            variable,
            i,
            length = dependencies.length;

        for(i=0;i<length;i++){
          if(dependencies[i] === 'exports'){
            variables.push(recipe.exports);
          } else {
            variable = recipe.exports[dependencies[i]];
            variables.push( variable );
          }
        }

        callback.apply( globals, variables);
      },
      recipe = function(options){
        var namespace,
            libraries = (options||{}).libraries||[],
            scripts = (options||{}).scripts||[],
            isAmd = (options||{}).amd||false,
            urls = [],
            args = [],
            dfd = Q.defer(),
            len,
            deps,
            set,
            i;

        if(isAmd){
          globals.define = define;
        }

        recipe.get.version().promise.then(function(version){
          recipe.get.dependencies(isAmd).promise.then(function(dependencies){
            for( i = 0, len = libraries.length; i<len; i++){
              deps = dependencies[libraries[i]];
              if(!deps) {
                dfd.reject("Ingredients not found. namespace["+libraries[i]+"]");
                return dfd;
              }
              urls = urls.concat( deps );
            }

            urls = uniq( urls.concat(scripts) );
            for( i = 0, len = urls.length; i<len; i++){
              set = urls[i].split("#");
              if(!set[0]){
                dfd.reject("Illegal URL were exists. [\""+urls.join("\", \"")+"\"]");
                return dfd;
              }
              args.push(set[0]+"?_="+version+(set[1]?"#"+set[1]:""));
            }

            if(args.length) {
              args.push(function(){
                var variables = {},
                    namespace;
                if(isAmd){
                  for( i =0, len = libraries.length; i<len; i++){
                    namespace = libraries[i];
                    variables[namespace] = recipe.exports[namespace];
                  }
                }
                dfd.resolve(variables);
              });
              head.js.apply(head, args);
            } else {
              dfd.resolve();
            }

          });
        });
        return dfd.promise;
      },
      methods = {
        init: function(){
          var menu = recipe.get.menu();
          
          base = menu.replace(/\/[^\/]+$/, "");
          if(!menu) {
            throw "You might forget to order because of menu was not founded.";
          }
          recipe.get.version().promise.then(function(version){
            recipe.resolve(menu, version);
          });

        },
        resolve: function(url, version){
          var set = url.split("#");
          head.js(set[0]+"?_="+version+(set[1]?"#"+set[1]:""));
        },
        get: {
          recipeTag: function(){
            var scripts = document.getElementsByTagName("script"),
                i,
                len,
                script,
                src;

            if(scripts){
              for(i=0, len = scripts.length; i<len; i++){
                script = scripts[i];
                src = script.src || "";
                if( /\/recipe\.js$/.test( src ) && script.getAttribute('data-menu')){
                  return script;
                }
              }
            }
          },
          menu: function(){
            var script = recipe.get.recipeTag() || {getAttribute:function(){}},
                menu = script.getAttribute("data-menu"),
                url = (script.getAttribute("src")||"").replace(/[^\/]+$/, "")+menu+".js";
            return menu ? url : "";
          },
          version: function(){
            if( !recipe.version ) {
              head.js(base+'/recipe.version.js?_='+(new Date().getTime()), function(){
                dfd.version.resolve(recipe.version);
              });
            } else {
              dfd.version.resolve(recipe.version);
            }
            return dfd.version;
          },
          dependencies: function(isAmd){
            if(!recipe.dependencies) {
              head.js(base+'/recipe.'+(isAmd?'amd.':'')+'dependencies.js?_='+recipe.version, function(){
                dfd.dependencies.resolve(recipe.dependencies);
              });
            } else {
              dfd.dependencies.resolve(recipe.dependencies);
            }
            return dfd.dependencies;
          }
        }
      };

  for(method in methods){
    recipe[method] = methods[method];
  }
  recipe.exports = recipe.exports || {};

  recipe.init();
  return recipe;
})(this, head, Q);