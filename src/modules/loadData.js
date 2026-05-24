export async function updateData(getWeatherData, location, tempUnit) {
    const searchBar = document.getElementById('search-bar')
    const locationText = document.querySelector('.location')
    const todayTemp = document.querySelector('.today-temp')
    const todayIcon = document.querySelector('.today-icon')
    const hourlyTemps = document.querySelectorAll('.hourly-temp')
    const hourlyIcons = document.querySelectorAll('.hour-card .today-icon')
    const feelsLike = document.querySelector('.feels-like')
    const humidity = document.querySelector('.humidity')
    const uvIndex = document.querySelector('.uv-index')
    const chanceOfRain = document.querySelector('.chance-of-rain')
    const dailyTemps = document.querySelectorAll('.daily-temp')
    const dailyIcons = document.querySelectorAll('.daily-forecast-card img') 

    const weatherData = await getWeatherData(location)

    // Update location
    console.log(weatherData.main.region)
    locationText.textContent = weatherData.main.region

    // Update today's temperature
    console.log(weatherData.main.temp)
    todayTemp.textContent = `${weatherData.main.temp}\u00B0${tempUnit}`

    // Update today's icon
    todayIcon.src = `assets/icons/${weatherData.main.icon}.png`

    // Update hourly temperatures and icons
    hourlyTemps.forEach((temp, index) => {
        temp.textContent = `${weatherData.hourlyForecast[index].temp}\u00B0${tempUnit}`
    })

    hourlyIcons.forEach((icon, index) => {
        icon.src = `assets/icons/${weatherData.hourlyForecast[index].icon}.png`
    })

    // Update feels like
    feelsLike.textContent = `${weatherData.airConditions.feelsLike}\u00B0${tempUnit}`

    // Update humidity
    humidity.textContent = `${weatherData.airConditions.humidity}%`

    // Update uv index
    uvIndex.textContent = weatherData.airConditions.uvIndex

    // Update chance of rain
    chanceOfRain.textContent = `${weatherData.airConditions.chanceOfRain}%`

    // Update daily temperatures and icons
    dailyTemps.forEach((temp, index) => {
        temp.textContent = `${weatherData.weeklyForecast[index].temp}\u00B0${tempUnit}`
    })

    dailyIcons.forEach((icon, index) => {
        icon.src = `assets/icons/${weatherData.weeklyForecast[index].icon}.png`
    })
}

