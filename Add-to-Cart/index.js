/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-e6346-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const addBtn = document.getElementById("add-button");
const inputEl = document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");

addBtn.addEventListener("click", function () {
  let inputValue = inputEl.value;

  push(shoppingListInDB, inputValue);

  clearInputField();
});

onValue(shoppingListInDB, function (snapshot) {
  // Challenge: Change the onValue code so that it uses snapshot.exists() to show items when there are items in the database and if there are not displays the text 'No items here... yet'.
  if (snapshot.exists()) {
    // Challenge: Use Object.values() to convert snapshot.val() from an Object to an Array. Create a variable for this.
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingList();

    // Challenge: Write a for loop to iterate on itemsArray and console log each item
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      // Challenge: Use the appendItemToShoppingList(itemValue) function inside of the for loop to append item to the shopping list element for each iteration.
      appendItemToShoppingList(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here... yet";
  }
});

// Clear shopping list
function clearShoppingList() {
  shoppingListEl.innerHTML = "";
}

// Clear the input field when the button is clicked
function clearInputField() {
  inputEl.value = "";
}

// append any item a user adds to the list
function appendItemToShoppingList(item) {
  //shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  // Challenge: Attach an event listener to newEl and make it so you console log the id of the item when it's pressed.
  newEl.addEventListener("click", function () {
    // Challenge: Make a let variable called 'exactLocationOfItemInDB' and set it equal to ref(database, something) where you substitute something with the code that will give you the exact location of the item in question.
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

    // Challenge: Use the remove function to remove the item from the database
    remove(exactLocationOfItemInDB);
  });

  shoppingListEl.append(newEl);
}
