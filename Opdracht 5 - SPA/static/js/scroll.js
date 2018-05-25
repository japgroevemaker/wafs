
var onScroll = {
  scrollable: function(){
    window.onscroll = function(){
      scroll()
    }

    var form = document.querySelector('form');

    function scroll() {
      if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150){
        form.classList.add('sticky')
      } else {
        form.classList.remove('sticky');
      }
    }
  }
}

export default onScroll
