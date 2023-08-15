import { cart , removeFromCart, updateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
updateCartQuantity('.js-checkout-quantity');
updateCartQuantity('.js-items-quantity');
let cartSummaryHTML = '';
const itemsSummaryArr = [];
function sumArray(array) {
    let sum = 0;
    array.forEach(num => {
      sum += num;
    });
    return sum;
  }



cart.forEach((cartItem)=>{
const productId = cartItem.productId;
let matchingProduct;
 

products.forEach((product)=>{
    if (product.id===productId){
        matchingProduct= product;
    }
   
    
})

   cartSummaryHTML += `
    <div class="cart-item-container
     js-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link"
                    data-product-id="${matchingProduct.id}">
                        Update
                    </span>
                    <input  type="number" min="1" value = "${cartItem.quantity}" class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link js-save-link link-primary"
                    data-product-id="${matchingProduct.id}">
                    Save
                    </span>
                    
                
                    <span class="delete-quantity-link link-primary
                    js-delete-link"
                    data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option js-delivery-option">
                    <input type="radio" checked
                        class="delivery-option-input js-delivery-option-${matchingProduct.id}"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                        Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                        FREE Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option js-delivery-option">
                    <input type="radio"
                        class="delivery-option-input js-delivery-option-${matchingProduct.id}"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                        Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                        $4.99 - Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option js-delivery-option">
                    <input type="radio"
                        class="delivery-option-input js-delivery-option-${matchingProduct.id}"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                        Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                        $9.99 - Shipping
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>


`
let totalProductPrice = (Number (matchingProduct.priceCents))*(Number(cartItem.quantity)) ;
itemsSummaryArr.push(totalProductPrice);
console.log(itemsSummaryArr);
})

//order-summary---------------------------------------------------------------------
let itemsSummary= sumArray(itemsSummaryArr);
let shippingSummary = 499;
let beforeTaxSummary = itemsSummary + shippingSummary;
let taxSummary = beforeTaxSummary * 0.1;
let totalSummary = beforeTaxSummary + taxSummary;

document.querySelector('.js-items-summary').innerHTML = formatCurrency(itemsSummary);
document.querySelector('.js-shipping-summary').innerHTML = formatCurrency(shippingSummary);
document.querySelector('.js-before-tax-summary').innerHTML = formatCurrency(beforeTaxSummary);
document.querySelector('.js-tax-summary').innerHTML = formatCurrency(taxSummary);
document.querySelector('.js-total-summary').innerHTML = formatCurrency(totalSummary)


// remove from cart ------------------------------------------------------
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML
document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', (cartItem)=>{
      const productId = link.dataset.productId;
      removeFromCart(productId);

     const container = document.querySelector(`.js-item-container-${productId}`);
     container.remove();
     
    })
})
//-----------------------------------------------------------------------------------------------

//update and save btns

document.querySelectorAll('.js-update-link').forEach((link) => {
   
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
    
        const container= document.querySelector(`.js-item-container-${productId}`);
        container.classList.add('is-editing-quantity');

    });
   
});

document.querySelectorAll('.js-save-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
    const productId = link.dataset.productId;
    const container= document.querySelector(`.js-item-container-${productId}`);
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = Number(quantityInput.value);
    let quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    quantityLabel.innerHTML = newQuantity;
    container.classList.remove('is-editing-quantity');
    updateQuantity(productId, newQuantity);
    })
})

//--------------------------------------------


console.log(sumArray(itemsSummaryArr));








