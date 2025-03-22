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

export { LoadingHandler, darkMode }