const cartItemsList = document.getElementById("cart-items");

function renderCart() {
  cartItemsList.innerHTML = "";
  cart.forEach((value, key) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
          <img src="${value.url}" alt="${value.name}">
          <h2>${value.name}</h2>
      `;
    cartItemsList.appendChild(cartItem);
  });
}

function addToCart(id, url, name) {
  if (!cart.has(id)) {
    cart.set(id, { url, name });
    renderCart();
  }
}

const cart = new Map();
//
//document.addEventListener("DOMContentLoaded", () => {
const API_KEY =
  "live_ct7fnFpJeYXfxJmSJU6r0G4e5Kq0Xv4IeOXZg6QYFlgxzy143tKi9SIChslYV0Yi";
const API_URL = "https://api.thedogapi.com/v1";
const PAGE_SIZE = 10;
let currentPage = 1;
let totalPages = 5;

const breedFilter = document.getElementById("breed");
const searchInput = document.getElementById("search-input");
const dogList = document.getElementById("dog-list");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");

function updatePageInfo() {
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

async function fetchBreeds() {
  try {
    const response = await fetch(`${API_URL}/breeds?api_key=${API_KEY}`);
    const breeds = await response.json();
    populateBreedFilter(breeds);
  } catch (error) {
    console.error("Error fetching breeds:", error);
  }
}

function populateBreedFilter(breeds) {
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.name;
    option.textContent = breed.name;
    breedFilter.appendChild(option);
  });
}

async function fetchDogs(page = 1, search = "", breed = "") {
  try {
    let url = `${API_URL}/images/search?limit=${PAGE_SIZE}&page=${page}`;
    if (search) {
      url += `&breed_ids=${search}`;
    }
    if (breed) {
      url += `&breed_ids=${breed}`;
    }

    const response = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const dogs = await response.json();
    totalPages = Math.ceil(dogs.length / PAGE_SIZE);
    renderDogs(dogs);
    updatePageInfo();
  } catch (error) {
    console.error("Error fetching dogs:", error);
  }
}

function renderDogs(dogs) {
  dogList.innerHTML = "";
  dogs.forEach((dog) => {
    if (dog.breeds && dog.breeds.length > 0 && dog.breeds[0].name) {
      const dogDiv = document.createElement("div");
      dogDiv.className = "dog";
      dogDiv.id = dog.breeds[0].name;
      dogDiv.innerHTML = `
              <img src="${dog.url}" alt="Dog">
              <h2>${dog.breeds[0].name}</h2>
                    <button onclick="addToCart('${dog.id}', '${dog.url}', '${dog.breeds[0].name}')">Add to Cart</button>
          `;
      dogList.appendChild(dogDiv);
    }
  });

  dogs.forEach((dog) => {
    if (dog.breeds && dog.breeds.length > 0 && dog.breeds[0].name) {
      const option = document.createElement("option");
      option.value = dog.breeds[0].name;
      option.textContent = dog.breeds[0].name;
      breedFilter.appendChild(option);
    }
  });
}

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const breedTerm = breedFilter.value.toLowerCase();
  fetchDogs(currentPage, searchTerm, breedTerm);
}

function handlePagination(direction) {
  if (direction === "next" && currentPage < totalPages) {
    currentPage++;
  } else if (direction === "prev" && currentPage > 1) {
    currentPage--;
  }
  fetchDogs(currentPage);
}
window.addToCart = addToCart;
//searchInput.addEventListener("input", handleSearch);
//breedFilter.addEventListener("change", handleSearch);
prevBtn.addEventListener("click", () => handlePagination("prev"));
nextBtn.addEventListener("click", () => handlePagination("next"));
const checkoutBtn = document.getElementById("checkout-btn");
checkoutBtn.addEventListener("click", UserContactInfo);

// Initial fetch
//fetchBreeds();
fetchDogs();

function UserContactInfo() {
  if (cart.size === 0) {
    alert(`Cart is empty`);
  } else if (cart.size > 1) {
    alert(`Cannot adopt more than 1 dog`);
  } else {
    const checkout = document.getElementById("checkout");
    checkout.innerHTML = "";
    let container = document.createElement("div");
    container.className = "container";
    // Create the form element
    const form = document.createElement("form");
    form.action = "javascript:contactSubmission();";
    // First Name Label and Input
    const fnameLabel = document.createElement("label");
    fnameLabel.setAttribute("for", "fname");
    fnameLabel.textContent = "First Name";
    form.appendChild(fnameLabel);

    const fnameInput = document.createElement("input");
    fnameInput.type = "text";
    fnameInput.id = "fname";
    fnameInput.name = "firstname";
    fnameInput.placeholder = "Your name..";
    fnameInput.required = true;
    form.appendChild(fnameInput);

    // Last Name Label and Input
    const lnameLabel = document.createElement("label");
    lnameLabel.setAttribute("for", "lname");
    lnameLabel.textContent = "Last Name";
    form.appendChild(lnameLabel);

    const lnameInput = document.createElement("input");
    lnameInput.type = "text";
    lnameInput.id = "lname";
    lnameInput.name = "lastname";
    lnameInput.placeholder = "Your last name..";
    form.appendChild(lnameInput);

    // Country Label and Select
    const stateLabel = document.createElement("label");
    stateLabel.setAttribute("for", "state");
    stateLabel.textContent = "state";
    form.appendChild(stateLabel);

    const stateSelect = document.createElement("select");
    stateSelect.id = "state";
    stateSelect.name = "state";
    ["Florida", "Texas", "New York", "Virginia", "New Jersey"].forEach(
      (state) => {
        const option = document.createElement("option");
        option.value = state.toLowerCase();
        option.textContent = state;
        stateSelect.appendChild(option);
      }
    );
    form.appendChild(stateSelect);

    // Last Name Label and Input
    const contactLabel = document.createElement("label");
    contactLabel.setAttribute("for", "phone");
    contactLabel.textContent = "Phone";
    form.appendChild(contactLabel);

    const contactInput = document.createElement("input");
    contactInput.type = "text";
    contactInput.id = "phone";
    contactInput.name = "phone";
    contactInput.placeholder = "Your Phone number..";
    form.appendChild(contactInput);

    // Subject Label and Textarea
    const subjectLabel = document.createElement("label");
    subjectLabel.setAttribute("for", "reason");
    subjectLabel.textContent = "Reason";
    form.appendChild(subjectLabel);

    const subjectTextarea = document.createElement("textarea");
    subjectTextarea.id = "reason";
    subjectTextarea.name = "reason";
    subjectTextarea.placeholder = "Why you want to adopt..";
    subjectTextarea.style.height = "200px";
    form.appendChild(subjectTextarea);

    // Submit Button
    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Submit";
    submitButton.id = "contactBtn";
    form.appendChild(submitButton);

    // Append form to container
    container.appendChild(form);
    checkout.appendChild(container);
  }
}
window.contactSubmission = contactSubmission;
function contactSubmission() {
  let fName = document.getElementById("fname").value;
  alert(
    `Hi ${fName}, Thank you for providing your details for adoption . We will get back to you shortly`
  );
}
