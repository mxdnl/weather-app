export async function loadData(weather, tempUnit) {
    const body = document.querySelector('body')

    const data = await weather()

    body.innerHTML = `
    <span class="search">
        <input type="text" placeholder="Search for cities" id="search-bar">
    </span>

    <main>
        <div class="main-info section">
            <span class="main-info-text">
                <span>
                    <p class="location">Manila, Philippines</p>
                </span>
            </span>

            <span class="icon-container">
                <p class="today-temp">31&degC</p>
                <img src="assets/cloud.png" alt="" class="today-icon">
            </span>
        </div>

        <div class="hourly-forecast section">
            <p>TODAY'S FORECAST</p>
            
            <div class="hour-card-container">
                <span class="hour-card">
                    <p class="time">6:00 AM</p>
                    <img src="assets/cloud.png" alt="" class="today-icon">
                    <p class="hourly-temp">25&degC</p>
                </span>

                <span class="hour-card">
                    <p class="time">9:00 AM</p>
                    <img src="assets/sun.png" alt="" class="today-icon">
                    <p class="hourly-temp">25&degC</p>
                </span>

                <span class="hour-card">
                    <p class="time">12:00 PM</p>
                    <img src="assets/sun.png" alt="" class="today-icon">
                    <p class="hourly-temp">25&degC</p>
                </span>

                <span class="hour-card">
                    <p class="time">3:00 PM</p>
                    <img src="assets/thunder-rain.png" alt="" class="today-icon">
                    <p class="hourly-temp">25&degC</p>
                </span>

                <span class="hour-card">
                    <p class="time">6:00 PM</p>
                    <img src="assets/rain.png" alt="" class="today-icon">
                    <p class="hourly-temp">25&degC</p>
                </span>

                <span class="hour-card">
                    <p class="time">9:00 PM</p>
                    <img src="assets/cloud.png" alt="" class="today-icon">
                    <p class="hourly-temp">25&degC</p>
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
                        <div></span><p class="feels-like conditions-value">32&degC</p></div>
                    </div>
                </span>

                <span class="conditions-card">
                    <img src="assets/humidity.png" alt="">
                    <div class="conditions-card-text">
                        <p>Humidity:</p>
                        <div><p class="humidity conditions-value">76.9%</p></div>
                    </div>
                </span>

                <span class="conditions-card">
                    <img src="assets/uv-index.png" alt="">
                    <div class="conditions-card-text">
                        <p>UV Index:</p>
                        <div><p class="uv-index conditions-value">8</p></div>
                    </div>
                </span>

                <span class="conditions-card">
                    <img src="assets/temperature.png" alt="">
                    <div class="conditions-card-text">
                        <p>Chance of rain:</p>
                        <div><p class="chance-of-rain conditions-value">77%</p></div>
                    </div>
                </span>
            </div>
        </div>

        <div class="daily-forecast section">
            <p>WEEKLY FORECAST</p>
            <div class="daily-forecast-card-container">
                <div class="daily-forecast-card">
                    <img src="assets/sun.png" alt="">
                    <p class="day">Today</p>
                    <p class="daily-temp">29&degC</p>
                </div>

                <div class="daily-forecast-card">
                    <img src="assets/sun.png" alt="">
                    <p class="day">Mon</p>
                    <p class="daily-temp">28&degC</p>                    
                </div>

                <div class="daily-forecast-card">
                    <img src="assets/cloud.png" alt="">
                    <p class="day">Tue</p>
                    <p class="daily-temp">25&degC</p>
                </div>

                <div class="daily-forecast-card">
                    <img src="assets/rain.png" alt="">
                    <p class="day">Wed</p>
                    <p class="daily-temp">23&degC</p>
                </div>

                <div class="daily-forecast-card">
                    <img src="assets/thunder-rain.png" alt="">
                    <p class="day">Thu</p>
                    <p class="daily-temp">22&degC</p>
                </div>

                <div class="daily-forecast-card">
                    <img src="assets/cloud.png" alt="">
                    <p class="day">Fri</p>
                    <p class="daily-temp">23&degC</p>
                </div>

                <div class="daily-forecast-card">
                    <img src="assets/sun.png" alt="">
                    <p class="day">Sat</p>
                    <p class="daily-temp">28&degC</p>
                </div>
            </div>
        </div>
    </main>

    <div class="theme-bar">
        <button class="theme-toggle">
            
            <svg fill="#FFFFFF" height="1.5rem" width="1.5rem" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="#FFFFFF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="6.144"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.842,0,0,114.84,0,256s114.842,256,256,256s256-114.84,256-256S397.158,0,256,0z M322.225,451.558 c-20.797,7.062-43.071,10.894-66.225,10.894c-113.837,0-206.452-92.614-206.452-206.452S142.163,49.548,256,49.548 c23.154,0,45.429,3.832,66.226,10.894C266.612,107.439,231.226,177.657,231.226,256S266.612,404.561,322.225,451.558z"></path> </g> </g> </g></svg>
        </button>
        <button class="temp-unit">&degC</button>
    </div>
    `
}