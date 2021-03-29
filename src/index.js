import * as $ from 'jquery';
import './styles/style.scss';
import 'slick-carousel'

window.$ = window.jQuery = require('jquery');
const fancybox = require('@fancyapps/fancybox');
const fancyboxCSS = require('@fancyapps/fancybox/dist/jquery.fancybox.min.css');

let productsSlider = $('.products__slider__container');
let isProductSliderInit = false

let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);



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

function addProductPopupOpen(btnSelector) {
  $(btnSelector).on('click', (event) => {
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
}

$('.product__cost__value').each(function () {
  createCostBlock(this)
})

productsSlider.on('init', function () {
  addProductPopupOpen('.latest .product__btn')
})

addProductPopupOpen('.featured .product__btn')

$('.brands__container').slick({
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [{

    breakpoint: 1900,
    settings: {
      slidesToShow: 4,
      infinite: false,
      arrows: false,
    }
  }]
});

$('.brands__slider_container .arrowPrev').click(function () {
  $(this).siblings('.brands__container').slick('slickPrev')
})

$('.brands__slider_container .arrowNext').click(function () {
  $(this).siblings('.brands__container').slick('slickNext')
})

$('.latest .arrowPrev').click(function () {
  $(this).siblings('.products__slider__container').slick('slickPrev')
})

$('.latest .arrowNext').click(function () {
  $(this).siblings('.products__slider__container').slick('slickNext')
})

$('.product__img').each(function () {
  let img = $(this).find('img').attr('src')
  $(this).css('background', `url(${img})`)
  $(this).css('background-position', 'center top')
})



$('.switch-btn').on('click', () => {
  $('.plus-btn__line').toggleClass('closed')
  $('.products__container').toggleClass('hideBlock')
  if (!isProductSliderInit) {
    productsSlider.slick({
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      responsive: [{

        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
        }
      }]
    });
    isProductSliderInit = !isProductSliderInit
  }
})

$(document).on('scroll', function () {
  console.log(pageYOffset)
  console.log(scrollHeight)
  console.log(document.body.clientHeight)
})










