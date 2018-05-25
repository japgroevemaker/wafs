import onScroll from './scroll.js'
import api from './api.js'

var template = {
  render: function(data) {
    // hookup template engine
    onScroll.scrollable()
    var imageSpace = data.urlToImage
    var dataNews = data.filter(function(i){
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
        date: i.publishedAt.slice(0,10),
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
        src: function(params){
          return this.date
        }
      },
      source: {
        src: function(params){
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

export default template
