// cart.js
export const cart = new Map();
export const cartItemsList = document.getElementById("cart-items");

//Create a list element and append the cartItem with the breed name, url to the cartItemsList
export function renderCart() {
  cartItemsList.innerHTML = "";
  cart.forEach((value) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
      <img src="${value.url}" alt="${value.name}">
      <h2>${value.name}</h2>
      <button data-id="${value.id}">Remove</button>
    `;
    cartItemsList.appendChild(cartItem);
  });
}

//if the cart is empty add the breed by giving the id, url and name
export function addToCart(id, url, name) {
  if (!cart.has(id)) {
    cart.set(id, { id, url, name });
    console.log(cart);
    renderCart();
  }
}

//If the cart has more than 1 breed then we can remove the breed by id
export function removeFromCart(id) {
  if (cart.has(id)) {
    cart.delete(id);
    renderCart();
  }
}
