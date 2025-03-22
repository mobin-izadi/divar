import { popularCities } from "./utils/cities.js"
import { LoadingHandler } from "./utils/public.js"

const popCitiesWrapper = document.querySelector('.popular-cities__wrapper')
const blurWrapper = document.querySelector('.blur')
// -------------------------------------functions
//dark mode show massage Handler
const darkModeHandler = () => {
    let darkPrefers = window.matchMedia('(prefers-color-scheme: dark)')
    const notifyWrapper = document.querySelector('.notify')
    const notifyYesBtn = document.querySelector('.notify__btn-yes')
    const notifyNoBtn = document.querySelector('.notify__btn-no')
    if (darkPrefers) {
        notifyWrapper.classList.remove('hidden')
        blurWrapper.classList.remove('hidden')
    } else {
        notifyWrapper.classList.add('hidden')
        blurWrapper.classList.add('hidden')
    }

    notifyYesBtn.addEventListener('click', () => {
        document.querySelector('html').classList.add('dark')
        notifyWrapper.classList.add('hidden')
        blurWrapper.classList.add('hidden')
        localStorage.setItem('theme', 'dark')
    })
    notifyNoBtn.addEventListener('click', () => {
        notifyWrapper.classList.add('hidden')
        blurWrapper.classList.add('hidden')
    })
}
// Showing popular visited cities
const showPopCities = async () => {
    let popCities = await popularCities()
    popCitiesWrapper.innerHTML = ''
    popCities.slice(0, 10).forEach(city => {
        popCitiesWrapper.insertAdjacentHTML('beforeend', `
                    <li class="basis-1/5 text-center">
                                <a href="main.html?city=${city.slug}"
                                    class="text-sm font-medium text-black/56 dark:text-white/56 dark:hover:text-white hover:text-black">${city.name}</a>
                            </li>
                    `)
    })
}


// -------------------------------------events
window.addEventListener('load', async () => {
    let theme = localStorage.getItem('theme')
    if (theme != 'dark') {
        darkModeHandler()
    } else {
        document.querySelector('html').classList.add(theme)
    }

    await showPopCities()
    LoadingHandler()

})