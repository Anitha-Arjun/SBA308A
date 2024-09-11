// cart.js
export const cart = new Map();
export const cartItemsList = document.getElementById("cart-items");

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

export function addToCart(id, url, name) {
  if (!cart.has(id)) {
    cart.set(id, { id, url, name });
    renderCart();
  }
}

export function removeFromCart(id) {
  if (cart.has(id)) {
    cart.delete(id);
    renderCart();
  }
}
