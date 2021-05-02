import * as $ from 'jquery';
import './styles/style.scss';
import 'slick-carousel'

window.$ = window.jQuery = require('jquery');
const fancybox = require('@fancyapps/fancybox');
const fancyboxCSS = require('@fancyapps/fancybox/dist/jquery.fancybox.min.css');

const productsSlider = $('.products-slider');
let isProductSliderInit = false


const productsSliderConfig = {
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,

  responsive: [{
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      infinite: false,
      arrows: false,
    }
  }, {
    breakpoint: 800,
    settings: {
      slidesToShow: 2,
      infinite: false,
      arrows: false,
    }
  }, {
    breakpoint: 1199,
    settings: {
      slidesToShow: 3,
      infinite: false,
      arrows: false,
    }
  },]
}

function createCostBlock(costValueBlock) {
  let costValues = $(costValueBlock).html().split('')

  costValues.forEach(costValue => {
    let newDiv = document.createElement('div')
    newDiv.classList.add('product-cost__character')
    newDiv.classList.add('character-digital')
    newDiv.innerHTML = costValue;

    $(costValueBlock).parent().find('.product-cost__digits').append(newDiv)
  })
}

function addProductPopupOpen(btnSelector) {
  $(btnSelector).on('click', (event) => {
    let attr = $(event.target).closest('.product').find('img').attr('src')
    let cost = $(event.target).closest('.product').find('.product-cost__value').html()
    let productName = $(event.target).closest('.product').find('.product__name').html()
    let popupCostValue = $('.products-modal .product-cost__value')
    $('.products-modal img').attr('src', attr)
    $('.products-modal .product__name').html(productName)
    popupCostValue.html(cost)
    createCostBlock(popupCostValue)
    $.fancybox.open($('.products-modal'), {
      afterClose: function () {
        popupCostValue.closest('.product-cost').find('.product-cost__digits').html('')
      }
    })
  })
}

$('.product-cost__value').each(function () {
  createCostBlock(this)
})

productsSlider.on('init', function () {
  addProductPopupOpen('.latest .product__btn')
})

addProductPopupOpen('.featured .product__btn')

$('.brands__container').slick({
  speed: 300,
  slidesToShow: 4,
  infinite: false,
  arrows: false,

  responsive: [{
    breakpoint: 575,
    settings: {
      slidesToShow: 1,
      infinite: false,
      arrows: false,
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 2,
      infinite: false,
      arrows: false,
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      infinite: false,
      arrows: false,
    }
  },]
});

$('.brands-slider .arrowPrev').click(function () {
  $(this).siblings('.brands__container').slick('slickPrev')
})

$('.brands-slider .arrowNext').click(function () {
  $(this).siblings('.brands__container').slick('slickNext')
})

$('.latest .arrowPrev').click(function () {
  $(this).siblings('.products-slider').slick('slickPrev')
})

$('.latest .arrowNext').click(function () {
  $(this).siblings('.products-slider').slick('slickNext')
})

$('.product__img').each(function () {
  let img = $(this).find('img').attr('src')
  $(this).css('background', `url(${img})`)
  $(this).css('background-position', 'center top')
})

$('.switch-btn').on('click', () => {
  $('.switch-btn__line_active').toggleClass('closed')
  $('.products').toggleClass('hideBlock')
  if (!isProductSliderInit) {
    productsSlider.slick(productsSliderConfig);
    isProductSliderInit = !isProductSliderInit
  }
})

if (document.documentElement.clientHeight > document.documentElement.scrollHeight - $('footer').outerHeight()) {
  $('.latest-products .product').slice(0, 4).show()
}

$(document).on('scroll', function () {
  if (pageYOffset > document.documentElement.scrollHeight - document.documentElement.clientHeight - $('footer').outerHeight()) {
    $('.latest-products .product:hidden').slice(0, 4).slideDown()
  }
})

$('.mobile-catalog-btn, .mobile-catalog__background').on('click', function () {
  $('.mobile-catalog__background').toggleClass('hideBlock');
  $('.mobile-catalog__container').toggleClass('show-mobile-catalog');
  $('body').toggleClass('remove-horizontal-scroll');
})














