let defaultCity = "tenkasi";

window.onload = function () {
    findWeather(defaultCity);
};
document.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        findWeather()
        document.querySelector(".title").style.display="none";
        document.querySelector(".main").style.display = "inline-block";

    }
});

document.querySelector(".iconDiv").addEventListener("click", () => {
        event.preventDefault();
        findWeather();
        document.querySelector(".title").style.display="none";
        document.querySelector(".main").style.display = "inline-block";
});

function findWeather(city) {
    let today = new Date();
    let day = today.toLocaleDateString("en-US", { weekday: "short" });
    let datePart = today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short"
    });
    let hours=""
    if(today.getHours()>12){
        hours = "PM"
    }
    else{
        hours = "AM"
    }
    let time = today.getHours()+":"+today.getMinutes()+" "+hours;
    console.log(time)

    document.getElementById("dateTime").textContent =day+","+datePart+" | "+ time;
    console.log(day+","+datePart+"  |  "+ time);

    document.getElementById("dateTime1").textContent =day+","+datePart+" | "+ time;
    console.log(day+","+datePart+"  |  "+ time);

    let city_Name = city || document.getElementById("input").value;
    console.log("City:", city_Name)
    let index = city_Name[0].toUpperCase()+city_Name.slice(1);
    console.log(index);

    let API_key = process.env.ACCUWEATHER_API_KEY;

    let url = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + API_key + "&q=" + city_Name;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Location Data:", data)

            let location_Key = data[0].Key;
            console.log("Location Key:", location_Key);

            let url1 = "https://dataservice.accuweather.com/currentconditions/v1/" + location_Key + "?apikey=" + API_key + "&details=true&metric=true";

            return fetch(url1)

                .then((res) => res.json())
                .then((weatherData) => {
                    console.log("Weather Data:", weatherData);

                    document.getElementById("city").innerHTML = index;
                    console.log(city_Name);

                    document.getElementById("temp").innerHTML =
                        `<span class="big">${weatherData[0].Temperature.Metric.Value}</span><span class="small">°C</span>`;

                        document.getElementById("temp1").innerHTML =
                        `<span class="big">${weatherData[0].Temperature.Metric.Value}</span><span class="small">°C</span>`;

                    document.getElementById("climate").innerText = weatherData[0].WeatherText;
                    document.getElementById("climate1").innerText = weatherData[0].WeatherText;
                    let condition = weatherData[0].WeatherText.trim().toLowerCase();
                    console.log(condition);
                    imgsrc = "";

                    if (condition == "partly sunny" ||
                        condition == "mostly sunny" ||
                        condition == "partly cloudy" ||
                        condition == "partly bright" ||
                        condition == "mild" ||
                        condition == "few clouds" ||
                        condition == "scattered clouds" ||
                        condition == "clouds and sun" ||
                        condition == "sunny") {
                        document.getElementById("sun").src = "images/partlycloud.png";
                        document.getElementById("sun1").src = "images/partlycloud.png"; 
                        imgsrc = "images/partlycloud.png";
                        let forecastIcons = document.querySelectorAll(".forecastIcon1");
                        for (let i = 0; i < forecastIcons.length; i++) {
                            forecastIcons[i].src = imgsrc;
                        }

                    }
                    else if (condition == "cloudy" ||
                        condition == "mostly cloudy" ||
                        condition == "broken clouds" ||
                        condition == "overcast clouds") {
                        document.getElementById("sun").src = "images/mostlycloud.png";
                        document.getElementById("sun1").src = "images/mostlycloud.png";
                        imgsrc = "images/mostlycloud.png";
                        let forecastIcons = document.querySelectorAll(".forecastIcon1");
                        for (let i = 0; i < forecastIcons.length; i++) {
                            forecastIcons[i].src = imgsrc;
                        }

                    }
                    else if (condition == "light rain" ||
                        condition == "rain"||
                        condition == "moderate rain" ||
                        condition == "heavy rain" ||
                        condition == "shower rain" ||
                        condition == "a shower" ||
                        condition == "showers") {
                        document.getElementById("sun").src = "images/rain.png";
                        document.getElementById("sun1").src = "images/rain.png";
                        imgsrc = "images/rain.png";
                        let forecastIcons = document.querySelectorAll(".forecastIcon1");
                        for (let i = 0; i < forecastIcons.length; i++) {
                        forecastIcons[i].src = imgsrc;
                    }
                    }
                    else if ( condition == "a shower" || condition == "showers"){
                        document.getElementById("sun").src = "images/shower.png";
                        document.getElementById("sun1").src = "images/shower.png";
                        imgsrc = "images/shower.png";
                        let forecastIcons = document.querySelectorAll(".forecastIcon1");
                        for (let i = 0; i < forecastIcons.length; i++) {
                        forecastIcons[i].src = imgsrc;
                    }
                    }
                    else if (condition == "thunderstorm" ||
                        condition == "thunderstorm with rain" ||
                        condition == "thunderstorm with drizzle") {
                        document.getElementById("sun").src = "images/thunderstorm.png";
                        document.getElementById("sun1").src = "images/thunderstorm.png";
                        imgsrc = "images/thunderstorm.png";
                        let forecastIcons = document.querySelectorAll(".forecastIcon1");
                        for (let i = 0; i < forecastIcons.length; i++) {
                        forecastIcons[i].src = imgsrc;
                    }
                    }
                    else if(condition == "dreary"){
                        document.getElementById("sun").src = "images/gloomy.png";
                        document.getElementById("sun1").src = "images/gloomy.png";
                        imgsrc = "images/raining-cloud2.png";
                        let forecastIcons = document.querySelectorAll(".forecastIcon1");
                        for (let i = 0; i < forecastIcons.length; i++) {
                        forecastIcons[i].src = imgsrc;
                    }
                    }
                    else{
                        imgsrc="images/partlycloud.png"
                    }


                    let windSpeed = weatherData[0].Wind?.Speed?.Metric?.Value;
                    document.getElementById("wind").innerText =(windSpeed ?? "N/A") + " km/h";
                    document.getElementById("wind1").innerText =(windSpeed ?? "N/A") + " km/h";

                    document.getElementById("humidity").innerText = (weatherData[0].RelativeHumidity ?? "N/A") + " %";
                    document.getElementById("humidity1").innerText = (weatherData[0].RelativeHumidity ?? "N/A") + " %";

                    let pressure = weatherData[0].Pressure?.Metric?.Value;
                    document.getElementById("pressure").innerText = (pressure ?? "N/A") + " hPa";
                    document.getElementById("pressure1").innerText = (pressure ?? "N/A") + " hPa";



                })
                .then(() => {
                    let forecastUrl = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + location_Key + "?apikey=" + API_key + "&metric=true";
                    fetch(forecastUrl)
                        .then((resp) => resp.json())
                        .then((forecastData) => {
                            console.log("forecast", forecastData);

                            let dailyForecasts = forecastData.DailyForecasts;
                            console.log("daily", dailyForecasts);

                            for (let i = 0; i < 4; i++) {
                                let dayData = dailyForecasts[i + 1];
                                // console.log("dayDate",dayData);
                                let date = new Date(dayData.Date);
                                // console.log("date",date);
                                let options = { day: "numeric", month: "short" };
                                let dayStr = date.toLocaleDateString("en-US", { weekday: "short" });
                                // console.log("dayStr",dayStr);
                                let datestr = date.toLocaleDateString("en-US", options)
                                // console.log("datestr",datestr);
                                let minTemp = dayData.Temperature.Minimum.Value;
                                let maxTemp = dayData.Temperature.Maximum.Value;
                                let description = dayData.Day.IconPhrase;
                                console.log(description);
                                
                                let forecastImg = "";
                                let cond = description.trim().toLowerCase();
                            
                                if (cond == "partly sunny" ||
                                    cond == "mostly sunny" ||
                                    cond == "partly cloudy" ||
                                    cond == "intermittent clouds"||
                                    cond == "partly bright" ||
                                    cond == "mild" ||
                                    cond == "few clouds" ||
                                    cond == "scattered clouds" ||
                                    cond == "clouds and sun" ||
                                    cond == "sunny") {
                                    forecastImg = "images/partlycloud.png";
                                }
                                else if (cond == "cloudy" ||
                                    cond == "mostly cloudy" ||
                                    cond == "broken clouds" ||
                                    cond == "overcast clouds") {
                                    forecastImg = "images/mostlycloud.png";
                                }
                                else if (cond == "light rain" ||
                                    cond == "rain"||
                                    cond == "moderate rain" ||
                                    cond == "heavy rain" ||
                                    cond == "shower rain") {
                                    forecastImg = "images/rain.png";
                                }
                                else if (cond == "thunderstorms" ||
                                    cond == "thunderstorm with rain" ||
                                    cond == "thunderstorm with drizzle") {
                                    forecastImg = "images/thunderstorm.png";
                                }
                                else if (cond == "a shower" || cond == "showers"){
                                    forecastImg = "images/shower.png";
                                }
                                else if( cond == "dreary"){
                                    forecastImg = "images/raining-cloud2.png";
                                }
                                else {
                                    forecastImg = "images/partlycloud.png";
                                }
                            
                                let div = document.querySelector(".forecast .day" + (i + 1));
                                if (div) {
                                    div.querySelector("h1").innerText = dayStr+","+datestr;
                                    div.querySelector(".forecastIcon1").src = forecastImg; 
                                    div.querySelectorAll("h6")[1].innerText = description;
                                    div.querySelectorAll("h6")[2].innerText = `${minTemp}°C / ${maxTemp}°C`;
                                }
                            }

                        });
                });
        })
        .catch(error => console.log("Error".error))
        // .catch()
        // .then(error=>{ 
        //     console.error("Error:",error);
        //     let errorMessage = document.getElementById("input")
        //     errorMessage.style.border = "2px solid red";
        //     document.body.append(errorMessage);
        //     document.querySelector(".main").style.display = "none";
        //     return;
        // })
}
document.querySelector(".backArrow").addEventListener("click", () => {
        document.querySelector(".title").style.display="inline-block";
        document.querySelector(".main").style.display = "none";
});
