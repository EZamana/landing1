import * as $ from 'jquery';
import './styles/style.scss';
import 'slick-carousel'

window.$ = window.jQuery = require('jquery');
const fancybox = require('@fancyapps/fancybox');
const fancyboxCSS = require('@fancyapps/fancybox/dist/jquery.fancybox.min.css');


$(document).ready(function () {
  $('.brands__container').slick({
    /*speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,*/
    responsive: [{

      breakpoint: 1900,
      settings: {
        slidesToShow: 4,
        infinite: false,
        arrows: false,
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

function createCostBlock(costValueBlock) {
  let costValues = $(costValueBlock).html().split('')

  costValues.forEach(costValue => {
    let newDiv = document.createElement('div')
    newDiv.classList.add('product__cost__character')
    newDiv.classList.add('character-digital')
    newDiv.innerHTML = costValue;

    $(costValueBlock).parent().find('.product__cost__digits__container').append(newDiv)
  })
}

$('.product__cost__value').each(function () {
  createCostBlock(this)
})

$('.product__img').each(function () {
  let img = $(this).find('img').attr('src')
  $(this).css('background', `url(${img})`)
  $(this).css('background-position', 'center top')
})

$('.product__btn').on('click', (event) => {
  let attr = $(event.target).closest('.product').find('img').attr('src')
  let cost = $(event.target).closest('.product').find('.product__cost__value').html()
  let productName = $(event.target).closest('.product').find('.product__name').html()
  let popupCostValue = $('.products__pop-up .product__cost__value')
  $('.products__pop-up img').attr('src', attr)
  $('.products__pop-up .product__name').html(productName)
  popupCostValue.html(cost)
  createCostBlock(popupCostValue)
  $.fancybox.open($('.products__pop-up'), {
    afterClose: function () {
      popupCostValue.closest('.product__cost').find('.product__cost__digits__container').html('')
    }
  })
})








