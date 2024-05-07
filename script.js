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
const listHasil = document.querySelectorAll("#hasil .list-hasil")
let getBilangan = function(item) {
    let filterBilangan = bilangan.filter((word) => word != item)
    listMenuButton.forEach((el, index) => {
        el.innerHTML = filterBilangan[index]
    })
    listHasil.forEach((el , index) => {
        el.firstElementChild.innerHTML = filterBilangan[index]
        el.firstElementChild.setAttribute('for', filterBilangan[index])
        el.lastElementChild.setAttribute('id', filterBilangan[index])
        el.lastElementChild.setAttribute('placeholder', item + ' belum diinput!')
    })
}
listMenuButton.forEach(e => {
    e.addEventListener('click', (i) => {
        inputAngka.setAttribute('placeholder', 'Input angka ' + e.innerHTML +'...')
        hiddenSelector()
        menuButton.firstElementChild.innerHTML = e.innerHTML
        let resultBilangan = getBilangan(e.innerHTML)
    })
})

const errorMessage = document.querySelector('#errorMessage')
const caraPengerjaan = document.querySelector('#caraPengerjaan')
function errorMessageFunction(){
    errorMessage.classList.add('!flex')
    caraPengerjaan.classList.add('!flex')
    
}
const form = document.querySelector('form')
const hasilSection = document.querySelector("#hasil") 
form.addEventListener('submit', function (event) {
    event.preventDefault();
    hasilSection.scrollIntoView({behavior: 'smooth'})
    // listHasil.forEach(e => {
    // })
    errorMessageFunction()
});
