const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];


const password_length = 15
let generateButton = document.getElementById("generate-btn-el")
let generateButton1 = document.getElementById("generate-btn-el1")

// generate a password
function generatePassword(password_length) {
    let password = ""
    for (let i = 0; i < password_length; i++) {
        randomIndex = Math.floor(Math.random() * characters.length)        
        password += characters[randomIndex]
    }
   return password;
}
 

// dark-mode
generateButton.addEventListener("click", function() {
    password1El = document.getElementById("password1-el")
    password2El = document.getElementById("password2-el")
    
    password1El.textContent = generatePassword(password_length)
    password2El.textContent = generatePassword(password_length)
}

)

// light-mode
generateButton1.addEventListener("click", function() {
    password3El = document.getElementById("password3-el")
    password4El = document.getElementById("password4-el")

    password3El.textContent = generatePassword(password_length)
    password4El.textContent = generatePassword(password_length)
}

)


