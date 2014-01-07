(function(global, $){

  asyncTest("jQuery Loading", function(){
    expect(6);
    recipe({
      libraries: [
        "jQuery"
      ],
      amd: true
    }).then(function(variables){
      ok(recipe.version);
      ok(recipe.dependencies);

      //it should not define variables in global scope.
      ok(global.jQuery);
      ok(!global.$);

      //it should define to recipe exports object
      ok(recipe.exports.jQuery);

      //it should be passed arguments with libraries variables
      deepEqual(variables['jQuery'], recipe.exports['jQuery']);

      start();
    }).done();
  });

  asyncTest("jQuery with other library Loading", function(){
    expect(16);
    recipe({
      libraries: [
        "jQuery",
        "acqua.pazza"
      ],
      amd: true
    }).then(function(variables){
      ok(recipe.version);
      ok(recipe.dependencies);

      //it should not define variables in global scope.
      ok(global.jQuery);
      ok(!global.pomodorini);
      ok(!global.whitefish);
      ok(!global.acqua);
      ok(!global.$);

      //it should define to recipe exports object
      ok(recipe.exports.jQuery);
      ok(recipe.exports.pomodorini);
      ok(recipe.exports.whitefish);
      ok(recipe.exports['acqua.pazza']);
      ok(recipe.exports['acqua.pazza'].consistOf[0]);
      ok(recipe.exports['acqua.pazza'].consistOf[1]);

      //it should be passed arguments with libraries variables
      deepEqual(variables['jQuery'], recipe.exports['jQuery']);
      deepEqual(variables['acqua.pazza'], recipe.exports['acqua.pazza']);

      equal( $("script[src*='/acqua.pazza.amd.js'][type='text/javascript']").length, 1);

      start();
    }).done();
  });


})(this, recipe.exports.jQuery);