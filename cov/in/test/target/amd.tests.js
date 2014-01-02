(function($){


  module("init");

  asyncTest("get version", function(){
    expect(1);
    recipe.get.version().then(function(){
      ok(true);
      start();
    });
  });

  asyncTest("get AMD dependencies", function(){
    expect(1);
    recipe.get.dependencies(true).then(function(){
      ok(true);
      start();
    });
  });

  test("get menu", function(){
    equal( "../fixture/recipe/menu.mock.js", recipe.get.menu());
  });

  module("resolved");

  asyncTest("AMD loading", function(){
    expect(27);
    recipe({
      libraries: [
        "fettuccine.alfredo",
        "acqua.pazza"
      ],
      scripts: [
        "../fixture/scripts/miscellaneous.js"
      ],
      amd: true
    }).then(function(){
      ok(recipe.version);

      //it should not define variables in global scope.
      ok(!this.fettuccine);
      ok(!this.milk);
      ok(!this.salt);
      ok(!this.butter);
      ok(!this.parmigianoReggiano);
      ok(!this.fettuccine);
      ok(!this.pomodorini);
      ok(!this.whitefish);
      ok(!this.acqua);

      //it should define to recipe exports object
      ok(recipe.exports.fettuccine);
      ok(recipe.exports.milk);
      ok(recipe.exports.salt);
      ok(recipe.exports.butter);
      ok(recipe.exports.butter.consistOf[0]);
      ok(recipe.exports.butter.consistOf[1]);
      ok(recipe.exports.parmigianoReggiano);
      ok(recipe.exports.parmigianoReggiano.consistOf[0]);
      ok(recipe.exports.parmigianoReggiano.consistOf[1]);
      ok(recipe.exports.fettuccine.alfredo);
      ok(recipe.exports.pomodorini);
      ok(recipe.exports.whitefish);
      ok(recipe.exports['acqua.pazza']);
      ok(recipe.exports['acqua.pazza'].consistOf[0]);
      ok(recipe.exports['acqua.pazza'].consistOf[1]);

      //scirpts should be define in global scope
      ok(blah.blah.blah);

      equal( $("script[src*='/salt.amd.js'][type='text/javascript']").length, 1);
      start();
    }).done();
  });

  asyncTest("only libraries", function(){
    expect(5);
    recipe({
      libraries: [
        "fettuccine.alfredo"
      ],
      amd: true
    }).then(function(){
      ok(recipe.version);
      ok(recipe.dependencies);

      ok(!this.fettuccine);
      ok(recipe.exports.fettuccine.alfredo);

      equal( $("script[src*='/fettuccine.alfredo.amd.js'][type='text/javascript']").length, 1);
      start();
    });
  });

  asyncTest("only scripts", function(){
    expect(4);
    recipe({
      scripts: [
        "../fixture/scripts/miscellaneous.js"
      ],
      amd: true
    }).then(function(){
      ok(recipe.version);
      ok(recipe.dependencies);

      ok(blah.blah.blah);

      equal( $("script[src*='/miscellaneous.js'][type='text/javascript']").length, 1);
      start();
    });
  });

  asyncTest("no dependencies", function(){
    expect(2);
    $.when(
      recipe(),
      recipe({}),
      recipe({libraries:[],scripts:[]})
    ).done(function(){
      ok(recipe.version);
      ok(recipe.dependencies);
      start();
    });
  });

  module("reject");
  
  asyncTest("Ingredients not found", function(){
    expect(1);
    recipe({
      libraries: [
        "dragon.egg"
      ]
    }).fail(function(mes){
      equal(mes, "Ingredients not found. namespace[dragon.egg]");
      start();
    });
  });

  asyncTest("Illegal URL were exists", function(){
    expect(1);
    recipe({
      scripts: [
        ""
      ]
    }).fail(function(mes){
      equal(mes, "Illegal URL were exists. [\"\"]");
      start();
    });
  });

  
})(jQuery);