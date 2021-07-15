import * as $ from 'jquery';
import './styles/style.scss';
import 'slick-carousel'

import "firebase/auth";
import firebase from "firebase/app";

import {
  createUser,
  loginUser,
  logoutUser,
  getFeaturedProducts,
  getProductImage,
  addProduct,
  getLatestForLoadProducts,
  getLatestProducts
} from "./firebase";

window.$ = window.jQuery = require('jquery');
const fancybox = require('@fancyapps/fancybox');
const fancyboxCSS = require('@fancyapps/fancybox/dist/jquery.fancybox.min.css');

const productsSlider = $('.products-slider');
let isProductSliderInit = false

const productsSliderConfig = {
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,

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

//code for creating products

/*$('.addProd-sub').on('click', function () {

  let category = $('.addProd-category').val()
  let id = parseInt($('.addProd-id').val())
  let imagePath = $('.addProd-imagePath').val()
  let cost = parseInt($('.addProd-cost').val())
  let title = $('.addProd-title').val()

  addProduct(category, id, imagePath, cost, title)
      .then((result) => {
        console.log('product added')
      })
      .catch((error) => {
        console.log(error.message)
      })
})*/

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    $('#logout').css('display', 'flex')
    $('.signIn-form .auth-form').css('display', 'none')
    $('.signUp-form .auth-form').css('display', 'none')
  } else {
    $('#logout').css('display', 'none')
    $('.signIn-form .auth-form').css('display', 'flex')
    $('.signUp-form .auth-form').css('display', 'none')
  }
})

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

$('.brands-slider .arrowPrev, .products .arrowPrev').click(function () {
  $(this).siblings('.slider-container').slick('slickPrev')
})

$('.brands-slider .arrowNext, .products .arrowNext').click(function () {
  $(this).siblings('.slider-container').slick('slickNext')
})

$('.product__img').each(function () {
  let img = $(this).find('img').attr('src')
  $(this).css('background', `url(${img})`)
  $(this).css('background-position', 'center top')
})

$('.mobile-catalog-btn, .mobile-catalog__background').on('click', function () {
  $('.mobile-catalog__background').toggleClass('hideBlock');
  $('.mobile-catalog__container').toggleClass('show-mobile-catalog');
  $('body').toggleClass('remove-horizontal-scroll');
})

$('#signIn').on('click', function () {
  $('.signIn-form .auth-form').css('display', 'flex');
  $('.signUp-form .auth-form').css('display', 'none');
})

$('#signUp').on('click', function () {
  $('.signIn-form .auth-form').css('display', 'none');
  $('.signUp-form .auth-form').css('display', 'flex');
  $('.auth-form__validation-message').html('');
})

$('.auth-btn').on('click', function () {
  $('.auth-form__validation-message').html('');
  $(".login-input").val('')
  $(".password-input").val('')
})

$('.signUp-form .auth-form__btn').on('click', function () {
  createUser($(".signUp-form .login-input").val(), $(".signUp-form .password-input").val())
      .catch(error => {
        $('.signUp-form .auth-form__validation-message').html(error.message);
      })
})

$('.signIn-form .auth-form__btn').on('click', function () {
  loginUser($(".signIn-form .login-input").val(), $(".signIn-form .password-input").val())
      .then(value => {
        console.log(value)
      })
      .catch(error => {
        $('.signIn-form .auth-form__validation-message').html(error.message);
      })
})

$('#logout').on('click', function () {
  logoutUser().catch(error => {
    console.log(error.message)
  })
})

$('.featured-slider').slick(productsSliderConfig);

$('.featured-products .arrowPrev').click(function () {
  $(this).siblings('.featured-slider').slick('slickPrev')
})

$('.featured-products .arrowNext').click(function () {
  $(this).siblings('.featured-slider').slick('slickNext')
})

