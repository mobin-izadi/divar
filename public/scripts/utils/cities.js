const url = 'https://divarapi.liara.run'
// get all locations
const locations = async () => {
    try {
        let res = await fetch('https://divarapi.liara.run/v1/location/')
        let allLocation = await res.json()
        return allLocation
        if (!res.ok) {
            throw new Error('Backend is disconnected')
        }
    } catch (error) {
        console.error(error)
        alert('متاسفانه ارتباط با بک اند برقرار نیست و به دلیل اینکه اطلاعات داخل صفحه پویا هستند و از طریق بک اند دریافت می شوند امکان دارد ظاهر سایت را با بهم ریختگی ببینید.')
    }
}

// get popular cities
const popularCities = async () => {
    let allCities = await locations()
    let popCities = allCities.data.cities.filter(city => city.popular)
    return popCities
}




export { popularCities,locations }