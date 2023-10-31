const bTheme = document.querySelector("#b-theme")

bTheme.addEventListener("change", () => {
    const htmlDM = document.querySelector("html");
    htmlDM.classList.toggle("dark-modo");
})


const inputPassword = document.querySelector("#password-generator")
const upperCaseCharsEl = document.querySelector("#upper-check")
const numberCharsEl = document.querySelector("#numbers-check")
const symbolCharsEl = document.querySelector("#special-check")

const securityBar = document.querySelector("#strength-bar")

let passwordLength = 10;

function generatePassword() {
    let chars = "abcdefghijklmnopqrstuvwxyz"

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "?!@&*()[]"

    if (upperCaseCharsEl.checked) {
        chars += upperCaseChars
    }

    if (numberCharsEl.checked) {
        chars += numberChars
    }

    if (symbolCharsEl.checked) {
        chars += symbolChars
    }


    let password = ""

    for (let index = 0; index < passwordLength; index++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        // substring é usado para fazer um corte na string.
        // com a substring estamos recortando letra por letra
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputPassword.value = password
    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    const percent = Math.round(
        (passwordLength / 50) * 60 +
        (upperCaseCharsEl.checked ? 5 : 0) +
        (numberCharsEl.checked ? 15 : 0) +
        (symbolCharsEl.checked ? 20 : 0))
    const bar1 = document.querySelector("#strength-bar1")
    const bar2 = document.querySelector("#strength-bar2")
    const bar3 = document.querySelector("#strength-bar3")
    const bar4 = document.querySelector("#strength-bar4")

    if (percent <= 16) {
        bar1.style.backgroundColor = "#FF8E15"
        bar2.style.backgroundColor = "#ffffff4d"
        bar3.style.backgroundColor = "#ffffff4d"
        bar4.style.backgroundColor = "#ffffff4d"
    }

    if (percent > 16 && percent <= 55) {
        bar1.style.backgroundColor = "#FF8E15"
        bar2.style.backgroundColor = "#FAB733"
        bar3.style.backgroundColor = "#ffffff4d"
        bar4.style.backgroundColor = "#ffffff4d"
    }

    if (percent > 55 && percent <= 99) {
        bar1.style.backgroundColor = "#FF8E15"
        bar2.style.backgroundColor = "#FAB733"
        bar3.style.backgroundColor = "#77DD77"
        bar4.style.backgroundColor = "#ffffff4d"
    }

    if (percent == 100) {
        bar1.style.backgroundColor = "#FF8E15"
        bar2.style.backgroundColor = "#FAB733"
        bar3.style.backgroundColor = "#77DD77"
        bar4.style.backgroundColor = "#11d311"
    }
}

function calculateFontSize() {
    if (passwordLength > 38) {
        inputPassword.classList.add('font-xs')
        inputPassword.classList.remove('font-sm')
    } else if (passwordLength > 28) {
        inputPassword.classList.add('font-sm')
        inputPassword.classList.remove('font-xs')
    } else {
        inputPassword.classList.remove('font-xs')
        inputPassword.classList.remove('font-sm')
    }
}

function copy() {
    navigator.clipboard.writeText(inputPassword.value)
}

const passwordLengthBarra = document.querySelector("#pass-length-barr")
passwordLengthBarra.addEventListener("input", function () {
    passwordLength = passwordLengthBarra.value
    document.querySelector("#pass-length-text").innerText = passwordLength
    generatePassword();
})

upperCaseCharsEl.addEventListener("click", generatePassword)
numberCharsEl.addEventListener("click", generatePassword)
symbolCharsEl.addEventListener("click", generatePassword)

const buttonCopy = document.querySelector("#button-copy")
buttonCopy.addEventListener("click", function () {
    copy()
    let inputText = document.querySelector(".password")
    inputText.classList.add("active")
    setTimeout(function () {
        inputText.classList.remove("active")
    }, 2000)
})

const buttonRenew = document.querySelector("#renew-button")
buttonRenew.addEventListener("click", generatePassword)

generatePassword();