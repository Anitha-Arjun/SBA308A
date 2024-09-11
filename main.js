// main.js
import { addToCart, removeFromCart, cartItemsList } from "./cart.js";

import { fetchBreeds, fetchDogs } from "./api.js";
import { displayContactForm } from "./form.js";

const breedFilter = document.getElementById("breed");
const dogList = document.getElementById("dog-list");

const checkoutBtn = document.getElementById("checkout-btn");

//Provides array of data about the breeds
async function handleFetchBreeds() {
  const breeds = await fetchBreeds();
  console.log(breeds);
  populateBreedFilter(breeds);
}

//Creating an option element and providing breed.id as value and breed.name as content
function populateBreedFilter(breeds) {
  breedFilter.innerHTML = `<option value="">All</option>`;
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedFilter.appendChild(option);
  });
}

//Selects the breed from the list and displays list of dogs for adoption
async function handleFetchDogs() {
  const selectedBreed = breedFilter.value;
  const dogs = await fetchDogs(1, selectedBreed);
  console.log(dogs);
  renderDogs(dogs);
}

//Forms the div with all the dog info
function renderDogs(dogs) {
  dogList.innerHTML = "";
  dogs.forEach((dog) => {
    if (dog.breeds && dog.breeds.length > 0 && dog.breeds[0].name) {
      const dogDiv = document.createElement("div");
      dogDiv.className = "dog";
      dogDiv.id = dog.breeds[0].id;
      dogDiv.innerHTML = `
        <img src="${dog.url}" alt="Dog">
        <h2>${dog.breeds[0].name}</h2>
        <button data-id="${dog.id}" data-url="${dog.url}" data-name="${dog.breeds[0].name}">Add to Cart</button>
      `;
      dogList.appendChild(dogDiv);
    }
  });
}

//On changing the breed from the dropdown invokes the handleFetchDogs
function handleSearch() {
  handleFetchDogs();
}

//Adds the selected breed with id, image and name to checkout cart
function handleDogListClick(event) {
  if (event.target.tagName === "BUTTON") {
    const button = event.target;
    const id = button.getAttribute("data-id");
    const url = button.getAttribute("data-url");
    const name = button.getAttribute("data-name");
    addToCart(id, url, name);
  }
}

//Remove the selected breed from the cart by id
function handleCartClick(event) {
  if (event.target.tagName === "BUTTON") {
    const button = event.target;
    const id = button.getAttribute("data-id");
    removeFromCart(id);
  }
}

breedFilter.addEventListener("change", handleSearch);
dogList.addEventListener("click", handleDogListClick);
checkoutBtn.addEventListener("click", displayContactForm);
cartItemsList.addEventListener("click", handleCartClick);

document.addEventListener("DOMContentLoaded", () => {
  handleFetchBreeds();
  handleFetchDogs();
});
