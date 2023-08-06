export const cart = []; 


export function addToCart (productId){
    let selectQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
    const selectedValue = Number(selectQuantity.value)
    let matchingItem;
    cart.forEach((cartItem)=>{
     if(productId===cartItem.productId){
       matchingItem= cartItem;
     }})
     if (matchingItem){
       matchingItem.quantity+=selectedValue;
     }
     else {
       cart.push({
         productId,
         quantity: selectedValue,
        })
     }
     
    }