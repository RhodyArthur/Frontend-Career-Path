import { menuArray } from "./data.js";

const checkOutModal = document.getElementById("checkout-modal");
const consentForm = document.getElementById("consent-form");
const payBtn = document.getElementById("pay-btn");
const errorMessageDiv = document.getElementById("error-message");

let orderArray = [];

consentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear previous error messages
  errorMessageDiv.textContent = "";

  // Get form data
  const consentFormData = new FormData(consentForm);
  const name = consentFormData.get("name").trim();
  const cardNumber = consentFormData.get("card-number").trim();
  const cvv = consentFormData.get("cvv").trim();

  // Regular expressions for pattern validation
  const namePattern = /^[A-Za-z\s]+$/;
  const cardNumberPattern = /^\d{16}$/;
  const cvvPattern = /^\d{3}$/;

  // Validate each field
  if (!name) {
    showError("Name is required.", consentForm.name);
  } else if (!namePattern.test(name)) {
    showError(
      "Please enter a valid name (letters and spaces only).",
      consentForm.name.focus()
    );
  } else if (!cardNumber) {
    showError("Card number is required.", consentForm["card-number"]);
  } else if (!cardNumberPattern.test(cardNumber)) {
    showError(
      "Please enter a valid card number (16 digits).",
      consentForm["card-number"]
    );
  } else if (!cvv) {
    showError("CVV is required.", consentForm.cvv);
  } else if (!cvvPattern.test(cvv)) {
    showError("Please enter a valid CVV (3 digits).", consentForm.cvv);
  } else {
    const thankYouNote = document.getElementById("thank-you-note");
    thankYouNote.innerHTML = `<p>Thanks, ${name}! Your order is on its way!</p>`;
    thankYouNote.classList.remove("hidden");

    document.getElementById("checkout-modal").style.display = "none";
    document.getElementById("payment-modal").style.display = "none";
  }
});

document.addEventListener("click", function (e) {
  if (e.target.dataset.itemid) {
    handleAddBtnClick(e.target.dataset.itemid);
  } else if (e.target.dataset.remove) {
    handleRemoveItemClick(e.target.dataset.remove);
  } else if (e.target.id === "purchase-btn") {
    handlePayment(e.target.id);
  }
});

function getMenuHtml() {
  const menuHtml = menuArray.map((menu) => {
    const { emoji, name, ingredients, price, id } = menu;
    return `
            <div class="item" data-itemid="${id}">    
                <p class="item-graphic">${emoji}</p>
                <div class="inner-menu"> 
                    <p class="item-title">${name}</p>
                    <p class="item-description">${ingredients.join(", ")}</p>
                    <p class="item-price">$${price}</p>
                </div>
                <button class="item-btn" id="add-btn" data-itemid="${id}">+</button>
            </div>
        `;
  });
  return menuHtml.join("");
}

function handleAddBtnClick(menuId) {
  const targetMenuObj = menuArray.find((menu) => menu.id === Number(menuId));

  if (targetMenuObj) {
    const existingOrder = orderArray.find(
      (order) => order.id === Number(menuId)
    );
    if (existingOrder) {
      existingOrder.quantity += 1;
    } else {
      targetMenuObj.quantity = 1;
      orderArray.push(targetMenuObj);
    }
    displayOrder();
  }
  checkOutModal.classList.remove("hidden");
}

function handleRemoveItemClick(itemId) {
  const itemIndex = orderArray.findIndex((item) => item.id === Number(itemId));
  if (itemIndex !== -1) {
    if (orderArray[itemIndex].quantity > 1) {
      orderArray[itemIndex].quantity -= 1;
    } else {
      orderArray.splice(itemIndex, 1);
    }
    displayOrder();
  }
}

function getQuantity(menuId) {
  const targetOrder = orderArray.find((order) => order.id === Number(menuId));
  return targetOrder ? targetOrder.quantity : 0;
}

function displayOrder() {
  const orderHtml = orderArray
    .map((order) => {
      const { name, id, price } = order;
      return `
                <div class="order-summary">
                    <div class="order-name">
                        <h3>${name}</h3>
                        <p class="remove" data-remove="${id}">remove</p>
                        <p class="quantity" data-quantity="${id}">Quantity: ${getQuantity(
        id
      )}</p>
                    </div>
                    <h4>$${price * getQuantity(id)}</h4>
                </div>
            `;
    })
    .join("");

  document.getElementById("order-summary").innerHTML = orderHtml;

  if (orderArray.length === 0) {
    checkOutModal.classList.add("hidden");
  }

  const orderTotal = orderArray.reduce(
    (total, currentOrder) => total + currentOrder.price * currentOrder.quantity,
    0
  );
  document.getElementById(
    "total-modal"
  ).innerHTML = `<h3>Total price:</h3><h4>$${orderTotal}</h4>`;
}

function showError(message, inputField) {
  errorMessageDiv.textContent = message;
  inputField.focus();
}

function handlePayment(orderId) {
  document.getElementById("payment-modal").classList.toggle("hidden");
}

function render() {
  document.getElementById("menu-list").innerHTML = getMenuHtml();
}

function displayRating() {}

render();
