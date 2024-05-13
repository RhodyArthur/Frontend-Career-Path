/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/
// let number = 30;
document.addEventListener("DOMContentLoaded", function () {
  let rectangle = document.getElementById("rectangle");
  let numberInput = document.getElementById("numberInput");

  rectangle.addEventListener("click", function () {
    numberInput.focus();
  });

  numberInput.addEventListener("keydown", function (event) {
    // Allow only numbers and the backspace key
    if (!(event.key >= "0" && event.key <= "9") && event.key !== "Backspace") {
      event.preventDefault();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let convertBtn = document.getElementById("convertBtn");
  convertBtn.addEventListener("click", function () {
    // Get the user input number
    let numberInput = document.getElementById("numberInput").innerText.trim();
    let number = parseFloat(numberInput);

    // Check if the input is a valid number
    if (isNaN(number)) {
      alert("Please enter a valid number.");
      return;
    }

    // Length conversion
    let meterToFeet = (number * 3.281).toFixed(3);
    let feetToMeter = (number / 3.281).toFixed(3);
    let lengthString = `${number} meters = ${meterToFeet} feet | ${number} feet = ${feetToMeter} meters`;

    // Volume conversion
    let litresToGallon = (number * 0.264).toFixed(3);
    let GallonToLitres = (number / 0.264).toFixed(3);
    let volumeString = `${number} liters = ${litresToGallon} gallons | ${number} gallons = ${GallonToLitres} liters`;

    // Mass conversion
    let kilosToPounds = (number * 2.204).toFixed(3);
    let PoundsToKilos = (number / 2.204).toFixed(3);
    let massString = `${number} kilos = ${kilosToPounds} pounds | ${number} pounds = ${PoundsToKilos} kilos`;

    // Display conversion results on the webpage
    document.getElementById("lengthConversion").innerHTML = lengthString;
    document.getElementById("volumeConversion").innerHTML = volumeString;
    document.getElementById("massConversion").innerHTML = massString;
  });
});
