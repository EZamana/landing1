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

//тест


$('.addProd-sub').on('click', function () {

  let category = $('.addProd-category').val()
  let id = parseInt($('.addProd-id').val())
  let imagePath = $('.addProd-imagePath').val()
  let cost = parseInt($('.addProd-cost').val())
  let title = $('.addProd-title').val()

  /*console.log(typeof(category), category)
  console.log(typeof(id), id)
  console.log(typeof(imagePath), imagePath)
  console.log(typeof(cost), cost)
  console.log(typeof(title), title)*/

  addProduct(category, id, imagePath, cost, title)
      .then((result) => {
        console.log('product added')
      })
      .catch((error) => {
        console.log(error.message)
      })
})


//тест

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

/*function createCostBlock(costValueBlock) {
  let costValues = $(costValueBlock).html().split('')

  costValues.forEach(costValue => {
    let newDiv = document.createElement('div')
    newDiv.classList.add('product-cost__character')
    newDiv.classList.add('character-digital')
    newDiv.innerHTML = costValue;

    $(costValueBlock).parent().find('.product-cost__digits').append(newDiv)
  })
}*/

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

/*productsSlider.on('init', function () {
  addProductPopupOpen('.latest .product__btn')
})

addProductPopupOpen('.featured .product__btn')*/

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

$('.switch-btn').on('click', () => {
  $('.switch-btn__line_active').toggleClass('closed')
  $('.products').toggleClass('hideBlock')
  if (!isProductSliderInit) {
    productsSlider.slick(productsSliderConfig);
    isProductSliderInit = !isProductSliderInit
  }
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
})

$('.auth-form__btn').on('click', function () {
  $('.auth-form__validation-message').html('');
})

$('.signUp-form .auth-form__btn').on('click', function () {
  createUser($(".signUp-form .login-input").val(), $(".signUp-form .password-input").val())
      .then(value => {
        console.log(value)
      })
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

/*function createCostBlock(costValueBlock) {
  console.log(costValueBlock)
  let costValues = $(costValueBlock).html().split('')

  costValues.forEach(costValue => {
    let newDiv = document.createElement('div')
    newDiv.classList.add('product-cost__character')
    newDiv.classList.add('character-digital')
    newDiv.innerHTML = costValue;

    $(costValueBlock).parent().find('.product-cost__digits').append(newDiv)
  })
}*/

function createProduct(id, productName, costValue, imagePath) {
  let newProduct = document.createElement('div')
  newProduct.classList.add('product')

  let productImg = document.createElement('div')
  productImg.classList.add('product__img')
  productImg.style.background = `url(${imagePath}) center top`

  let productNameBlock = document.createElement('p')
  productNameBlock.classList.add("product__name")
  productNameBlock.innerHTML = productName

  let productElements = document.createElement('div')
  productElements.classList.add('product__elements')

  let productBtn = document.createElement('div')
  productBtn.classList.add('product__btn')
  productBtn.innerHTML = 'add to cart';
  addProductPopupOpen1(productBtn, productName, imagePath, costValue)
  productBtn.onclick = () => {
    /*addProductToStorage(id)*/
    addProductToStorage1(id, productName, costValue)
    renderProductsCart1()
  }

  let productCost = document.createElement('div')
  productCost.classList.add('product-cost')

  let characterDollar = document.createElement('div')
  characterDollar.innerHTML = '$'
  characterDollar.classList.add('product-cost__character')
  characterDollar.classList.add('character-dollar')

  let costValuesBlock = createCostBlock1(costValue)
  costValuesBlock.classList.add('product-cost__digits')

  productCost.append(characterDollar)
  productCost.append(costValuesBlock)

  productElements.append(productBtn)
  productElements.append(productCost)

  newProduct.append(productImg)
  newProduct.append(productNameBlock)
  newProduct.append(productElements)

  return newProduct
}

function createCostBlock1(costValue) {
  console.log('1')
  let costBlock = document.createElement('div')
  let costValues = costValue.toString().split('')

  costValues.forEach(costValue => {
    let newDiv = document.createElement('div')
    newDiv.classList.add('product-cost__character')
    newDiv.classList.add('character-digital')
    newDiv.innerHTML = costValue;

    costBlock.append(newDiv)
  })

  return costBlock
}

function addProductPopupOpen1(selector, productName, imageURL, costValue) {
  $(selector).on('click', () => {
    let newCostBlock = createCostBlock1(costValue)
    newCostBlock.classList.add('product-cost__digits')
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
      allProducts.push(product.data())
    })
  })
  console.log(allProducts)
  createProductsCartArr()
  /*renderProductsCart()*/
}).catch(error => {
  console.log(error.message)
})

function checkCartInStorage() {
  return !!localStorage.getItem('cart')
}

function addProductToStorage(id) {
  if (checkCartInStorage()) {
    let currentCart = JSON.parse(localStorage.getItem('cart'))
    currentCart.push(id)
    localStorage.setItem('cart', JSON.stringify(currentCart))
  } else {
    localStorage.setItem('cart', `[${id}]`)
  }
  /*updateCartCounter()*/
}

