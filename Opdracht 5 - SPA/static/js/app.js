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
  var langChange = {
    filter: function() {
      // var langEmpty = ""
      var lang = document.querySelectorAll(".langChange")
      for (var i = 0; i < lang.length; i++) {
        lang[i].addEventListener("click", function() {
          console.log(this.value);
          api.country = `country=${this.value}`
          api.getData()
        })
      }
    }
  }

  var loader = {
    hide: function() {
      var loaderBox = document.getElementById('loaderBox');
      var loader = document.getElementById('loader');
      loaderBox.classList.add('none')
      loader.classList.add('none')
    },
    show: function() {
      var loaderBox = document.getElementById('loaderBox');
      var loader = document.getElementById('loader');
      loaderBox.classList.remove('none')
      loader.classList.remove('none')
    }
  }

  var onScroll = {
    scrollable: function() {
      window.onscroll = function() {
        scroll()
      }

      var form = document.querySelector('form');

      function scroll() {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
          form.classList.add('sticky')
        } else {
          form.classList.remove('sticky');
        }
      }
    }
  }

  var api = {
    timesSearched: 0,
    response: {},
    apiBasisUrl: 'https://newsapi.org/v2/',
    typeOfNews: 'top-headlines',
    country: `country=${langChange.filter()}`,
    apiKey: '1f66fe07b37d4b97bfa9b13709c31a59',
    getData: function() {
      if (this.timesSearched > 0) {

        var url = this.apiBasisUrl + this.typeOfNews + '?' + this.country + '&apiKey=' + this.apiKey;

      } else {
        var url = this.apiBasisUrl + this.typeOfNews + '?' + "country=us" + '&apiKey=' + this.apiKey;
        this.timesSearched++
      }

<<<<<<< HEAD
      loader.show()
      fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
          console.log(data);
          api.response = data
          routes.init(api.response.articles)
          loader.hide()
        }).catch(function(error) {
          console.log(error);
        })
=======
      request.open('GET', 'https://newsapi.org/v2/top-headlines?country=nl&apiKey=1f66fe07b37d4b97bfa9b13709c31a59', true);
      request.setRequestHeader("Accept", "application/json");
      request.send();
      console.log(api)
>>>>>>> 3e2e4f6e484a01d9a9c5e44b3826616695bfac31
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
          template.detail(data, name)
        }
      })
    }
  }

  //render / toggle sections
  var template = {
    render: function(data) {
      // hookup template engine
      onScroll.scrollable()
      var imageSpace = data.urlToImage
      var dataNews = data.filter(function(i) {
        if (imageSpace = null) {
          return null
        } else {
          return i.urlToImage
        }
      }).map(function(i) {
        return {
          title: i.title,
          display_link: i.title.replace(/ /g, "-"), //tolowercase
          multimedia: i.urlToImage,
          date: i.publishedAt.slice(0, 10),
          source: i.source.name
        }
      });

      var news = {
        display_title: {
          href: function(params) {
            return `#news/${this.display_link}`
          }
        },
        image: {
          src: function(params) {
            return this.multimedia
          }
        },
        date: {
          src: function(params) {
            return this.date
          }
        },
        source: {
          src: function(params) {
            return this.source
          }
        }
      };

      // console.log(news)

      var target = document.getElementById('activities');
      // console.log(api.response.articles);

      Transparency.render(target, dataNews, news);
    },

    detail: function(data, name) {
      var spaceName = name.replace(/-/g, " ")

      var detailNews = data.filter(function(i) {

        return i.title == spaceName

      }).map(function(i) {
        console.log(i)

        return {
          title: i.title,
          multimedia: i.urlToImage,
          description: i.description,
          linkName: i.url,
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
      var target = document.getElementById('newsmain');

      Transparency.render(target, detailNews, newsDetail);

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
      }
    }
  }
  //start the application
  app.init()
})()
