if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else {
    ready()
}

function ready() {
    var removeCartItemButtons =document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for (var i = 0 ;i < removeCartItemButtons.length; i++ ) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change' , quantityChanged)
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(var i = 0 ; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click' , addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',
    purchaseClicked)
}

var stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale:'auto',
    token: function(token){
          var items =[]
          var cartItemConatainer = document.getElementsByClassName('cart-items')[0]
          var cartRows = cartItemConatainer.getElementsByClassName ('cart-row')
          for (var i = 0 ; i < cartRows.length; i ++) {
              var cartRow = cartRows[i]
              var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
              var quantity = quantityElement.value
              var id = cartRow.dataset.itemId
              items.push({
                  id: id,
                  quantity:quantity
              })
          }
          fetch ('/purchase', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: JSON.stringify({
                  stripeTokenId: token.id,
                  items: items
              })
          }).then(function(res) {
              return res.json()
          }).then(function(data){
              alert(data.message)
              var cartItems = document.getElementsByClassName('cart-items')[0]
              while (cartItems.hasChildNodes()) {
                  cartItems.removeChild(cartItems.firstChild)
              }
              updateCartTotal()
          }).catch(function(error){
              console.error(error)
          })
    }
})

function purchaseClicked(){
    var priceElement = document.getElementsByClassName('cart-total-price')[0]
    var price = parseFloat(priceElement.innerText.replace('₱', '')) * 100
    stripeHandler.open({
        amount:price
    })
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
function addToCartClicked(event){
    var button = event.target
    var shopItem= button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName ('shop-item-image')[0].src
    var id = shopItem.dataset.itemId
    addItemToCart(title, price, imageSrc ,id)
    updateCartTotal()
}
function addItemToCart(title, price, imageSrc , id){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.dataset.itemId = id
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames= cartItems.getElementsByClassName('cart-item-title')
    for (var i= 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title){
            alert ('this item is already added to the cart!')
            return
        }
    }
    var cartRowsContents = `<div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn1 btn-danger" type="button">REMOVE</button>
    </div>
    `
    cartRow.innerHTML = cartRowsContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click' ,removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('click', quantityChanged)
}
function updateCartTotal() {
    var cartItemConatainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemConatainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i= 0;i < cartRows.length ; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement =cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('SRP:₱', ' '))
        var  quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round (total *100) /100
    document.getElementsByClassName('cart-total-price')[0].innerText = '₱' + total
}

var modalBtn = document.querySelector('.modal-btn');
var modalBg = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');
var modalBtnn = document.querySelector('.modal-btnn');
var modalBgg = document.querySelector('.modal-bgg');
var modalClosee = document.querySelector('.modal-closee');
var modalBtnnn = document.querySelector('.modal-btnnn');
var modalBggg = document.querySelector('.modal-bggg');
var modalCloseee = document.querySelector('.modal-closeee');


var modalBtnnnn = document.querySelector('.modal-btnnnn');
var modalBgggg = document.querySelector('.modal-bgggg');
var modalCloseeee = document.querySelector('.modal-closeeee');
var modalBtnnnnn = document.querySelector('.modal-btnnnnn');
var modalBggggg = document.querySelector('.modal-bggggg');
var modalCloseeeee = document.querySelector('.modal-closeeeee');
var modalBtnnnnnn = document.querySelector('.modal-btnnnnnn');
var modalBgggggg = document.querySelector('.modal-bgggggg');
var modalCloseeeeee = document.querySelector('.modal-closeeeeee');
//1
modalBtn.addEventListener('click', function() {
    modalBg.classList.add('bg-active');
});

modalClose.addEventListener('click', function() {
    modalBg.classList.remove('bg-active');
});
//2

modalBtnn.addEventListener('click', function() {
    modalBgg.classList.add('bg-activee');
});

modalClosee.addEventListener('click', function() {
    modalBgg.classList.remove('bg-activee');
});

//3

modalBtnnn.addEventListener('click', function() {
    modalBggg.classList.add('bg-activeee');
});

modalCloseee.addEventListener('click', function() {
    modalBggg.classList.remove('bg-activeee');
});

//4
modalBtnnnn.addEventListener('click', function() {
    modalBgggg.classList.add('bg-activeeee');
});
modalCloseeee.addEventListener('click', function() {
    modalBgggg.classList.remove('bg-activeeee');
});
//5
modalBtnnnnn.addEventListener('click', function() {
    modalBggggg.classList.add('bg-activeeeee');
});
modalCloseeeee.addEventListener('click', function() {
    modalBggggg.classList.remove('bg-activeeeee');
});
//6
modalBtnnnnnn.addEventListener('click', function() {
    modalBgggggg.classList.add('bg-activeeeeee');
});

modalCloseeeeee.addEventListener('click', function() {
    modalBgggggg.classList.remove('bg-activeeeeee');
});

