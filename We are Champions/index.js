import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://endorsementapp-ae7ee-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementMsgInDB = ref(database, "endorsementMsg");

const textFieldEl = document.getElementById("msgField");
const fromFieldEl = document.getElementById("fromField");
const toFieldEl = document.getElementById("toField");
const publishBtn = document.getElementById("publishBtn");
const msgToEl = document.getElementById("msgTo");
const msgContentEl = document.getElementById("msgContent");
const msgFromEl = document.getElementById("msgFrom");
const endorsementListEl = document.getElementById("endorsement-list");

publishBtn.addEventListener("click", function () {
  let msgValue = textFieldEl.value;
  let fromValue = fromFieldEl.value;
  let toValue = toFieldEl.value;

  // Create a message object with msgValue, fromValue, and toValue
  const message = {
    msg: msgValue,
    from: fromValue,
    to: toValue,
  };
  // push message to database
  push(endorsementMsgInDB, message);

  clearMsgField();
});

onValue(endorsementMsgInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.values(snapshot.val());

    clearEndorsementList();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      //append any message a user adds to the list
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("rectangle");
      messageContainer.id = "endorsement-list";

      // Create elements for the message
      const toElement = document.createElement("p");
      toElement.textContent = `To ${currentItem.to}`;
      toElement.classList.add("endorsement-to");

      const contentElement = document.createElement("p");
      contentElement.textContent = currentItem.msg;
      contentElement.classList.add("endorsement-msg");

      const fromElement = document.createElement("p");
      fromElement.textContent = `From ${currentItem.from}`;
      fromElement.classList.add("endorsement-from");

      // Append elements to the message container
      messageContainer.appendChild(toElement);
      messageContainer.appendChild(contentElement);
      messageContainer.appendChild(fromElement);

      // Append the message container to the displayValues div
      const displayValues = document.getElementById("displayValues");
      displayValues.appendChild(messageContainer);
      displayValues.appendChild(document.createElement("br"));
    }
  } else {
    displayValues.innerHTML =
      "<span class='no-endorsements'>Put a Smile on Someone's Face😊</span>";
  }
});

// function to clear endorsementList
function clearEndorsementList() {
  displayValues.innerHTML = "";
}

// function to clear textField when button is clicked
function clearMsgField() {
  textFieldEl.value = "";
  fromFieldEl.value = "";
  toFieldEl.value = "";
}
