

// Define an array to store cart items
const cart = [];
let cartCount = 0; // Initialiser le compteur à zéro
// Créez un nouvel élément span pour le compteur
const cartCountElement = document.createElement('span');
cartCountElement.id = 'cart-count';
cartCountElement.className = 'cart-count';
cartCountElement.textContent = '0';

// Sélectionnez l'élément icône "shop" par son ID
const shopIcon = document.getElementById('shop');

// Insérez le compteur juste après l'icône "shop"
shopIcon.appendChild(cartCountElement);

// Function to add an item to the cart
function addToCart(itemName, itemPrice, itemSrc) {
  
  const existingItem = cart.find((item) => item.name === itemName);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ src:itemSrc, name: itemName, price: itemPrice, quantity: 1 });
  }
// Mettre à jour le compteur et l'afficher à côté de l'icône "shop"
// cartCount += 1;
// const cartCountElement = document.getElementById('cart-count');
// cartCountElement.textContent = cartCount;
// console.log('count.'+cartCount);
// Incrémentez le compteur
cartCount++;

// Mettez à jour le texte du compteur
cartCountElement.textContent = cartCount;

  displayCart();
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
  const index = cart.findIndex((item) => item.name === itemName);
  if (index !== -1) {
    cart.splice(index, 1);
  }

  displayCart();
}

// Function to display the cart
function displayCart() {
  const cartList = document.querySelector('.item-list');
  cartList.innerHTML = ''; // Clear the current cart display

  let total = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
    <img class="img" src="${item.src}" alt="prd1" />
      <span class="item-name me-2">${item.name}</span>
      <span class="item-price">${item.price.toFixed(2)}DH</span>
      <button class="quantity-btn plus">+</button>
      <span class="item-quantity">${item.quantity}</span>
      <button class="quantity-btn minus">-</button>
      <button class="delete-btn" data-action="remove-from-cart">Delete</button>
     
    `;

    // Calculate the subtotal for this item
    const subtotal = item.price * item.quantity;
    total += subtotal;

    cartList.appendChild(cartItem);
  });

  // Update the total display
  const totalElement = document.getElementById('total-price');
  totalElement.textContent = `${total.toFixed(2)} DH`;
}

// Event delegation to handle "Add to cart" and "Remove from cart" button clicks
document.addEventListener('click', (event) => {
  const target = event.target;

  if (target.dataset.action === 'add-to-cart') {
    // Find the parent product card
    const productCard = target.closest('.product');
    if (productCard) {
      const productImg = productCard.querySelector('.product-img').src;
      const productName = productCard.querySelector('.product-name').textContent;
      const productPrice = parseFloat(productCard.querySelector('.product-price').textContent);
      addToCart(productName, productPrice, productImg);
    }
  }

  if (target.dataset.action === 'remove-from-cart') {
    const cartItem = target.closest('.cart-item');
    if (cartItem) {
      const itemName = cartItem.querySelector('.item-name').textContent;
      removeFromCart(itemName);
    }
  }
});
// ...

// Event delegation to handle cart item interactions
document.addEventListener('click', (event) => {
    const target = event.target;
  
    if (target.classList.contains('quantity-btn')) {
      // Find the parent cart item
      const cartItem = target.closest('.cart-item');
      if (cartItem) {
        const itemName = cartItem.querySelector('.item-name').textContent;
        const item = cart.find((item) => item.name === itemName);
  
        if (target.classList.contains('plus')) {
          // Increment quantity when the "+" button is clicked
          item.quantity++;
        } else if (target.classList.contains('minus')) {
          // Decrement quantity when the "-" button is clicked
          if (item.quantity > 1) {
            item.quantity--;
          }
        }
  
        displayCart();
      }
    }
  
    if (target.dataset.action === 'remove-from-cart') {
      // Remove the item from the cart
      const cartItem = target.closest('.cart-item');
      if (cartItem) {
        const itemName = cartItem.querySelector('.item-name').textContent;
        removeFromCart(itemName);
      }
    }
  });
  
  // ...
  
// Initialize cart display
displayCart();

/*********************LIKE BTN */
const toggleLike = (event) => {
  const likeBtn = event.target;

  if (likeBtn.style.color === "grey" || likeBtn.style.color === "") {
    likeBtn.style.color = "red";
  } else {
    likeBtn.style.color = "grey";
  }
};

const likeBtns = document.querySelectorAll('.like');

likeBtns.forEach((btn) => {
  btn.addEventListener('click', toggleLike);
});
/*****************div cart display   ******/
const show=()=>{
    let cart=document.getElementById("cart");
    if(cart.style.display=='none'){
        cart.style.display="block";
    }else{
        cart.style.display="none"
    }
}
const closeShop=()=>{
    let ele=document.getElementById("cart");
    ele.style.display="none";
}
let shop=document.getElementById("shop");
shop.addEventListener('click',show);
let close = document.getElementById("close");
close.addEventListener('click',closeShop);