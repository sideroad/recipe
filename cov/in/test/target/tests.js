(function(global, $){


  module("common tests");

  asyncTest("get version", function(){
    expect(1);
    recipe.get.version().promise.then(function(){
      ok(true);
      start();
    });
  });

  test("get menu", function(){
    equal( "../fixture/recipe/menu.mock.js", recipe.get.menu());
  });

})(this, recipe.exports.jQuery || jQuery);