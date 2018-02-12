console.log('global scope');
//create local scope
(function() {
  console.log('local scope');
  //initialize application
  var app = {
    // is een method wat je kan uitvoeren
    init: function() {
      console.log('app initialised')
      api.getData()
    }
  }
  //handle routes & state

  var api = {
    getData: function() {
      var request = new XMLHttpRequest();

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var data = JSON.parse(request.responseText);
          template.render(data)
        } else {

        }
      };

      request.onError = function() {

      }

      request.open('GET', 'http://api.weatherunlocked.com/api/forecast/nl.1972?lang=nl&app_id=b7dff351&app_key=a82cccc7ee0981db93b7508449f13e0b', true);
      request.send();

      routes.init()

    }
  }
  var routes = {

    init: function() {
      //hookup router
        routie({
          'start': function(){
            var targetElement = document.getElementById(this.path);
            template.toggle.targetElement;
          },
          'weather': function(){
            var targetElement = document.getElementById(this.path);
            template.toggle.targetElement;
          }

        })
      // what's in the hash?
      window.addEventListener("hashchange", function(event) {
        var route = location.hash;
        template.toggle(route)
      })
    }
  }



  //render / toggle sections
  var template = {
    render: function(data) {
      // hookup template engine
          var listItems = [
            {date: data}
          ]
      console.log(data);
      Transparency.render(document.getElementById('listItems'), listItems);
    },


    toggle: function(route) {
      console.log(route);
      var sections = document.querySelectorAll("section");
      var section = document.querySelector(route);

      for (var i = 0; i < sections.length; i++) {
        sections[i].classList.add("none")
      }

      section.classList.remove("none")
    }
  }
  //start the application
  app.init()
})()
