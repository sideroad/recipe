(function($){
  module("missing menu");
  var err;

  window.onerror=function(e){
    err = e;
    return true;
  };

  asyncTest("recipe", function(){
    expect(1);
    $(function(){
      ok(err.match("You might forget to order because of menu was not founded."));
      start();
    });
  });
  
})(jQuery);