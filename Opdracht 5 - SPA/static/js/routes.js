import app from './app1.js'
import template from './template.js'

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

export default routes
