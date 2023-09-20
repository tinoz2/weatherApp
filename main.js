
const apiKey = "5b6085adbbc70a7858501093ee40cc89"

const fetchData = async (position) =>{
    try{
        const {latitude, longitude} = position.coords
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        const data = await response.json()
        setWeatherData(data)
    }
    catch(error){
        console.error("Error data", error)
    }
};

fetchData();


const setWeatherData = data => {
    const roundTemperature = temperature => Math.round(temperature);

    console.log(data)
    const weatherData = {
        location: data.name,
        max: roundTemperature(data.main.temp_max) + "°C max",
        min: roundTemperature(data.main.temp_min) + "°C min",
        temperature: roundTemperature(data.main.temp) + "°C",
        rainy: data.weather[0].main,
        description: data.sys.country,
        date: getDate(),
    }

    const weatherIcon = document.getElementById("img")
    switch (weatherData.rainy.toLowerCase()){
        case "mist":
            weatherIcon.src = "./img/mist.svg";
            break;
        case "rain":
            weatherIcon.src = "./img/rain.svg";
            break;
        case "clouds":
            weatherIcon.src = "./img/clouds.svg";
            break;
        case "drizzle":
            weatherIcon.src = "./img/drizzle.svg";
            break;
        case "thunderstorm":
            weatherIcon.src = "./img/thunderstorm.svg";
            break;
        case "snow":
            weatherIcon.src = "./img/snow.svg";
            break;
        default:
            weatherIcon.src = "./img/sunny.svg"
    };

    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    cleanAll();
}

const cleanAll = () => {
    let container = document.getElementById("container");
    let loader = document.getElementById("loader");

    loader.style.display = "none"
    container.style.display = "flex"
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