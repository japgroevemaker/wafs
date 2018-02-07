console.log('global scope');
// Create local scope
(function() {
  console.log('local scope');
  // initialize application
  //objec literal
  var app = {
    //method - kun je uitvoeren.
    init: function() {
      route.init()
    },
    //property
    rootElement: document.body()
  };

  //handle routs & tate
  var routes = {
    init: function() {
      //whats in the hash?
        sections.toggle(route)
    }
  }

  // render / toggle sections
  var sections = {
    toggleL: function(route) {
      console.log(route)
    }
  }

  // start application
  app.init();

});
