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
    response: {},
    getData: function() {
      var request = new XMLHttpRequest();


      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          api.response = JSON.parse(request.responseText);
          routes.init(api.response.results)

        } else {

        }
      };

      request.onError = function() {
        console.log('het werkt niet')
      }

      request.open('GET', 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=3d8eafd7eaf04aa6a1493eaa050714a7', true);
      request.setRequestHeader("Accept", "application/json");
      request.send();



    }
  }

  var routes = {

    init: function(data) {
      //hookup router
      routie({
        'start': function() {
          console.log('test')
          template.toggle('#Start')
        },
        'movies': function() {
          template.toggle('#movies')
          template.render(data)
        },
        'movies/:name': function(name) {
          console.log(name)
          template.toggle('#moviemain')
          template.movieDetail(data, name)

          // template.render(name);

          // var names = name

        }
      })
      // what's in the hash?
      // window.addEventListener("hashchange", function(event) {
      //   var route = location.hash;
      //   template.toggle(route)
      // })
    }
  }

  //render / toggle sections
  var template = {
    render: function(data) {
      // hookup template engine

      var dataFilm = data.map(function(i) { //Map function thanks to Keving Wang and Oy
        return {
          byline: i.byline,
          critics_pick: i.critics_pick,
          date_updated: i.date_updated,
          title: i.display_title,
          display_link: i.display_title.replace(/ /g, "_"),
          headline: i.headline,
          multimedia: i.multimedia.src,
          link: i.link.url,
          summary: i.summary_short
        }
      });

      var movies = {
        display_title: {
          href: function(params) {
            return `#movies/${this.display_link}`
          }
        },
        headline: {
          id: function(params) {
            return this.headline
          }
        },
        image: {
          src: function(params) {
            return this.multimedia
          }
        },
        link: {
          id: function(params) {
            return this.link
          }
        },
        summary: {
          id: function(params) {
            return this.summary
          }
        }
      };

      console.log(movies)

      var target = document.getElementById('activities');
      console.log(api.response.results);

      Transparency.render(target, dataFilm, movies);
    },

    movieDetail: function(data, name) {
      var spaceName = name.replace(/_/g, " ")

      var dataFilm2 = data.filter(function(i) {
        return i.display_title == spaceName
      }).map(function(i) {
        console.log(i)
        return {
          display_title: i.display_title,
          multimedia: i.multimedia.src,
          summary: i.link.type
        }
      });

      var movieDetail = {
        Title: {
          href: function(params) {
            return this.display_title
          }
        },
        image: {
          src: function(params) {
            return this.multimedia
          }
        },
        summary: {
          id: function(params){
            return this.article
          }
        }
      }
      var target2 = document.getElementById('moviemain');

      Transparency.render(target2, dataFilm2, movieDetail);

    },


    toggle: function(route) {
      console.log(route);
      var sections = document.querySelectorAll("section");
      var section = document.querySelector(route);

      for (var i = 0; i < sections.length; i++) {
        sections[i].classList.add("none")
      }
      if (document.querySelector(route)) {
        document.querySelector(route).classList.remove("none")
      } else {
        return
      }

      // section.classList.remove("none")
    }
  }
  //start the application
  app.init()
})()
