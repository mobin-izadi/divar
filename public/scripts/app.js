import { popularCities, searchCity, locations } from "./utils/cities.js"
import { LoadingHandler, setCookie, searchCookie } from "./utils/public.js"

const popCitiesWrapper = document.querySelector('.popular-cities__wrapper')
const blurWrapper = document.querySelector('.blur')
const searchInput = document.querySelector('.search-input')
const searchResultWrapper = document.querySelector('.box-search__wrapper')
const searchBox = document.querySelector('.box-search')
const searchBoxNotFound = document.querySelector('.box-search__not-found')
// -------------------------------------functions
//dark mode show massage Handler
// const darkModeHandler = () => {
//     let darkPrefers = window.matchMedia('(prefers-color-scheme: dark)')
//     const notifyWrapper = document.querySelector('.notify')
//     const notifyYesBtn = document.querySelector('.notify__btn-yes')
//     const notifyNoBtn = document.querySelector('.notify__btn-no')
//     if (darkPrefers) {
//         notifyWrapper.classList.remove('hidden')
//         blurWrapper.classList.remove('hidden')
//     } else {
//         notifyWrapper.classList.add('hidden')
//         blurWrapper.classList.add('hidden')
//     }

//     notifyYesBtn.addEventListener('click', () => {
//         document.querySelector('html').classList.add('dark')
//         notifyWrapper.classList.add('hidden')
//         blurWrapper.classList.add('hidden')
//         localStorage.setItem('theme', 'dark')
//     })
//     notifyNoBtn.addEventListener('click', () => {
//         notifyWrapper.classList.add('hidden')
//         blurWrapper.classList.add('hidden')
//     })
// }
// Showing popular visited cities
const showPopCities = async () => {
    let popCities = await popularCities()
    popCitiesWrapper.innerHTML = ''
    popCities.slice(0, 10).forEach(city => {
        popCitiesWrapper.insertAdjacentHTML('beforeend', `
                    <li class="basis-1/5 text-center">
                                <a href="pages/main.html?city=${city.slug}"
                                    class="text-sm font-medium text-black/56 dark:text-white/56 dark:hover:text-white hover:text-black popularcities__link">${city.name}</a>
                            </li>
                    `)
    })
}
// Add click event for popular cities to record in cookie
const popCitiesEventHandler = () => {
    let allPopCities = document.querySelectorAll('.popularcities__link')
    allPopCities.forEach(city => {
        city.addEventListener('click', () => { setCookie('city', city.innerHTML, 30, '/') })
    })
}
// search
const searchHandler = (event) => {
    let targetCitySearch = event.target.value
    if (targetCitySearch.length) {
        let resultFindCities = searchCity(targetCitySearch)
        console.log(resultFindCities.length);
        if (resultFindCities.length) {
            searchResultWrapper.innerHTML = ''
            resultFindCities.forEach(city => {
                searchResultWrapper.insertAdjacentHTML('beforeend', `
                    <li class="hover:bg-black/10 p-2 ">
                                        <a href="pages/main.html?city=${city.slug}" class="block" onclick=setCookieHandler('${city.name}')>${city.name}</a>
                                    </li>
                    `)
            })
            searchBoxNotFound.classList.add('hidden')
        } else {
            searchBoxNotFound.classList.remove('hidden')
        }
        searchBox.classList.add('visible')
        searchBox.classList.add('opacity-100')
    } else {
        searchBox.classList.remove('visible')
        searchBox.classList.remove('opacity-100')
    }

}

const setCookieHandler = (name) => {
    setCookie('city', name, 30, '/')
}
window.setCookieHandler = setCookieHandler
// -------------------------------------events
window.addEventListener('load', async () => {
    let checkCookieCity = searchCookie('city')
    if (checkCookieCity) {
        window.location.href = `pages/main.html?city=${checkCookieCity}`
    } else {
        // let theme = localStorage.getItem('theme')
        // if (theme != 'dark') {
        //     darkModeHandler()
        // } else {
        //     document.querySelector('html').classList.add(theme)
        // }
        await locations()
        await showPopCities()
        popCitiesEventHandler()
        LoadingHandler()
    }
})

// search
searchInput.addEventListener('input', event => {
    searchHandler(event)
})
searchInput.addEventListener('blur', () => {
    searchBox.classList.remove('visible')
    searchBox.classList.remove('opacity-100')
})
searchInput.addEventListener('focus', event => {
    if (event.target.value.length) {
        searchHandler(event)
    }

})
