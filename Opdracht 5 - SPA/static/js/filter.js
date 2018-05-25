import api from './api.js'

var langChange = {
  filter: function() {
    var langEmpty = ""
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

export default langChange
