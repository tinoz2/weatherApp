const apiKey = "49571687011636cae3410c860d9560df"
const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/3.0/onecall?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => console.log(data))
};
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
};