(function(globals, $, head){

  var base = '',
      method = '',
      cache = {},
      dfd = {
        version: new $.Deferred(),
        dependencies: new $.Deferred()
      },
      uniq = function(array){
        var i,
            len,
            uniqued = [];
        for(i = 0, len = array.length; i < len; i++){
          if( $.inArray(array[i], uniqued) === -1 ){
            uniqued.push(array[i]);
          }
        }
        return uniqued;
      },
      recipe = function(options){
        var namespace,
            libraries = (options||{}).libraries||[],
            scripts = (options||{}).scripts||[],
            urls = [],
            args = [],
            dfd = new $.Deferred(),
            len,
            deps,
            set,
            i;

        recipe.get.version().then(function(version){
          recipe.get.dependencies().then(function(dependencies){
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
                dfd.resolve();
              });
              head.js.apply(head, args);
            } else {
              dfd.resolve();
            }

          });
        });
        return dfd;
      },
      methods = {
        init: function(){
          var menu = recipe.get.menu();
          
          base = menu.replace(/[^\/]+$/, '');
          if(!menu) {
            throw "You might forget to order because of menu was not founded.";
          }
          recipe.get.version().then(function(version){
            recipe.resolve(menu, version);
          });

        },
        resolve: function(url, version){
          var set = url.split("#");
          head.js(set[0]+"?_="+version+(set[1]?"#"+set[1]:""));
        },
        get: {
          menu: function(){
            var script = $("script[src$='/recipe.js'][data-menu]"),
                url = script.data("menu")||"";
            return url;
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
          dependencies: function(){
            if(!recipe.dependencies) {
              head.js(base+'/recipe.dependencies.js?_='+recipe.version, function(){
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

  recipe.init();
  globals.recipe = recipe;
})(this, jQuery, head);