function createProduct(id, productName, costValue, imagePath, productHasHover, forSlider) {
  let newProduct = $('<div></div>').addClass('product')

  let productImg = $('<div></div>').addClass('product__img').css('background', `url(${imagePath}) center top`)

  if (productHasHover) {
    let productHover = $('<div></div>').addClass('product-hover')

    let compareBtn = $('<div></div>').addClass('product-hover__btn').html('Add to Compare')

    let wishListBtn = $('<div></div>').addClass('product-hover__btn').html('Add to Wishlist')

    productHover.append(compareBtn, wishListBtn)

    productImg.append(productHover)
  }

  let productNameBlock = $('<p></p>').addClass('product__name').html(productName)

  let productElements = $('<div></div>').addClass('product__elements')

  let productBtn = $('<div></div>').addClass('product__btn').html('add to cart')

  if (!forSlider) {
    productBtn.on('click', function () {
      addProductToStorage(id, productName, costValue)
      renderProductsCart()
    })

    addProductPopupOpen(productBtn, productName, imagePath, costValue)
  }

  let productCost = $('<div></div>').addClass('product-cost')

  let characterDollar = $('<div></div>').addClass('product-cost__character character-dollar').html('$')

  let costValuesBlock = createCostBlock(costValue).addClass('product-cost__digits')

  productCost.append(characterDollar, costValuesBlock)

  productElements.append(productBtn, productCost)

  newProduct.append(productImg, productNameBlock, productElements)

  return newProduct
}

function createCostBlock(costValue) {
  let costBlock = $('<div></div>')

  let costValues = costValue.toString().split('')

  costValues.forEach(costValue => {
    let digit = $('<div></div>').addClass('product-cost__character character-digital').html(costValue)

    costBlock.append(digit)
  })

  return costBlock
}

function addProductPopupOpen(selector, productName, imageURL, costValue) {
  $(selector).on('click', () => {
    let newCostBlock = createCostBlock(costValue).addClass('product-cost__digits')

    $('.products-modal .product-cost').append(newCostBlock)

    $('.products-modal img').attr('src', imageURL)

    $('.products-modal .product__name').html(`${productName} added to the cart!`)

    $.fancybox.open($('.products-modal'), {
      afterClose: function () {
        $('.products-modal .product-cost__digits').remove()
        $('.products-modal img').removeAttr('src')
      }
    })
  })
}

getFeaturedProducts().then(products => {
  products.forEach(product => {
    getProductImage(product.data().imagePath).then(url => {
      $('.featured .products').append(createProduct(product.data().id, product.data().title, product.data().cost, url))
    })
  })
}).catch(error => {
  console.log(error.message)
})

function checkCartInStorage() {
  return !!localStorage.getItem('cart')
}

function addProductToStorage(id, productName, productCost) {
  if (checkCartInStorage()) {
    let isProductDuplicated = false

    let currentCart = JSON.parse(localStorage.getItem('cart'))

    for (let product of currentCart) {
      if (product.id === id) {
        isProductDuplicated = true;
        product.amount++
        localStorage.setItem('cart', JSON.stringify(currentCart))
      }
    }

    if (!isProductDuplicated) {
      currentCart.push({id, productName, productCost, amount: 1})
      localStorage.setItem('cart', JSON.stringify(currentCart))
    }
  } else {
    localStorage.setItem('cart', JSON.stringify([{id, productName, productCost, amount: 1}]))
  }
}

function removeProductFromStorage(id) {
  let currentCart = JSON.parse(localStorage.getItem('cart'))

  currentCart.forEach((product, index) => {
    if (product.id === id) {
      if (product.amount > 1) {
        product.amount--
        localStorage.setItem('cart', JSON.stringify(currentCart))
      } else {
        currentCart.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(currentCart))
      }
    }
  })
}

function updateCartCounter(counter) {
  $('.basket__counter').html(counter)
}

function renderProductsCart() {
  let totalCost = 0

  let totalProducts = 0

  $('.basket-modal__products .basket-modal__row').remove()

  if (checkCartInStorage()) {
    let currentCart = JSON.parse(localStorage.getItem('cart'))

    currentCart.forEach(product => {
      totalCost += product.productCost * product.amount

      totalProducts += product.amount

      let productContainer = $('<div></div>').addClass('basket-modal__row');
      let productName = $('<div></div>').addClass('basket-modal__col').html(`${product.productName}`)
      let productAmount = $('<div></div>').addClass('basket-modal__col').html(`x${product.amount}`)
      let productCost = $('<div></div>').addClass('basket-modal__col').html(`${product.productCost * product.amount}`)
      let closeIcon = $('<div></div>').addClass('basket-modal__col').append($('<div></div>')
          .addClass('basket-modal__close-icon').on('click', function () {
            removeProductFromStorage(product.id)
            renderProductsCart()
          }))

      productContainer.append(productName)
      productContainer.append(productAmount)
      productContainer.append(productCost)
      productContainer.append(closeIcon)

      $('.basket-modal__products').append(productContainer)
    })
  }

  $('.basket-modal__col_total').html(`${totalCost.toString()}`)

  if (totalCost === 0) {
    $('.basket-modal__row').css('display', 'none');
    $('.basket-modal__notification-message').css('display', 'block')
  } else {
    $('.basket-modal__row').css('display', 'flex');
    $('.basket-modal__notification-message').css('display', 'none')
  }

  updateCartCounter(totalProducts)
}

