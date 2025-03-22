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
// search in cookie
const searchCookie = (name) => {
    let allCookies = document.cookie
    let arrCookies = allCookies.split(';')
    let findCookie = arrCookies.find(cookie => cookie.includes(name))
    let findCookieArr = findCookie.split('=')
    return findCookieArr[1]

}

export { LoadingHandler, darkMode, setCookie, searchCookie }