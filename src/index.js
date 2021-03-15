import * as $ from 'jquery';
import './styles/style.scss';
import 'slick-carousel'


$('.switch-btn').on('click', () => {
  $('.plus-btn__line').toggleClass('closed')
  $('.products__container').toggleClass('hideBlock')
})




$(document).ready(function () {
  $('.brands__container').slick({
    /*speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,*/
    responsive: [{

      breakpoint: 1900,
      settings: {
        slidesToShow:  3,
        infinite: false
      }
    }]
  });
})


