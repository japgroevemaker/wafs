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
          routes.init(api.response.articles)

        } else {

        }
      };

      request.onError = function() {
        console.log('het werkt niet')
      }

      request.open('GET', 'https://newsapi.org/v2/top-headlines?country=us&apiKey=1f66fe07b37d4b97bfa9b13709c31a59', true);
      request.setRequestHeader("Accept", "application/json");
      request.send();
      console.log(api)
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
        'news': function() {
          template.toggle('#news')
          template.render(data)
        },
        'news/:name': function(name) {
          console.log(name)
          template.toggle('#newsmain')
          template.newDetail(data, name)

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

      // var dataFilm = data.map(function(i) { //Map function thanks to Keving Wang and Oy
      //   return {
      //     byline: i.byline,
      //     critics_pick: i.critics_pick,
      //     date_updated: i.date_updated,
      //     title: i.title,
      //     display_link: i.title.replace(/ /g, "_"),
      //     headline: i.headline,
      //     multimedia: i.multimedia.src,
      //     link: i.link.url,
      //     summary: i.summary_short
      //   }
      // });

      var dataNews = data.map(function(i) {
        return {
          title: i.title,
          display_link: i.title.replace(/ /g, "_"),
          multimedia: i.urlToImage,
          source: i.source.name
        }
      });


      var news = {
        display_title: {
          href: function(params) {
            return `#news/${this.display_link}`
          }
        },
        headline: {
          class: function(params) {
            return this.title
          }
        },
        image: {
          src: function(params) {
            return this.multimedia
          }
        },
        source: {
          href: function(params) {
            return `${this.source}`
          }
        }
      };

      console.log(news)

      var target = document.getElementById('activities');
      console.log(api.response.articles);

      Transparency.render(target, dataNews, news);
    },

    newDetail: function(data, name) {
      var spaceName = name.replace(/_/g, " ")

      var dataNews2 = data.filter(function(i) {
        return i.title == spaceName
      }).map(function(i) {
        console.log(i)
        return {
          title: i.title,
          multimedia: i.urlToImage,
          description: i.description,
          linkName: i.url.name,
          link: i.url
        }
      });

      var newsDetail = {
        title: {
          href: function(params) {
            return this.title
          }
        },
        image: {
          src: function(params) {
            return this.multimedia
          }
        },
        description: {
          class: function(params) {
            return this.description
          }
        },
        linkName: {
          class: function(params) {
            return this.linkName
          }
        },
        link: {
          href: function(params) {
            return this.link
          }
        },
      }
      var target2 = document.getElementById('newsmain');

      Transparency.render(target2, dataNews2, newsDetail);

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
