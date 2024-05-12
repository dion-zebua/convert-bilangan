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
buttonInputAngka.addEventListener('click', (event) => {
    if (event.target.tagName != 'svg') {
        inputFunction()
    }
})
function inputFunction() {
    inputAngka.focus()
    setInterval(() => {
        if (document.activeElement.tagName == 'INPUT') {
            buttonInputAngka.classList.add('border-2', 'border-sky-500', 'dark:border-sky-500')
        } else {
            buttonInputAngka.classList.remove('border-2', 'border-sky-500', 'dark:border-sky-500')
        }
    }, 1)
}

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
    buttonInputAngka.classList.add('opacity-50')
}

function hiddenSelector() {
    containerMenuButton.children[0].classList.remove('!block')
    containerMenuButton.children[0].classList.add('hidden')
    containerMenuButton.classList.remove('!top-full')
    containerMenuButton.classList.remove('!ring-opacity-5')
    containerMenuButton.classList.remove('!z-10')
    buttonInputAngka.classList.remove('opacity-50')
}

// Syarat Menu
const syarat = {
    Biner: [
        'input 0 / 1',
    ],
    Desimal: [
        'input 0 - 9',
    ],
    Oktal: [
        'input 0 - 7',
    ],
    Hexadesimal: [
        'input 0 - 9',
        'input A - F',
        'A = 10',
        'A = 11',
        'A = 12',
        'A = 13',
        'A = 14',
        'A = 15',
    ]
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
        el.children[0].innerHTML = filterBilangan[index]
        el.children[0].setAttribute('for', filterBilangan[index])
        el.children[1].setAttribute('id', filterBilangan[index])
        el.children[1].setAttribute('placeholder', item + ' belum diinput!')
        el.children[1].value = ''
    })
}



// Hasil Convert
const hasilConvert = function () {
    // Hasil Convert
    const setBiner = e => {
        document.querySelector('input#Biner').value = e
    }
    const setDesimal = e => {
        document.querySelector('input#Desimal').value = e
    }
    const setOktal = e => {
        document.querySelector('input#Oktal').value = e
    }
    const setHexadesimal = e => {
        document.querySelector('input#Hexadesimal').value = e;
    }

    // Cara Convert
    let isiCaraPengerjaan = document.querySelector('#cara-pengerjaan #isiContainer')
    isiCaraPengerjaan.innerHTML = ''
    const binerToDesimal = e => {
        let total = document.createElement('div')
        total.classList.add('isi')
        let hasilTotal = 0
        e.split('').reverse().forEach((item, index) => {
            let cara = document.createElement('div')
            cara.classList.add('isi')
            let hasil = item * (2 ** index)
            cara.innerHTML = `<span class="number1">${item}</span>&nbsp;
                                <span class="div">*</span>&nbsp;
                                <span class="number2">2&Hat;${index}</span>&nbsp;
                                <span class="equal">=</span>&nbsp;
                                <span class="resultDiv">${hasil}</span>&nbsp;`
            isiCaraPengerjaan.appendChild(cara)
            hasilTotal = hasilTotal + hasil
        });
        total.innerHTML = `Total ${e}. Jadi, ${e} Biner adalah adalah ${hasilTotal} Desimal`
        isiCaraPengerjaan.appendChild(total)

    }
    const binerToOktal = e => {
        // console.log(e)
    }
    const binerToHexadesimal = e => {
        // console.log(e)
    }

    // Logic Hasil
    errorMessageFunction('clear')
    let bilanganActive = menuButton.children[0].innerText
    let inputAngka = document.querySelector('#inputAngka').value
    if (bilanganActive == 'Biner' && /^[01]+$/.test(inputAngka)) {
        let desimalRes = parseInt(inputAngka, 2)
        setDesimal(desimalRes)
        setOktal(desimalRes.toString(8))
        setHexadesimal(desimalRes.toString(16).toUpperCase())

        binerToDesimal(inputAngka)
        binerToOktal(inputAngka.toString(8))
        binerToHexadesimal(inputAngka.toString(16).toUpperCase())
    }
    else if (bilanganActive == 'Desimal' && /^[0-9]+$/.test(inputAngka)) {
        let desimalRes = parseInt(inputAngka)
        setBiner(desimalRes.toString(2))
        setOktal(desimalRes.toString(8))
        setHexadesimal(desimalRes.toString(16).toUpperCase())
    }
    else if (bilanganActive == 'Oktal' && /^[0-7]+$/.test(inputAngka)) {
        let desimalRes = parseInt(inputAngka, 8)
        setBiner(desimalRes.toString(2))
        setDesimal(desimalRes)
        setHexadesimal(desimalRes.toString(16).toUpperCase())
    }
    else if (bilanganActive == 'Hexadesimal' && /^[0-9A-Fa-f]+$/.test(inputAngka)) {
        let desimalRes = parseInt(inputAngka, 16)
        setBiner(desimalRes.toString(2))
        setDesimal(desimalRes)
        setOktal(desimalRes.toString(8))
    }
    else {
        clearInputRes(bilanganActive)
        inputAngka.value = ''
        if (inputAngka != '') {
            errorMessageFunction()
        }
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
const submit = document.querySelector('form .enter')
const loading = document.querySelector('form .loading')
const hasilSection = document.querySelector("#hasil")
form.addEventListener('submit', function (event) {
    event.preventDefault();
    hasilConvert()
    inputAngka.blur()
    submit.classList.add('hidden')
    loading.classList.remove('hidden')
    setTimeout(() => {
        mainSection.classList.remove('hidden')
        footerSection.classList.remove('hidden')
        document.body.classList.remove('overflow-hidden')
        submit.classList.remove('hidden')
        loading.classList.add('hidden')
        mainSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 1000)
});

// After Change Input Value
inputAngka.addEventListener('input', hasilConvert)
