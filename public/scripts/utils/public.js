// remove loading
const LoadingHandler = () => {
    const loadingWrapper = document.querySelector('.loading')
    loadingWrapper.classList.add('hidden')
}

// add dark mode
const darkMode = () => {
    let theme = localStorage.getItem('theme')
    if (theme = 'dark') {
        document.querySelector('html').classList.add(theme)
    }
}

// set cookies
const setCookie = (key, value, day, path) => {
    let date = new Date()
    date.setTime(date.getTime() + (day * 24 * 60 * 60 * 1000))
    let expires = date.toUTCString()
    document.cookie = `${key}=${value}; expires=${expires}; path=${path}`
}

export { LoadingHandler, darkMode, setCookie }