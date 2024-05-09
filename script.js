let myHtml = document.querySelector('html')
let modeToggle = document.querySelector('#bg-indicator')
// set class
window.addEventListener('storage', function (event) {
    if (event.key === 'theme') {
        if (event.newValue === 'dark') {
            myHtml.classList.add('dark')
        } else {
            myHtml.classList.remove('dark')
        }
    }
})

// check theme
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    localStorage.theme = 'dark'
    myHtml.classList.add('dark')
} else {
    localStorage.theme = 'light'
}

// toggle mode
if (modeToggle) {
    modeToggle.addEventListener('click', () => {
        if (localStorage.theme == 'dark') {
            localStorage.theme = 'light'
            myHtml.classList.remove('dark')
        } else {
            localStorage.theme = 'dark'
            myHtml.classList.add('dark')
        }
    })
}


// Search
const buttonInputAngka = document.querySelector('#searchAngka')
const inputAngka = document.querySelector('#inputAngka')
buttonInputAngka.addEventListener('click', inputFunction)
function inputFunction() {
    inputAngka.focus()
    setInterval(() => {
        if (document.activeElement.tagName == 'INPUT') {
            buttonInputAngka.classList.add('border-2', 'border-slate-300', 'dark:border-slate-700')
        } else {
            buttonInputAngka.classList.remove('border-2', 'border-slate-300', 'dark:border-slate-700')
        }
    }, 1)
}

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault()
        inputFunction()
    }
});

// Select Bilangan
const menuButton = document.querySelector('#menu-button')
const containerMenuButton = document.querySelector('#container-menu-button')
const listMenuButton = document.querySelectorAll('#container-menu-button a')
let result = ''
function showSelector() {
    containerMenuButton.children[0].classList.add('!block')
    containerMenuButton.children[0].classList.remove('hidden')
    containerMenuButton.classList.add('!top-full')
    containerMenuButton.classList.add('!ring-opacity-5')
    containerMenuButton.classList.add('!z-10')
    buttonInputAngka.classList.add('!opacity-50')
}

function hiddenSelector() {
    containerMenuButton.children[0].classList.remove('!block')
    containerMenuButton.children[0].classList.add('hidden')
    containerMenuButton.classList.remove('!top-full')
    containerMenuButton.classList.remove('!ring-opacity-5')
    containerMenuButton.classList.remove('!z-10')
    buttonInputAngka.classList.remove('!opacity-50')
}

menuButton.addEventListener('click', () => {

    if (containerMenuButton.children[0].classList.contains('hidden')) {
        showSelector()
    } else {
        hiddenSelector()
    }
})

const bilangan = [
    "Biner",
    "Desimal",
    "Oktal",
    "Hexadesimal"
]

// Hasil Input
const listHasil = document.querySelectorAll("#hasil .list-hasil")
let getBilangan = function (item) {
    let filterBilangan = bilangan.filter((word) => word != item)
    listMenuButton.forEach((el, index) => {
        el.innerHTML = filterBilangan[index]
    })
    listHasil.forEach((el, index) => {
        el.firstElementChild.innerHTML = filterBilangan[index]
        el.firstElementChild.setAttribute('for', filterBilangan[index])
        el.lastElementChild.setAttribute('id', filterBilangan[index])
        el.lastElementChild.setAttribute('placeholder', item + ' belum diinput!')
        el.lastElementChild.value = ''
    })
}

// Hasil Convert
const hasilConvert = function () {
    let setBiner = e => {
        document.querySelector('input#Biner').value = e
    }
    let setDesimal = e => {
        document.querySelector('input#Desimal').value = e
    }
    let setOktal = e => {
        document.querySelector('input#Oktal').value = e
    }
    let setHexadesimal = e => {
        document.querySelector('input#Hexadesimal').value = e;
    }

    errorMessageFunction('clear')
    let bilanganActive = menuButton.children[0].innerText
    let inputAngka = document.querySelector('#inputAngka').value
    if (bilanganActive == 'Biner' && /^[01]+$/.test(inputAngka)) {
        let desimalRes = parseInt(inputAngka, 2)
        setDesimal(desimalRes)
        setOktal(desimalRes.toString(8))
        setHexadesimal(desimalRes.toString(16).toUpperCase())
    }
    else if (bilanganActive == 'Desimal' && /^[0-9]+$/.test(inputAngka)) {
        let desimalRes = parseInt(inputAngka)
        setBiner(desimalRes.toString(2))
        setOktal(desimalRes.toString(8))
        setHexadesimal(desimalRes.toString(16).toUpperCase())
    }
    else if (bilanganActive == 'Oktal' && /^[0-7]+$/.test(inputAngka)) {
        let desimalRes = parseInt(inputAngka , 8)
        setBiner(desimalRes.toString(2))
        setDesimal(desimalRes)
        setHexadesimal(desimalRes.toString(16).toUpperCase())
    }
    else if (bilanganActive == 'Hexadesimal' && /^[0-9A-Fa-f]+$/.test(inputAngka)) {
        let desimalRes = parseInt(inputAngka , 16)
        setBiner(desimalRes.toString(2))
        setDesimal(desimalRes)
        setOktal(desimalRes.toString(8))
    }
    else {
        errorMessageFunction()
        clearInputRes(bilanganActive)
        inputAngka.value = ''
    }
}

// After Click Bilangan Option
listMenuButton.forEach(e => {
    e.addEventListener('click', (i) => {
        inputAngka.value = ''
        menuButton.firstElementChild.innerHTML = e.innerHTML
        clearInputRes(e.innerHTML)
    })
})

// Clear Placeholder
const clearInputRes = function (param) {
    inputAngka.setAttribute('placeholder', 'Input angka ' + param + '...')
    hiddenSelector()
    getBilangan(param)
}

// ERROR
const errorMessage = document.querySelector('#errorMessage')
const caraPengerjaan = document.querySelector('#caraPengerjaan')
function errorMessageFunction(param) {
    errorMessage.classList.add('!flex')
    caraPengerjaan.classList.add('!flex')
    if (param == 'clear') {
        errorMessage.classList.remove('!flex')
        caraPengerjaan.classList.remove('!flex')
    }
    setTimeout(() => {
        errorMessage.classList.remove('!flex')
        caraPengerjaan.classList.remove('!flex')
    }, 30000)

}

// Form
const mainSection = document.querySelector('main');
const footerSection = document.querySelector('footer');
const form = document.querySelector('form')
const hasilSection = document.querySelector("#hasil")
form.addEventListener('submit', function (event) {
    event.preventDefault();
    mainSection.classList.remove('hidden')
    footerSection.classList.remove('hidden')
    document.body.classList.remove('hidden')
    hasilTop = hasilSection.getBoundingClientRect().top + window.scrollX
    window.scrollTo({ top: hasilTop, behavior: "smooth" })
    hasilConvert()
});

// After Change Input Value
inputAngka.addEventListener('input', hasilConvert)

