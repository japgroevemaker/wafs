import loader from './loader.js'
import langChange from './filter.js'
import routes from './routes.js'

var api = {
  timesSearched: 0,
  response: {},
  apiBasisUrl: 'https://newsapi.org/v2/',
  typeOfNews: 'top-headlines',
  country: `country=${langChange.filter()}`,
  apiKey: '1f66fe07b37d4b97bfa9b13709c31a59',
  getData: function() {
    loader.show()
    if (this.timesSearched > 0) {

      var url = this.apiBasisUrl + this.typeOfNews + '?' + this.country + '&apiKey=' + this.apiKey;

    } else {
      var url = this.apiBasisUrl + this.typeOfNews + '?' + "country=us" + '&apiKey=' + this.apiKey;
      this.timesSearched++
    }

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
  }
}

export default api
