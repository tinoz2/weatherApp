const apiKey = "5b6085adbbc70a7858501093ee40cc89"
const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
};


const setWeatherData = data => {
    const roundTemperature = temperature => Math.round(temperature);

    const weatherData = {
        location: data.name,
        max: roundTemperature(data.main.temp_max) + "°C max",
        min: roundTemperature(data.main.temp_min) + "°C min",
        temperature: roundTemperature(data.main.temp) + "°C",
        rainy: data.weather[0].main,
        description: data.sys.country,
        date: getDate(),
    }

    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });
}



const getDate = () => {
    let date = new Date();
    let month = date.getMonth() + 1;

    if (month < 10){
        month = "0" + month;
    }

    return `${date.getDate()}/${month}/${date.getFullYear()}`
};

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
};