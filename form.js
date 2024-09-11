// form.js

import { cart, renderCart, addToCart } from "./cart.js";

export function displayContactForm() {
  if (cart.size === 0) {
    alert(`Cart is empty`);
  } else if (cart.size > 1) {
    alert(`Cannot adopt more than 1 dog`);
  } else {
    const checkout = document.getElementById("checkout");
    checkout.innerHTML = "";

    const container = document.createElement("div");
    container.className = "container";

    const form = document.createElement("form");
    form.action = "javascript:contactSubmission();"; // Prevent form submission

    const fields = [
      {
        id: "fname",
        name: "firstname",
        placeholder: "Your name..",
        label: "First Name",
        required: true,
      },
      {
        id: "lname",
        name: "lastname",
        placeholder: "Your last name..",
        label: "Last Name",
      },
      {
        id: "phone",
        name: "phone",
        placeholder: "Your Phone number..",
        label: "Phone",
      },
      {
        id: "reason",
        name: "reason",
        placeholder: "Why you want to adopt..",
        label: "Reason",
        textarea: true,
      },
    ];

    fields.forEach(({ id, name, placeholder, label, required, textarea }) => {
      const labelElement = document.createElement("label");
      labelElement.setAttribute("for", id);
      labelElement.textContent = label;
      form.appendChild(labelElement);

      if (textarea) {
        const textareaElement = document.createElement("textarea");
        textareaElement.id = id;
        textareaElement.name = name;
        textareaElement.placeholder = placeholder;
        textareaElement.style.height = "200px";
        form.appendChild(textareaElement);
      } else {
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.id = id;
        inputElement.name = name;
        inputElement.placeholder = placeholder;
        inputElement.required = required;
        form.appendChild(inputElement);
      }
    });

    const stateLabel = document.createElement("label");
    stateLabel.setAttribute("for", "state");
    stateLabel.textContent = "State";
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

    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Submit";
    submitButton.id = "contactBtn";
    form.appendChild(submitButton);

    container.appendChild(form);
    checkout.appendChild(container);
  }
}
window.contactSubmission = contactSubmission;
export function contactSubmission() {
  const fName = document.getElementById("fname").value;
  alert(
    `Hi ${fName}, Thank you for providing your details for adoption. We will get back to you shortly.`
  );
  window.location.reload();
}
