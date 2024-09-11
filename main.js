// main.js
import {
  cart,
  renderCart,
  addToCart,
  removeFromCart,
  cartItemsList,
} from "./cart.js";
import { fetchBreeds, fetchDogs } from "./api.js";
import { displayContactForm, contactSubmission } from "./form.js";

const breedFilter = document.getElementById("breed");
const dogList = document.getElementById("dog-list");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");
const checkoutBtn = document.getElementById("checkout-btn");

let currentPage = 1;
let totalPages = 2;

function updatePageInfo() {
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

async function handleFetchBreeds() {
  const breeds = await fetchBreeds();
  populateBreedFilter(breeds);
}

function populateBreedFilter(breeds) {
  breedFilter.innerHTML = `<option value="">All</option>`;
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedFilter.appendChild(option);
  });
}

async function handleFetchDogs() {
  const selectedBreed = breedFilter.value;
  const dogs = await fetchDogs(currentPage, selectedBreed);
  totalPages = Math.ceil(dogs.length / 10);
  renderDogs(dogs);
  updatePageInfo();
}

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

function handleSearch() {
  handleFetchDogs();
}

function handlePagination(direction) {
  if (direction === "next" && currentPage < totalPages) {
    currentPage++;
  } else if (direction === "prev" && currentPage > 1) {
    currentPage--;
  }
  handleFetchDogs();
}

function handleDogListClick(event) {
  if (event.target.tagName === "BUTTON") {
    const button = event.target;
    const id = button.getAttribute("data-id");
    const url = button.getAttribute("data-url");
    const name = button.getAttribute("data-name");
    addToCart(id, url, name);
  }
}

function handleCartClick(event) {
  if (event.target.tagName === "BUTTON") {
    const button = event.target;
    const id = button.getAttribute("data-id");
    removeFromCart(id);
  }
}

breedFilter.addEventListener("change", handleSearch);
prevBtn.addEventListener("click", () => handlePagination("prev"));
nextBtn.addEventListener("click", () => handlePagination("next"));
dogList.addEventListener("click", handleDogListClick);
checkoutBtn.addEventListener("click", displayContactForm);
cartItemsList.addEventListener("click", handleCartClick);

document.addEventListener("DOMContentLoaded", () => {
  handleFetchBreeds();
  handleFetchDogs();
});
