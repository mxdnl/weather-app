import { loadPage, updateData } from './modules/loadData.js'

let location = getLocation()
let tempUnit = 'C'
let unitToggle = true
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getLocation() {
    const tzString = Intl.DateTimeFormat().resolvedOptions().timeZone // e.g. "Asia/Manila"
    let cityName = tzString.split('/')[1] 
    cityName = cityName.replaceAll('_', ' ') 

    return cityName // e.g. "Manila"
}

async function getWeatherData(location) {
    const key = 'A937E7DXFCDX386GDLDHXMYLJ'
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.toLowerCase()}?key=${key}&iconSet=icons1`
    
    const response = await fetch(url)
    
    if (!response.ok) {
        console.error(`Error fetching weather data: ${response.statusText}`)
        return null
    }
    
    const weatherData = await response.json()

    const mainInfo = {
        temp: tempUnit === 'F' ? weatherData.days[0].temp : Math.round(5 * ( weatherData.days[0].temp - 32) / 9),
        icon: weatherData.days[0].icon,
        region: location.charAt(0).toUpperCase() + location.slice(1)
    }

    const airConditions = {
        feelsLike: tempUnit === 'F' ? weatherData.days[0].feelslike : Math.round(5 * (weatherData.days[0].feelslike - 32) / 9),
        humidity: weatherData.days[0].humidity,
        uvIndex: weatherData.days[0].uvindex,
        chanceOfRain: weatherData.days[0].precipprob
    }

    const hourlyForecast = [
        { icon: weatherData.days[0].hours[6].icon, temp: tempUnit === 'F' ?  weatherData.days[0].hours[6].temp : Math.round(5 * (weatherData.days[0].hours[6].temp - 32) / 9) },
        { icon: weatherData.days[0].hours[9].icon, temp: tempUnit === 'F' ?  weatherData.days[0].hours[9].temp : Math.round(5 * (weatherData.days[0].hours[9].temp - 32) / 9) },
        { icon: weatherData.days[0].hours[12].icon, temp: tempUnit === 'F' ?  weatherData.days[0].hours[12].temp : Math.round(5 * (weatherData.days[0].hours[12].temp - 32) / 9) },
        { icon: weatherData.days[0].hours[15].icon, temp: tempUnit === 'F' ?  weatherData.days[0].hours[15].temp : Math.round(5 * (weatherData.days[0].hours[15].temp - 32) / 9) },
        { icon: weatherData.days[0].hours[18].icon, temp: tempUnit === 'F' ?  weatherData.days[0].hours[18].temp : Math.round(5 * (weatherData.days[0].hours[18].temp - 32) / 9) },
        { icon: weatherData.days[0].hours[21].icon, temp: tempUnit === 'F' ?  weatherData.days[0].hours[21].temp : Math.round(5 * (weatherData.days[0].hours[21].temp - 32) / 9) }
    ]

    const dailyForecast = weatherData.days.slice(0, 7).map((dayData, index) => {
        const dateObj = new Date(dayData.datetime); 
        const dayName = weekDays[dateObj.getUTCDay()];

        return {
            icon: dayData.icon,
            temp: tempUnit === 'F' ? dayData.temp : Math.round(5 * (dayData.temp - 32) / 9),
            day: index > 0 ? dayName : 'Today'
        }
    })

    return {
        main: mainInfo,
        airConditions: airConditions,
        hourlyForecast: hourlyForecast,
        weeklyForecast: dailyForecast
    }
}

loadPage(getWeatherData, location, tempUnit)
    .then(() => {
        const search = document.querySelector('#search-bar')
        search.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                location = search.value.toLowerCase()
                console.log(location)
                updateData(getWeatherData, location, tempUnit)
                search.value = ''
            }
        })
    })