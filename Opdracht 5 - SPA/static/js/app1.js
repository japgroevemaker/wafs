import routes from './routes.js'
import api from './api.js'

var app = {
  // is een method wat je kan uitvoeren
  init: function() {
    console.log('app initialised')
    api.getData()
  }
}

export default app