renderProductsCart()

let isLatestProductsLoaded = false
let lastLatestProductId = 0
let isLatestProductLoading = false

if (document.documentElement.clientHeight > document.documentElement.scrollHeight - $('footer').outerHeight()) {
  /*$('.latest-products .product').slice(0, 4).show()*/
  console.log('1')
}

async function loadLatestProducts(startAfter, limit) {
  try {
    let productsCounter = 0;

    let urlRequests = []

    let products = []

    addLoader()

    isLatestProductLoading = true

    let productsPromise = await getLatestForLoadProducts(startAfter, limit)

    productsPromise.forEach(product => {
      products.push(product.data())
      urlRequests.push(getProductImage(product.data().imagePath))
    })

    let images = await Promise.all(urlRequests)

    products.forEach((product, index) => {
      $('.latest-products').append(createProduct(product.id, product.title, product.cost, images[index]))

      productsCounter++

      if (product.id > lastLatestProductId) {
        lastLatestProductId = product.id
      }
    })

    if (productsCounter < limit) {
      isLatestProductsLoaded = true

      showFooter()
    }

    isLatestProductLoading = false

    removeLoader()
  } catch (err) {
    console.log(err.message)
  }
}

function addLoader() {
  $('footer').toggleClass('footer-height');
  let loader = $('<div></div>').addClass('loader');
  $('.loader-container').toggleClass('loader-gap').append(loader)
}

function removeLoader() {
  $('footer').toggleClass('footer-height')
  $('.loader').remove()
  $('.loader-container').toggleClass('loader-gap')
}

function showFooter() {
  $('.footer-top-row').css('display', 'block')
  $('.footer-middle-row').css('display', 'block')
  $('.footer-bottom-row').css('display', 'block')
}

$(document).on('scroll', function () {
  if (pageYOffset >= document.documentElement.scrollHeight - document.documentElement.clientHeight /*- $('footer').outerHeight()*/ && !isLatestProductsLoaded && !isLatestProductLoading) {
    loadLatestProducts(lastLatestProductId, 4).then()
  }
})

async function addProductsSliderItems() {
  try {
    let products = []

    let urlRequests = []

    let productsPromise = await getLatestProducts()

    productsPromise.forEach(product => {
      products.push(product.data())
      urlRequests.push(getProductImage(product.data().imagePath))
    })

    let images = await Promise.all(urlRequests)

    products.forEach((product, index) => {
      let sliderItem = $('<div></div>').addClass('products-slider__item')

      $('.products-slider').append(sliderItem.append(createProduct(product.id, product.title, product.cost, images[index], true, true)))

      let currentProductBtn = $('.products-slider__item .product__btn')[index]

      productsSlider.on('init', function () {
        $('body').find(currentProductBtn).on('click', function () {
          addProductToStorage(product.id, product.title, product.cost)
          renderProductsCart()
        })

        addProductPopupOpen(currentProductBtn, product.title, images[index], product.cost)
      })
    })

    $('.switch-btn').on('click', () => {
      $('.switch-btn__line_active').toggleClass('closed')
      $('.products').toggleClass('hideBlock')
      if (!isProductSliderInit) {
        productsSlider.slick(productsSliderConfig);
        isProductSliderInit = !isProductSliderInit
      }
    })

    $('.switch-btn').toggleClass('disabledBtn')


  } catch (err) {
    console.log(err.message)
  }
}

addProductsSliderItems().then()

$('.basket-modal__close-btn, .basket').on('click', function () {
  $('.basket-modal').toggleClass('hideBlock')
})






















