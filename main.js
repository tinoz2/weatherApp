const apiKey = "f8988a03465a9a50037d22248499afb9"
const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/3.0/onecall?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => console.log(data))
};
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
};