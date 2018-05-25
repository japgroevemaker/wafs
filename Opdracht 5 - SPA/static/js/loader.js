

var loader = {
  hide: function(){
    var loaderBox = document.getElementById('loaderBox');
    var loader = document.getElementById('loader');
    loaderBox.classList.add('none')
    loader.classList.add('none')
  },
  show: function(){
    var loaderBox = document.getElementById('loaderBox');
    var loader = document.getElementById('loader');
    loaderBox.classList.remove('none')
    loader.classList.remove('none')
  }
}

export default loader