function addProductToStorage1(id, productName, productCost) {
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

function removeProductFromStorage1(id) {
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

function removeProductFromStorage(id) {
  let currentCart = JSON.parse(localStorage.getItem('cart'))

  let index = currentCart.indexOf(id)

  if (index > -1) {
    currentCart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(currentCart))
  }
}

function updateCartCounter() {
  if (checkCartInStorage()) {
    let productsCounter = JSON.parse(localStorage.getItem('cart')).length
    $('.basket__counter').html(productsCounter)
  } else {
    $('.basket__counter').html('0')
  }
}

function updateCartCounter1(counter) {
  $('.basket__counter').html(counter)
}

/*updateCartCounter()*/

/*console.log(localStorage.getItem('cart'))*/

let productsCartArr = [];

let allProducts = []

function addProductToCart(id, productName, productCost) {
  let isProductDuplicated = false

  for (let product of productsCartArr) {
    if (product.id === id) {
      isProductDuplicated = true;
      product.amount++
    }
  }

  if (!isProductDuplicated) {
    productsCartArr.push({id, productName, productCost, amount: 1})
  }
}

function removeProductFromCart(id) {
  for (let product of productsCartArr) {
    if (product.id === id) {
      if (product.amount > 1) {
        product.amount--
      } else {
        let index = productsCartArr.indexOf(product)
        console.log(index)
        productsCartArr.splice(index, 1);
      }
    }
  }
}

function renderProductsCart() {
  let totalCost = 0

  $('.basket-modal__products .basket-modal__row').remove()

  productsCartArr.forEach(product => {
    totalCost += product.productCost * product.amount

    console.log(product.productCost, product.amount)

    let productContainer = $('<div></div>').addClass('basket-modal__row');
    let productName = $('<div></div>').addClass('basket-modal__col').html(`${product.productName}`)
    let productAmount = $('<div></div>').addClass('basket-modal__col').html(`x${product.amount}`)
    let productCost = $('<div></div>').addClass('basket-modal__col').html(`${product.productCost * product.amount}`)
    let closeIcon = $('<div></div>').addClass('basket-modal__col').append($('<div></div>')
        .addClass('basket-modal__close-icon').on('click', function () {
          removeProductFromStorage(product.id)
          removeProductFromCart(product.id)
          renderProductsCart()
        }))

    productContainer.append(productName)
    productContainer.append(productAmount)
    productContainer.append(productCost)
    productContainer.append(closeIcon)

    $('.basket-modal__products').append(productContainer)
  })

  $('.basket-modal__col_total').html(`${totalCost.toString()}`)
}

function renderProductsCart1() {
  let totalCost = 0

  let totalProducts = 0

  $('.basket-modal__products .basket-modal__row').remove()

  let currentCart = JSON.parse(localStorage.getItem('cart'))

  currentCart.forEach(product => {
    totalCost += product.productCost * product.amount

    totalProducts++

    let productContainer = $('<div></div>').addClass('basket-modal__row');
    let productName = $('<div></div>').addClass('basket-modal__col').html(`${product.productName}`)
    let productAmount = $('<div></div>').addClass('basket-modal__col').html(`x${product.amount}`)
    let productCost = $('<div></div>').addClass('basket-modal__col').html(`${product.productCost * product.amount}`)
    let closeIcon = $('<div></div>').addClass('basket-modal__col').append($('<div></div>')
        .addClass('basket-modal__close-icon').on('click', function () {
          removeProductFromStorage1(product.id)
          renderProductsCart1()
        }))

    productContainer.append(productName)
    productContainer.append(productAmount)
    productContainer.append(productCost)
    productContainer.append(closeIcon)

    $('.basket-modal__products').append(productContainer)
  })

  $('.basket-modal__col_total').html(`${totalCost.toString()}`)

  updateCartCounter1(totalProducts)
}

function createProductsCartArr() {
  let storageProducts = JSON.parse(localStorage.getItem('cart'))
  /*console.log(storageProducts)*/
  console.log(allProducts)

  /*allProducts.forEach(product => {
    console.log(product)
  })*/

  /*storageProducts.forEach(id => {
    console.log(id)
  })*/

  /*for (let product of allProducts) {
    console.log(product)
  }*/
}

/*createProductsCartArr()*/

/*renderProductsCart()*/

renderProductsCart1()


let isLatestProductsLoaded = false
let lastLatestProductId = 0
let isLatestProductLoading = false


if (document.documentElement.clientHeight > document.documentElement.scrollHeight - $('footer').outerHeight()) {
  /*$('.latest-products .product').slice(0, 4).show()*/
  console.log('1')
}


async function loadLatestProducts(startAfter, limit) {
  try {
    /* console.log('START')
     console.log(`pageYOffset - ${pageYOffset}`)
     console.log(`document.documentElement.scrollHeight - ${document.documentElement.scrollHeight}`)
     console.log(`document.documentElement.clientHeight - ${document.documentElement.clientHeight}`)
     /!*    console.log(`isLatestProductsLoaded - ${isLatestProductsLoaded}`)
         console.log(`lastLatestProductId - ${lastLatestProductId}`)
         console.log(`isLatestProductLoading - ${isLatestProductLoading}`)*!/*/


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

/*console.log(`pageYOffset - ${pageYOffset}`);
console.log(`document.documentElement.scrollHeight - ${document.documentElement.scrollHeight}`)
console.log(`document.documentElement.clientHeight - ${document.documentElement.clientHeight}`)*/

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

      $('.products-slider').append(sliderItem.append(createProduct(product.id, product.title, product.cost, images[index])))

      productsSlider.on('init', function () {
        addProductPopupOpen1($('.products-slider__item .product__btn')[index], product.title, images[index], product.cost)
      })
    })
  } catch (err) {
    console.log(err.message)
  }
}

addProductsSliderItems().then()

$('.basket-modal__close-btn, .basket').on('click', function () {
  $('.basket-modal').toggleClass('hideBlock')
})






















