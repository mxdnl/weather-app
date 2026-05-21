import { getTimezone } from 'countries-and-timezones' 
import { loadData } from './modules/loadData.js'

const timezone = getLocation()
let location = timezone[0]
let tempUnit = 'Fahrenheit'
let unitToggle = true
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const key = 'A937E7DXFCDX386GDLDHXMYLJ'
const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.toLowerCase()}?key=${key}&iconSet=icons1`

const unitBtn = document.querySelector('.temp-unit')
const search = document.querySelector('#search-bar')

function getLocation() {
    const tzString = Intl.DateTimeFormat().resolvedOptions().timeZone // e.g. "Asia/Manila"
    
    const tzData = getTimezone(tzString)
    const countryCode = tzData.countries[0] // e.g. "PH"
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    const countryName = regionNames.of(countryCode) // e.g. "Philippines"
    const cityName = tzString.split('/')[1]

    return [cityName, countryName] // e.g. "[Manila, Philippines]"
}

async function getWeatherData(location) {
    const response = await fetch(url)
    const weatherData = await response.json()
    
    const mainInfo = {
        temp: weatherData.days[0].temp,
        icon: weatherData.days[0].icon,
        region: location
    }

    const hourlyForecast = [
        { icon: weatherData.days[0].hours[6].icon, temp: weatherData.days[0].hours[6].temp },
        { icon: weatherData.days[0].hours[9].icon, temp: weatherData.days[0].hours[9].temp },
        { icon: weatherData.days[0].hours[12].icon, temp: weatherData.days[0].hours[12].temp },
        { icon: weatherData.days[0].hours[15].icon, temp: weatherData.days[0].hours[15].temp },
        { icon: weatherData.days[0].hours[18].icon, temp: weatherData.days[0].hours[18].temp },
        { icon: weatherData.days[0].hours[21].icon, temp: weatherData.days[0].hours[21].temp }
    ]

    const dailyForecast = weatherData.days.slice(0, 7).map((dayData, index) => {
        const dateObj = new Date(dayData.datetime); 
        const dayName = weekDays[dateObj.getUTCDay()];

        return {
            icon: dayData.icon,
            temp: dayData.temp,
            day: index > 0 ? dayName : 'Today'
        }
    })

    return {
        main: mainInfo,
        hourlyForecast: hourlyForecast,
        weeklyForecast: dailyForecast
    }
}

unitBtn.addEventListener('click', () => {
    unitToggle = !unitToggle
    tempUnit = unitToggle ? 'Fahrenheit' : 'Celsius'

    loadData(getWeatherData, tempUnit)
})