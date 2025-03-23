let allCities = null
// get all locations
const locations = async () => {
    try {
        let res = await fetch('https://divarapi.liara.run/v1/location/')
        let allLocation = await res.json()
        allCities = allLocation
        allCities = allCities.data.cities
        return allCities
        if (!res.ok) {
            throw new Error('Backend is disconnected')
        }
    } catch (error) {
        console.error(error)
        alert('متاسفانه ارتباط با بک اند برقرار نیست و به دلیل اینکه اطلاعات داخل صفحه پویا هستند و از طریق بک اند دریافت می شوند امکان دارد ظاهر سایت را با بهم ریختگی ببینید.')
    }
}


// get popular cities
const popularCities = () => {
    let popCities = allCities.filter(city => city.popular)
    return popCities
}

// search city
const searchCity = (name) => {

    let resultSearch = allCities.filter(city => {
        if (city.name.includes(name)) {
            return name
        }
    })
    return resultSearch

}



export { popularCities, locations, searchCity }