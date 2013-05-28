(function($){
  module("resolved");
  asyncTest("recipe", function(){
    expect(19);
    recipe({
      libraries: [
        "fettuccine.alfredo",
        "acqua.pazza"
      ],
      scripts: [
        "fixture/scripts/miscellaneous.js"
      ]
    }).then(function(){
      ok(recipe.version);
      ok(recipe.dependencies);

      ok(fettuccine);
      ok(milk);
      ok(salt);
      ok(butter);
      ok(butter.consistOf[0]);
      ok(butter.consistOf[1]);
      ok(parmigianoReggiano);
      ok(parmigianoReggiano.consistOf[0]);
      ok(parmigianoReggiano.consistOf[1]);
      ok(fettuccine.alfredo);
      ok(pomodorini);
      ok(whitefish);
      ok(acqua.pazza);
      ok(acqua.pazza.consistOf[0]);
      ok(acqua.pazza.consistOf[1]);
      ok(blah.blah.blah);

      equal( $("script[src*='/salt.js']").length, 1);

      start();
    });
  });

  asyncTest("only libraries", function(){
    expect(4);
    recipe({
      libraries: [
        "fettuccine.alfredo"
      ]
    }).then(function(){
      ok(recipe.version);
      ok(recipe.dependencies);

      ok(fettuccine.alfredo);

      equal( $("script[src*='/fettuccine.alfredo.js']").length, 1);

      start();
    });
  });

  asyncTest("only scripts", function(){
    expect(4);
    recipe({
      scripts: [
        "fixture/scripts/miscellaneous.js"
      ]
    }).then(function(){
      ok(recipe.version);
      ok(recipe.dependencies);

      ok(blah.blah.blah);

      equal( $("script[src*='/miscellaneous.js']").length, 1);

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