export async function loadPage(weather, location, tempUnit) {
    const body = document.querySelector('body')

    console.log(location)
    console.log('fetching data...')
    const weatherData = await weather(location)
    console.log('Data fetched')

    body.innerHTML = `
    <span class="search">
        <input type="text" placeholder="Search for cities" id="search-bar">
    </span>

    <main>
        <div class="main-info section">
            <span class="main-info-text">
                <span>
                    <p class="location">${location}</p>
                </span>
            </span>

            <span class="icon-container">
                <p class="today-temp">${weatherData.main.temp}&deg${tempUnit}</p>
                <img src="assets/icons/${weatherData.main.icon}.png" alt="" class="today-icon">
            </span>
        </div>

        <div class="hourly-forecast section">
            <p>TODAY'S FORECAST</p>
            
            <div class="hour-card-container">
                <span class="hour-card">
                    <p class="time">6:00 AM</p>
                    <img src="assets/icons/${weatherData.hourlyForecast[0].icon}.png" alt="" class="today-icon">
                    <p class="hourly-temp">${weatherData.hourlyForecast[0].temp}&deg${tempUnit}</p>
                </span>

                <span class="hour-card">
                    <p class="time">9:00 AM</p>
                    <img src="assets/icons/${weatherData.hourlyForecast[1].icon}.png" alt="" class="today-icon">
                    <p class="hourly-temp">${weatherData.hourlyForecast[1].temp}&deg${tempUnit}</p>
                </span>

                <span class="hour-card">
                    <p class="time">12:00 PM</p>
                    <img src="assets/icons/${weatherData.hourlyForecast[2].icon}.png" alt="" class="today-icon">
                    <p class="hourly-temp">${weatherData.hourlyForecast[2].temp}&deg${tempUnit}</p>
                </span>

                <span class="hour-card">
                    <p class="time">3:00 PM</p>
                    <img src="assets/icons/${weatherData.hourlyForecast[3].icon}.png" alt="" class="today-icon">
                    <p class="hourly-temp">${weatherData.hourlyForecast[3].temp}&deg${tempUnit}</p>
                </span>

                <span class="hour-card">
                    <p class="time">6:00 PM</p>
                    <img src="assets/icons/${weatherData.hourlyForecast[4].icon}.png" alt="" class="today-icon">
                    <p class="hourly-temp">${weatherData.hourlyForecast[4].temp}&deg${tempUnit}</p>
                </span>

                <span class="hour-card">
                    <p class="time">9:00 PM</p>
                    <img src="assets/icons/${weatherData.hourlyForecast[5].icon}.png" alt="" class="today-icon">
                    <p class="hourly-temp">${weatherData.hourlyForecast[5].temp}&deg${tempUnit}</p>
                </span>
            </div>

        </div>

        <div class="air-conditions section">
            <p>AIR CONDITIONS</p>

            <div class="conditions-card-container">
                <span class="conditions-card">
                    <img src="assets/temperature.png" alt="">
                    <div class="conditions-card-text">
                        <p>Feels like:</p>
                        <div></span><p class="feels-like conditions-value">${weatherData.airConditions.feelsLike}&deg${tempUnit}</p></div>
                    </div>
                </span>

                <span class="conditions-card">
                    <img src="assets/humidity.png" alt="">
                    <div class="conditions-card-text">
                        <p>Humidity:</p>
                        <div><p class="humidity conditions-value">${weatherData.airConditions.humidity}%</p></div>
                    </div>
                </span>

                <span class="conditions-card">
                    <img src="assets/uv-index.png" alt="">
                    <div class="conditions-card-text">
                        <p>UV Index:</p>
                        <div><p class="uv-index conditions-value">${weatherData.airConditions.uvIndex}</p></div>
                    </div>
                </span>

                <span class="conditions-card">
                    <img src="assets/humidity.png" alt="">
                    <div class="conditions-card-text">
                        <p>Chance of rain:</p>
                        <div><p class="chance-of-rain conditions-value">${weatherData.airConditions.chanceOfRain}%</p></div>
                    </div>
                </span>
            </div>
        </div>

        <div class="daily-forecast section">
            <p>WEEKLY FORECAST</p>
            <div class="daily-forecast-card-container">
                <div class="daily-forecast-card">
                    <img src="assets/icons/${weatherData.weeklyForecast[0].icon}.png" alt="">
                    <p class="day">Today</p>
                    <p class="daily-temp">${weatherData.weeklyForecast[0].temp}&deg${tempUnit}</p>
                </div>

                <div class="daily-forecast-card">
                    <img src="assets/icons/${weatherData.weeklyForecast[1].icon}.png" alt="">
                    <p class="day">Mon</p>
                    <p class="daily-temp">${weatherData.weeklyForecast[1].temp}&deg${tempUnit}</p>                    
                </div>

                <div class="daily-forecast-card">
                    <img src="assets/icons/${weatherData.weeklyForecast[2].icon}.png" alt="">
                    <p class="day">Tue</p>
                    <p class="daily-temp">${weatherData.weeklyForecast[2].temp}&deg${tempUnit}</p>
                </div>

                <div class="daily-forecast-card">
                    <img src="assets/icons/${weatherData.weeklyForecast[3].icon}.png" alt="">
                    <p class="day">Wed</p>
                    <p class="daily-temp">${weatherData.weeklyForecast[3].temp}&deg${tempUnit}</p>
                </div>

                <div class="daily-forecast-card">
                    <img src="assets/icons/${weatherData.weeklyForecast[4].icon}.png" alt="">
                    <p class="day">Thu</p>
                    <p class="daily-temp">${weatherData.weeklyForecast[4].temp}&deg${tempUnit}</p>
                </div>

                <div class="daily-forecast-card">
                    <img src="assets/icons/${weatherData.weeklyForecast[5].icon}.png" alt="">
                    <p class="day">Fri</p>
                    <p class="daily-temp">${weatherData.weeklyForecast[5].temp}&deg${tempUnit}</p>
                </div>

                <div class="daily-forecast-card">
                    <img src="assets/icons/${weatherData.weeklyForecast[6].icon}.png" alt="">
                    <p class="day">Sat</p>
                    <p class="daily-temp">${weatherData.weeklyForecast[6].temp}&deg${tempUnit}</p>
                </div>
            </div>
        </div>
    </main>

    <!-- 
    <div class="theme-bar">
        <button class="theme-toggle">
            
            <svg fill="#FFFFFF" height="1.5rem" width="1.5rem" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="#FFFFFF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="6.144"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.842,0,0,114.84,0,256s114.842,256,256,256s256-114.84,256-256S397.158,0,256,0z M322.225,451.558 c-20.797,7.062-43.071,10.894-66.225,10.894c-113.837,0-206.452-92.614-206.452-206.452S142.163,49.548,256,49.548 c23.154,0,45.429,3.832,66.226,10.894C266.612,107.439,231.226,177.657,231.226,256S266.612,404.561,322.225,451.558z"></path> </g> </g> </g></svg>
        </button>
        <button class="temp-unit">&degC</button>
    </div>
    --->
    `
}