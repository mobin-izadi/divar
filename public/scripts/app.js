// blur effect
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
// Showing most visited cities
const popularCityHandler = async () => {
    let popCitiesWrapper = document.querySelector('.popular-cities__wrapper')
    try {
        let res = await fetch('https://divarapi.liara.run/v1/location/')
        let allCities = await res.json()
        let popCities = allCities.data.cities.filter(city => city.popular).slice(0, 10)
        console.log(popCities);
        popCitiesWrapper.innerHTML = ''
        popCities.forEach(city => {
            popCitiesWrapper.insertAdjacentHTML('beforeend', `
                <li class="basis-1/5 text-center">
                            <a href="${city.slug}"
                                class="text-sm font-medium text-black/56 dark:text-white/56 dark:hover:text-white hover:text-black">${city.name}</a>
                        </li>

                `)
        })

        if (!res.ok) {
            throw new Error('Backend is disconnected')
        }

    } catch (error) {
        console.error(error)
        alert('متاسفانه ارتباط با بک اند برقرار نیست و به دلیل اینکه اطلاعات داخل صفحه پویا هستند و از طریق بک اند دریافت می شوند امکان دارد ظاهر سایت را با بهم ریختگی ببینید.')
    }
}
// remove loading
const LoadingHandler = () => {
    const loadingWrapper = document.querySelector('.loading')
    loadingWrapper.classList.add('hidden')
}

// -------------------------------------events
window.addEventListener('load', async () => {
    let theme = localStorage.getItem('theme')
    if (theme != 'dark') {
        darkModeHandler()
    } else {
        document.querySelector('html').classList.add(theme)
    }

    await popularCityHandler()
    LoadingHandler()

})