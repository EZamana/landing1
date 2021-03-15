import test from "./sliderconfig";

import * as $ from 'jquery';


import './styles/style.scss';


import 'slick-carousel'


/*$('.col').html('hello world 2')*/

$(document).ready(function () {
  $('.brands__container').slick({
    infinite: true,
    /*speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,*/
    responsive: [{

      breakpoint: 1900,
      settings: {
        slidesToShow:  3,
        infinite: true
      }
    }]
  });
})


