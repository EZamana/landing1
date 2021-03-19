import * as $ from 'jquery';
import './styles/style.scss';
import 'slick-carousel'


$(document).ready(function () {
  $('.brands__container').slick({
    /*speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,*/
    responsive: [{

      breakpoint: 1900,
      settings: {
        slidesToShow: 3,
        infinite: false
      }
    }]
  });
})

$('.switch-btn').on('click', () => {
  $('.plus-btn__line').toggleClass('closed')
  $('.products__container').toggleClass('hideBlock')
})

/*$('.product__btn').on('click', (event) => {
  let htmlContent;
  /!*htmlContent = $('.buy-btn').parent('.product-name').css("background", "yellow")*!/
  /!*htmlContent = $(this);*!/
  /!*console.log(htmlContent)*!/
  htmlContent = $(event.target).closest('.test-block').children('.product-name').html()
  console.log(htmlContent)
})*/

$('.product__cost__value').each(function () {
  let costValues = $(this).html().split('')

  costValues.forEach(value => {
    let newDiv = document.createElement('div')
    newDiv.classList.add('product__cost__character')
    newDiv.classList.add('character-digital')
    newDiv.innerHTML = value;
    $(this).parent().append(newDiv)
  })
})







