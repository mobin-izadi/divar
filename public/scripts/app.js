

// blur effect
const blurWrapper = document.querySelector('.blur')

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



window.addEventListener('load', () => {
    let theme = localStorage.getItem('theme')
    if (theme != 'dark') {
        darkModeHandler()
    } else {
        document.querySelector('html').classList.add(theme)
    }

})