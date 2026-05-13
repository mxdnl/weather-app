import { getTimezone } from 'countries-and-timezones';

function getLocation() {
    const tzString = Intl.DateTimeFormat().resolvedOptions().timeZone // "Asia/Manila"
    
    const tzData = getTimezone(tzString);
    const countryCode = tzData.countries[0] // "PH"
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    const countryName = regionNames.of(countryCode) // "Philippines"

    let cityName = tzString.split('/')[1]

    return `${cityName}, ${countryName}` // "Manila, Philippines"
}

const key = 'A937E7DXFCDX386GDLDHXMYLJ'
const location = 'liliw'
const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`

getLocation()

/*

fetch(url)
.then(response => {
    return response.json()
})
.then(data => {
    console.log(data.days[0].hours)
})
.catch(error => {
    console.log(error)
})

*/